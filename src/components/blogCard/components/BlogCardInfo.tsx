import { Link } from "react-router-dom";

const BlogCardInfo = ({ author, date, timeToRead }) => {
  return (
    <div className="flex items-center space-x-2 p-6 pt-0 text-sm">
      <Link className="hover:underline" to="">
        {author}
      </Link>
      <span>•</span>
      <span>{date}</span>
      <span>•</span>
      <span>{timeToRead} min read</span>
    </div>
  );
};

export default BlogCardInfo;
