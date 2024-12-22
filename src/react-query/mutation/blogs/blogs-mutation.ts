import { postBlogs } from "@/supabase/write/write";
import { useMutation } from "@tanstack/react-query";
import { BLOGS_MUTATION_KEYS } from "./blogsMutationKeys.enum";

export const usePostBlogs = (
  refetchBlogs: () => void,
  resetHookForm: () => void,
) => {
  return useMutation({
    mutationKey: [BLOGS_MUTATION_KEYS.CREATE],
    mutationFn: postBlogs,
    onSuccess: () => {
      refetchBlogs();
      resetHookForm();
    },
  });
};
