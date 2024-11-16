import { Badge } from "@/components/ui/badge";

const BlogCardTags = ({ tagsArr }) => {
  return (
    <div className="flex items-center p-6  pt-0 space-x-2">
      {tagsArr.map((tag, index) => {
        return (
          <Badge variant="default" color="black" key={index}>
            {tag}
          </Badge>
        );
      })}
    </div>
  );
};

export default BlogCardTags;
