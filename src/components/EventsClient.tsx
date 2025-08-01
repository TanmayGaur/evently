"use client";

import { useState, useEffect, useMemo } from "react";
import { Event } from "@/types/events";
import { useEventService, EventFilters } from "@/hooks/useEventService";
import EventCard from "./EventCard";
import { EventsGridSkeleton } from "./EventCardSkeleton";
import { Search, Calendar } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";

export default function EventsClient() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<EventFilters>({});
  const [selectedTier, setSelectedTier] = useState<string>("all");
  const { userId, has } = useAuth();
  const [plan, setPlan] = useState<string>("free");

  const tierValues: { [key: string]: number } = {
    free: 1,
    silver: 2,
    gold: 3,
    platinum: 4,
  };

  const doesPlanCoverTier = (userPlan: string, tier: string): boolean => {
    return tierValues[userPlan] >= tierValues[tier];
  };

  const { getAllEvents } = useEventService();

  // Fetch events function - no useCallback needed since we'll use it differently
  const fetchEvents = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await getAllEvents();

      if (fetchError) {
        setError("Failed to fetch events. Please try again.");
        console.error("Error fetching events:", fetchError);
      } else {
        setEvents(data || []);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Set user plan based on auth
  useEffect(() => {
    if (has) {
      if (has({ plan: "platinum" })) {
        setPlan("platinum");
      } else if (has({ plan: "silver" })) {
        setPlan("silver");
      } else if (has({ plan: "gold" })) {
        setPlan("gold");
      } else {
        setPlan("free");
      }
    }
  }, [has]);

  // Initial load - only when userId changes, fetch events once
  useEffect(() => {
    if (userId) {
      fetchEvents();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  // Handle filter updates
  const updateFilters = (newFilters: Partial<EventFilters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
  };

  const handleSearchChange = (searchValue: string) => {
    setFilters((prev) => ({ ...prev, search: searchValue }));
  };

  const handleTierChange = (tier: string) => {
    setSelectedTier(tier);
    const tierFilter = tier === "all" ? undefined : tier;
    if (doesPlanCoverTier(plan, tier) || tier === "all") {
      updateFilters({ tier: tierFilter });
    } else {
      toast.error(`Your plan does not cover ${tier} events.`, {
        description:
          "Upgrade your plan in your profile under Manage Account > Billing.",
      });
      setSelectedTier("all");
      updateFilters({ tier: undefined });
    }
  };

  const searchFilteredEvents = useMemo(() => {
    if (!filters.search) return events;

    const searchTerm = filters.search.toLowerCase();
    return events.filter(
      (event) =>
        event.title.toLowerCase().includes(searchTerm) ||
        (event.description &&
          event.description.toLowerCase().includes(searchTerm)) ||
        (event.location && event.location.toLowerCase().includes(searchTerm)) ||
        (event.category && event.category.toLowerCase().includes(searchTerm))
    );
  }, [events, filters.search]);

  const tierTabs = [
    { id: "all", label: "All", count: searchFilteredEvents.length },
    {
      id: "free",
      label: "Free",
      count: searchFilteredEvents.filter((e) => e.tier === "free").length,
    },
    {
      id: "silver",
      label: "Silver",
      count: searchFilteredEvents.filter((e) => e.tier === "silver").length,
    },
    {
      id: "gold",
      label: "Gold",
      count: searchFilteredEvents.filter((e) => e.tier === "gold").length,
    },
    {
      id: "platinum",
      label: "Platinum",
      count: searchFilteredEvents.filter((e) => e.tier === "platinum").length,
    },
  ];

  // Filter events based on selected tier and search
  const filteredEvents = useMemo(() => {
    let filtered = events;

    // Filter by tier
    if (selectedTier !== "all") {
      filtered = filtered.filter((event) => event.tier === selectedTier);
    }

    // Filter by search term
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(searchTerm) ||
          (event.description &&
            event.description.toLowerCase().includes(searchTerm)) ||
          (event.location &&
            event.location.toLowerCase().includes(searchTerm)) ||
          (event.category && event.category.toLowerCase().includes(searchTerm))
      );
    }

    return filtered;
  }, [events, selectedTier, filters.search]);

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
          <h3 className="text-lg font-semibold text-red-800 mb-2">
            Error Loading Events
          </h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => fetchEvents()}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Tier Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-7" aria-label="Tabs">
          {tierTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTierChange(tab.id)}
              className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                selectedTier === tab.id
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Search and Filters Header */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search events..."
            value={filters.search || ""}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Events Grid */}
      {loading ? (
        <EventsGridSkeleton />
      ) : filteredEvents.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <div className="text-lg font-semibold text-gray-600 mb-2">
            No Events Found
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              canAccess={doesPlanCoverTier(plan, event.tier)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
