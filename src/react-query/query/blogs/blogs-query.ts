import { getBlogs } from "@/supabase/write/write";
import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { BLOGS_QUERY_KEYS } from "./blogsQueryKeys.enum";
import { blogsData } from "@/pages/write/WritePage.types";
import { PostgrestError } from "@supabase/supabase-js";

export const useBlogsData = (
  searchText?: string,
  {
    queryOptions,
  }: {
    queryOptions?: UseQueryOptions<blogsData[], PostgrestError, blogsData[]>;
  } = {},
): UseQueryResult<blogsData[], PostgrestError> => {
  return useQuery<blogsData[], PostgrestError, blogsData[]>({
    queryKey: [BLOGS_QUERY_KEYS.LIST, searchText],
    retry: false,
    queryFn: () => getBlogs(searchText),
    staleTime: 5 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    ...queryOptions,
  });
};
