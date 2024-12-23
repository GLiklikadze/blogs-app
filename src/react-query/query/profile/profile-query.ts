import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { getProfileInfo } from "@/supabase/profile/profile";
import { PROFILE_QUERY_KEYS } from "./profileQueryKeys.enum";
import { PostgrestError } from "@supabase/supabase-js";
import { profileResponse } from "./profile.types";

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
