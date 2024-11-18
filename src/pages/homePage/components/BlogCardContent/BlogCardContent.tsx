import { useTranslation } from "react-i18next";
import { BlogCardContentTypes } from "./BlogCardContent.types";

const BlogCardContent: React.FC<BlogCardContentTypes> = ({
  blogContent,
  blogContentKa,
}) => {
  const { i18n } = useTranslation();
  const blogContentData = i18n.language === "ka" ? blogContentKa : blogContent;
  return (
    <div>
      <p className="blog-card-content p-6 pt-0 text-muted-foreground">
        {blogContentData}
      </p>
    </div>
  );
};

export default BlogCardContent;
