import { getBlogs, postBlogs } from "@/supabase/write/write";
import { useMutation, useQuery } from "@tanstack/react-query";
import underscore from "underscore";

export const useBlogsData = (searchObj?: { searchText: string }) => {
  const {
    data: blogsData = [],
    refetch: refetchBlogs,
    isLoading: isBlogsLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["getBlogsData", searchObj?.searchText],
    retry: false,
    queryFn: async () => {
      if (searchObj?.searchText?.length || 0 > 1) {
        return new Promise((resolve) => {
          const debouncedGetBlogs = underscore.debounce(async () => {
            const blogs = await getBlogs(searchObj?.searchText);
            resolve(blogs);
          }, 500);
          debouncedGetBlogs();
        });
      } else {
        return getBlogs(searchObj?.searchText);
      }
    },
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
