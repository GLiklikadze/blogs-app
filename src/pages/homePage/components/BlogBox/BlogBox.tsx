import { PropsWithChildren } from "react";
import { BlogBoxStyles } from "./BlogBox.style";

const BlogBox: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className={BlogBoxStyles()}>{children}</div>;
};

export default BlogBox;
