import { Link } from "react-router-dom";
import { BlogCardInfoProps } from "./BlogCardInfo.types";
import { useTranslation } from "react-i18next";

const BlogCardInfo: React.FC<BlogCardInfoProps> = ({
  author,
  authorKa,
  date,
  dateKa,
  timeToRead,
}) => {
  const { i18n, t } = useTranslation();
  const authorData = i18n.language === "ka" ? authorKa : author;
  const dateData = i18n.language === "ka" ? dateKa : date;
  return (
    <div className="flex items-center space-x-2 p-6 pt-0 text-sm">
      <Link className="hover:underline" to="/author">
        {authorData}
      </Link>
      <span>•</span>
      <span>{dateData}</span>
      <span>•</span>
      <span>
        {timeToRead} {t("card-info.min-read")}
      </span>
    </div>
  );
};

export default BlogCardInfo;
