-- Add trade-in computer spec columns to waitlist_signups
ALTER TABLE public.waitlist_signups
ADD COLUMN trade_in_gpu text,
ADD COLUMN trade_in_cpu text,
ADD COLUMN trade_in_ram text,
ADD COLUMN trade_in_storage text,
ADD COLUMN trade_in_motherboard text,
ADD COLUMN trade_in_uptime text;