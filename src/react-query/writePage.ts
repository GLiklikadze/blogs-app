import { getBlogs, postBlogs } from "@/supabase/write/write";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useBlogsData = (searchText?: string) => {
  const {
    data: blogsData = [],
    refetch: refetchBlogs,
    isLoading: isBlogsLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["getBlogsData", searchText],
    retry: false,
    queryFn: () => getBlogs(searchText),
    staleTime: 5 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
  return { blogsData, refetchBlogs, isBlogsLoading, isSuccess };
};

export const usePostBlogs = (
  refetchBlogs: () => void,
  resetHookForm: () => void,
) => {
  const {
    isSuccess: createdSuccess,
    mutate: createBlogMutate,
    isError: isBlogCreateError,
    error: BlogCreateError,
  } = useMutation({
    mutationKey: ["create-blog"],
    mutationFn: postBlogs,
    onSuccess: () => {
      refetchBlogs();
      resetHookForm();
    },
  });
  return {
    createdSuccess,
    createBlogMutate,
    isBlogCreateError,
    BlogCreateError,
  };
};
