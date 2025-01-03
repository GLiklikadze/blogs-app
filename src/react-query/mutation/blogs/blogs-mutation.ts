import { postBlogs, writeBlogFormValues } from "@/supabase/write/write";
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";
import { BLOGS_MUTATION_KEYS } from "./blogsMutationKeys.enum";
import { PostgrestError } from "@supabase/supabase-js";

export const usePostBlogs = (
  refetchBlogs: () => void,
  resetHookForm: () => void,
  {
    mutationOptions,
  }: {
    mutationOptions?: UseMutationOptions<
      void,
      PostgrestError,
      {
        formValues: writeBlogFormValues;
        id: string;
      }
    >;
  } = {},
): UseMutationResult<
  void,
  PostgrestError,
  {
    formValues: writeBlogFormValues;
    id: string;
  }
> => {
  return useMutation<
    void,
    PostgrestError,
    {
      formValues: writeBlogFormValues;
      id: string;
    }
  >({
    mutationKey: [BLOGS_MUTATION_KEYS.CREATE],
    mutationFn: postBlogs,
    onSuccess: () => {
      refetchBlogs();
      resetHookForm();
    },
    ...mutationOptions,
  });
};
