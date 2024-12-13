import { useQuery } from "@tanstack/react-query";
import { getProfileInfo } from "@/supabase/profile/profile"; // Adjust the import path as needed

export const useProfileInfo = (userId?: string) => {
  return useQuery({
    queryKey: ["getprofileinfo", userId],
    queryFn: () => getProfileInfo(userId as string),
    enabled: !!userId,
    retry: false,
  });
};
