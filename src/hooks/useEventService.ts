"use client";

import { useAuth } from "@clerk/nextjs";
import { Event } from "@/types/events";
import { useSupabase } from "@/contexts/SupabaseContext";

export interface EventFilters {
  search?: string;
  category?: string;
  location?: string;
  tier?: string;
  dateFrom?: string;
  dateTo?: string;
}

export const useEventService = () => {
  const { getToken } = useAuth();
  const { getClient } = useSupabase();

  const getAllEvents = async (): Promise<{
    data: Event[] | null;
    error: Error | null;
  }> => {
    try {
      const token = await getToken();
      const supabase = getClient(token || undefined);

      const query = supabase
        .from("events")
        .select("*")
        .order("event_date", { ascending: true });

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching events:", error);
        return { data: null, error: new Error(error.message) };
      }

      return { data, error: null };
    } catch (error) {
      console.error("Unexpected error fetching events:", error);
      return {
        data: null,
        error: error instanceof Error ? error : new Error("Unexpected error"),
      };
    }
  };

  return { getAllEvents };
};
