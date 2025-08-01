-- =====================================================================
-- SQL Setup Script for Evently (Clerk + Tier-based RLS)
-- =====================================================================

-- Ensure UUID extension is available
create extension if not exists "uuid-ossp";

-- Create the "events" table
create table if not exists events (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  event_date timestamp not null,
  image_url text,
  tier text check (tier in ('free','silver','gold','platinum')) not null,
  created_at timestamp with time zone default now()
);

-- Enable Row Level Security (RLS)
alter table events enable row level security;

-- RLS Policy: Authenticated users can only read events matching their Clerk plan (pla)
create policy "authenticated_select_events_by_plan"
on events
for select
to authenticated
using (
  case
    when auth.jwt() ->> 'pla' = 'u:free' then tier = 'free'
    when auth.jwt() ->> 'pla' = 'u:silver' then tier in ('free', 'silver')
    when auth.jwt() ->> 'pla' = 'u:gold' then tier in ('free', 'silver', 'gold')
    when auth.jwt() ->> 'pla' = 'u:platinum' then true
    else false
  end
);

-- Deny inserts/updates/deletes for authenticated users (read-only)
create policy "deny_inserts" on events for insert to authenticated with check (false);
create policy "deny_updates" on events for update to authenticated using (false);
create policy "deny_deletes" on events for delete to authenticated using (false);

-- Seed sample events with Unsplash images
insert into events (title, description, event_date, image_url, tier)
values
  -- Free Tier Events
  ('Free Community Meetup', 'An open meetup for everyone.', now() + interval '7 days', 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80', 'free'),
  ('Intro to Tech', 'Beginner-friendly tech session.', now() + interval '14 days', 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80', 'free'),
  ('Open Source Jam', 'Collaborate on open-source projects.', now() + interval '21 days', 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&q=80', 'free'),

  -- Silver Tier Events
  ('Silver Networking Night', 'Exclusive networking for Silver+ members.', now() + interval '10 days', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80', 'silver'),
  ('Silver Workshop', 'Hands-on workshop for Silver+ members.', now() + interval '20 days', 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80', 'silver'),
  ('Tech Talk: Scaling Apps', 'Learn to scale apps from industry experts.', now() + interval '25 days', 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80', 'silver'),

  -- Gold Tier Events
  ('Gold Masterclass', 'Premium expert-led session for Gold+ members.', now() + interval '15 days', 'https://images.unsplash.com/photo-1596495577886-d920f1fb7238?auto=format&fit=crop&w=800&q=80', 'gold'),
  ('Leadership Roundtable', 'Private roundtable for leadership insights.', now() + interval '22 days', 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80', 'gold'),
  ('Product Strategy Workshop', 'Deep dive into product planning.', now() + interval '28 days', 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=800&q=80', 'gold'),

  -- Platinum Tier Events
  ('Platinum Gala', 'Exclusive gala event for Platinum members.', now() + interval '30 days', 'https://images.unsplash.com/photo-1519677100203-a0e668c92439?auto=format&fit=crop&w=800&q=80', 'platinum'),
  ('VIP Fireside Chat', 'One-on-one sessions with top mentors.', now() + interval '35 days', 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80', 'platinum'),
  ('Private Executive Dinner', 'Intimate networking with industry leaders.', now() + interval '40 days', 'https://images.unsplash.com/photo-1529101091764-c3526daf38fe?auto=format&fit=crop&w=800&q=80', 'platinum');
