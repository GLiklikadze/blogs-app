import { BlogBoxStyles } from "./BlogBox.style";

const BlogBox = ({ children }) => {
  return <div className={BlogBoxStyles()}>{children}</div>;
};

export default BlogBox;
