import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { getProfileInfo } from "@/supabase/profile/profile";
import { PROFILE_QUERY_KEYS } from "./profileQueryKeys.enum";
import { PostgrestError } from "@supabase/supabase-js";

type profileResponse = {
  avatar_url: string | null;
  full_name: string | null;
  full_name_ka: string | null;
  id: string;
  phone_number: string | null;
  updated_at: string | null;
  username: string | null;
};
export const useProfileInfo = (
  userId?: string,
  {
    queryOptions,
  }: {
    queryOptions?: UseQueryOptions<
      profileResponse,
      PostgrestError,
      profileResponse
    >;
  } = {},
): UseQueryResult<profileResponse, PostgrestError> => {
  return useQuery<profileResponse, PostgrestError, profileResponse>({
    queryKey: [PROFILE_QUERY_KEYS.PROFILE, userId],
    queryFn: () => getProfileInfo(userId as string),
    enabled: !!userId,
    retry: false,
    ...queryOptions,
  });
};
