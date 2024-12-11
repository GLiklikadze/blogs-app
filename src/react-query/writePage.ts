import { getBlogs, postBlogs } from "@/supabase/write/write";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useBlogsData = () => {
  const {
    data: blogsData,
    refetch: refetchBlogs,
    isLoading: isBlogsLoading,
  } = useQuery({
    queryKey: ["getBlogsData"],
    queryFn: getBlogs,
  });

  return { blogsData, refetchBlogs, isBlogsLoading };
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
