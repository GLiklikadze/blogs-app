import BlogBox from "@/pages/homePage/components/BlogBox/BlogBox";
import BlogCardContent from "@/pages/homePage/components/BlogCardContent/BlogCardContent";
import BlogCardHeader from "@/pages/homePage/components/BlogCardHeader/BlogCardHeader";
import BlogCardInfo from "@/pages/homePage/components/BlogCardInfo/BlogCardInfo";
import { getFormattedDate, calculateReadTime } from "../writeUtils";
import { blogsData } from "../WritePage.types";
import { useProfileInfo } from "@/react-query/query/profile/profile-query";
import { useAuthContext } from "@/context/hooks/useAuthContext";
import { BlogListTypes } from "./BlogsList.types";

export const BlogsList: React.FC<BlogListTypes> = ({
  blogsData,
  isBlogsLoading,
}) => {
  const { user } = useAuthContext();
  const authorFullName =
    useProfileInfo(user?.id).data?.full_name || user?.email;
  const authorFullNameKa =
    useProfileInfo(user?.id).data?.full_name_ka || user?.email;

  return blogsData?.map((blog: blogsData) => {
    const blogImageUrl = blog?.image_url
      ? `${import.meta.env.VITE_SUPABASE_BLOG_IMAGES_STORAGE_URL}/${blog?.image_url}`
      : "";
    const {
      created_at,
      description_en,
      description_ka,
      id,
      title_en,
      title_ka,
      user_id,
    } = blog;
    return isBlogsLoading ? (
      "Loading Blogs"
    ) : (
      <BlogBox key={id}>
        <BlogCardHeader
          imgSrc={blogImageUrl}
          headingText={title_en ?? ""}
          headingTextKa={title_ka ?? ""}
        />
        <BlogCardInfo
          author={authorFullName ?? ""}
          authorKa={authorFullNameKa ?? ""}
          date={getFormattedDate(created_at)}
          dateKa={getFormattedDate(created_at)}
          timeToRead={calculateReadTime(description_en ?? "")}
          authorId={user_id ?? ""}
        />
        <BlogCardContent
          blogContent={description_en ?? ""}
          blogContentKa={description_ka ?? ""}
        />
      </BlogBox>
    );
  });
};
