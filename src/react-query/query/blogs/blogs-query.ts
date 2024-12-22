import { getBlogs } from "@/supabase/write/write";
import { useQuery } from "@tanstack/react-query";
import { BLOGS_QUERY_KEYS } from "./blogsQueryKeys.enum";

export const useBlogsData = (searchText?: string) => {
  return useQuery({
    queryKey: [BLOGS_QUERY_KEYS.LIST, searchText],
    retry: false,
    queryFn: () => getBlogs(searchText),
    staleTime: 5 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};
