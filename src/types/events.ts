export interface Event {
  id: string;
  title: string;
  description: string | null;
  event_date: string;
  image_url: string | null;
  tier: "free" | "silver" | "gold" | "platinum";
  category?: string;
  location?: string;
  created_at: string;
}


