import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const TOTAL_SPOTS = 250;

interface UseActualSpotsRemainingResult {
  spotsRemaining: number;
  isLoading: boolean;
}

export function useActualSpotsRemaining(): UseActualSpotsRemainingResult {
  const [spotsRemaining, setSpotsRemaining] = useState(TOTAL_SPOTS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
