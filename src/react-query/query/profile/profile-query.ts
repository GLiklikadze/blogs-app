import { useQuery } from "@tanstack/react-query";
import { getProfileInfo } from "@/supabase/profile/profile";
import { PROFILE_QUERY_KEYS } from "./profileQueryKeys.enum";

export const useProfileInfo = (userId?: string) => {
  return useQuery({
    queryKey: [PROFILE_QUERY_KEYS.PROFILE, userId],
    queryFn: () => getProfileInfo(userId as string),
    enabled: !!userId,
    retry: false,
  });
};
