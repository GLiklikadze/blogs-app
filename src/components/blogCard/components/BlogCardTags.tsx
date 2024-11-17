import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const BlogCardTags = ({ tagsArr }) => {
  return (
    <div className="flex flex-wrap items-center gap-2 p-6 pt-0">
      {tagsArr?.map((tag, index) => {
        return (
          <Link to="" key={index}>
            <Badge variant="default" color="black">
              {tag}
            </Badge>
          </Link>
        );
      })}
    </div>
  );
};

export default BlogCardTags;
