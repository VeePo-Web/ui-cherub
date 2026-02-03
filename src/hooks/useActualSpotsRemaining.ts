import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const TOTAL_SPOTS = 250;
const CACHE_KEY = 'waitlist_spots_cache';
const CACHE_TTL = 60000; // 1 minute

interface CacheEntry {
  value: number;
  timestamp: number;
}

interface UseActualSpotsRemainingResult {
  spotsRemaining: number;
  isLoading: boolean;
}

function getFromCache(): number | null {
  try {
    const cached = sessionStorage.getItem(CACHE_KEY);
    if (cached) {
      const entry: CacheEntry = JSON.parse(cached);
      if (Date.now() - entry.timestamp < CACHE_TTL) {
        return entry.value;
      }
    }
  } catch {
    // Ignore cache errors
  }
  return null;
}

function setCache(value: number): void {
  try {
    const entry: CacheEntry = { value, timestamp: Date.now() };
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(entry));
  } catch {
    // Ignore cache errors
  }
}

export function useActualSpotsRemaining(): UseActualSpotsRemainingResult {
  const [spotsRemaining, setSpotsRemaining] = useState(() => {
    const cached = getFromCache();
    return cached ?? TOTAL_SPOTS;
  });
  const [isLoading, setIsLoading] = useState(() => getFromCache() === null);

  useEffect(() => {
    // Check cache first
    const cached = getFromCache();
    if (cached !== null) {
      setSpotsRemaining(cached);
      setIsLoading(false);
      return;
    }

    const fetchSignupCount = async () => {
      try {
        const { count, error } = await supabase
          .from("waitlist_signups")
          .select("*", { count: "exact", head: true });

        if (error) {
          console.error("Error fetching signup count:", error);
          setSpotsRemaining(TOTAL_SPOTS);
        } else {
          const remaining = Math.max(0, TOTAL_SPOTS - (count || 0));
          setSpotsRemaining(remaining);
          setCache(remaining);
        }
      } catch (err) {
        console.error("Error fetching signup count:", err);
        setSpotsRemaining(TOTAL_SPOTS);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSignupCount();
  }, []);

  return { spotsRemaining, isLoading };
}
