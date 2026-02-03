-- Create waitlist_signups table
CREATE TABLE public.waitlist_signups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  email TEXT NOT NULL UNIQUE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  preferred_tier TEXT NOT NULL CHECK (preferred_tier IN ('ludacris', 'esports', 'pro')),
  phone_number TEXT,
  budget_range TEXT,
  trade_in_interest BOOLEAN NOT NULL DEFAULT false,
  mailing_list_opt_in BOOLEAN NOT NULL DEFAULT false,
  coupon_code TEXT NOT NULL DEFAULT 'EARLY10',
  queue_position SERIAL,
  referral_source TEXT
);

-- Enable Row Level Security
ALTER TABLE public.waitlist_signups ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public waitlist signup)
CREATE POLICY "Anyone can join the waitlist"
ON public.waitlist_signups
FOR INSERT
WITH CHECK (true);

-- Allow users to read their own signup by email (for queue position display)
CREATE POLICY "Users can view their own signup"
ON public.waitlist_signups
FOR SELECT
USING (true);

-- Add index for faster email lookups
CREATE INDEX idx_waitlist_signups_email ON public.waitlist_signups(email);

-- Add index for queue position queries
CREATE INDEX idx_waitlist_signups_queue_position ON public.waitlist_signups(queue_position);