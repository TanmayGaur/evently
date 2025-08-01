"use client";

import { createClient, SupabaseClient } from "@supabase/supabase-js";
import {
  createContext,
  useContext,
  useRef,
  ReactNode,
  useCallback,
  useEffect,
} from "react";
import { useAuth } from "@clerk/nextjs";

interface SupabaseContextType {
  getClient: (token?: string) => SupabaseClient;
  clearCache: () => void;
}

const SupabaseContext = createContext<SupabaseContextType | null>(null);

interface SupabaseProviderProps {
  children: ReactNode;
}

// Simple hash function for token (for cache key security)
const hashToken = (token: string): string => {
  let hash = 0;
  for (let i = 0; i < token.length; i++) {
    const char = token.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return hash.toString();
};

export function SupabaseProvider({ children }: SupabaseProviderProps) {
  const { userId } = useAuth();
  const clientCacheRef = useRef<
    Map<string, { client: SupabaseClient; timestamp: number }>
  >(new Map());
  const lastUserIdRef = useRef<string | null>(null);
  const CACHE_TTL = 30 * 60 * 1000; // 30 minutes cache TTL

  // Clear cache when user logs out
  useEffect(() => {
    if (lastUserIdRef.current && !userId) {
      // User logged out, clear cache
      clientCacheRef.current.clear();
    }
    lastUserIdRef.current = userId || null;
  }, [userId]);

  const cleanupExpiredClients = useCallback(() => {
    const now = Date.now();
    const entries = Array.from(clientCacheRef.current.entries());

    entries.forEach(([key, value]) => {
      if (now - value.timestamp > CACHE_TTL) {
        clientCacheRef.current.delete(key);
      }
    });
  }, [CACHE_TTL]);

  const getClient = useCallback(
    (token?: string): SupabaseClient => {
      // Clean up expired clients periodically
      cleanupExpiredClients();

      const cacheKey = token ? hashToken(token) : "anonymous";

      // Check if we have a valid cached client
      const cached = clientCacheRef.current.get(cacheKey);
      if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        return cached.client;
      }

      // Create new client and cache it
      const client = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        token
          ? {
              global: {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              },
            }
          : undefined
      );

      clientCacheRef.current.set(cacheKey, {
        client,
        timestamp: Date.now(),
      });

      return client;
    },
    [cleanupExpiredClients, CACHE_TTL]
  );

  const clearCache = useCallback(() => {
    clientCacheRef.current.clear();
  }, []);

  const contextValue: SupabaseContextType = {
    getClient,
    clearCache,
  };

  return (
    <SupabaseContext.Provider value={contextValue}>
      {children}
    </SupabaseContext.Provider>
  );
}

export function useSupabase() {
  const context = useContext(SupabaseContext);
  if (!context) {
    throw new Error("useSupabase must be used within a SupabaseProvider");
  }
  return context;
}
