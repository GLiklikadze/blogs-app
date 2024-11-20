import { Badge } from "@/components/ui/badge/badge";
import { Link } from "react-router-dom";
import { BlogCardTagsProps } from "./BlogCardTags.types";
import { useTranslation } from "react-i18next";

const BlogCardTags: React.FC<BlogCardTagsProps> = ({
  tagsArr,
  tagsArrKa,
  padding = "6",
}) => {
  const { i18n } = useTranslation();
  const tagsData = i18n.language === "ka" ? tagsArrKa : tagsArr;

  return (
    <div className={`flex flex-wrap items-center gap-2 p-${padding} pt-0`}>
      {tagsData?.map((tag, index) => {
        return (
          <Link to="" key={index}>
            <Badge variant="default">{tag}</Badge>
          </Link>
        );
      })}
    </div>
  );
};

export default BlogCardTags;
