import { fillProfileInfo } from "@/supabase/profile/profile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PROFILE_MUTATION_KEYS } from "./profileMutationKeys.enum";
import { PROFILE_QUERY_KEYS } from "@/react-query/query/profile/profileQueryKeys.enum";

export const useEditProfile = (user_id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [PROFILE_MUTATION_KEYS.UPDATE],
    mutationFn: fillProfileInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [PROFILE_QUERY_KEYS.PROFILE, user_id],
      });
      // queryClient.invalidateQueries({
      //   queryKey: ["getprofilePhoto", user_id],
      // });
    },
  });
};
