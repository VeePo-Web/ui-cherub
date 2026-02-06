-- Fix critical security vulnerability: waitlist_signups is publicly readable
-- Since waitlist users are not authenticated, we cannot use auth.uid()
-- The safest approach is to deny all public SELECT access
-- Admin access should be done via service role or edge functions

-- Drop the overly permissive SELECT policy
DROP POLICY IF EXISTS "Users can view their own signup" ON public.waitlist_signups;

-- Create a restrictive SELECT policy (deny all public reads)
CREATE POLICY "No public read access to waitlist signups"
ON public.waitlist_signups
FOR SELECT
USING (false);

-- Keep the INSERT policy as-is since anyone should be able to join the waitlist