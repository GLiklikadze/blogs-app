import { Link } from "react-router-dom";
import { BlogAuthorsProps } from "./BlogAuthors.types";
import { useTranslation } from "react-i18next";

const BlogAuthors: React.FC<BlogAuthorsProps> = ({ featuredAuthors }) => {
  const { i18n } = useTranslation();
  return (
    <div className="pt-0">
      <ul>
        {featuredAuthors.map((authorObj, index: number) => {
          const { author, authorKa, iconSrc, profession, professionKa } =
            authorObj;
          const authorName = i18n.language === "ka" ? authorKa : author;
          const professionData =
            i18n.language === "ka" ? professionKa : profession;
          return (
            <li key={index}>
              <Link
                to=""
                className="flex flex-wrap items-center space-x-4 p-6 pt-0"
              >
                <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                  <img
                    className="h-full w-full"
                    alt={`avatar of ${authorName} `}
                    src={iconSrc}
                  />
                </span>
                <div>
                  <div className="font-semibold hover:underline">
                    {authorName}
                  </div>
                  <p className="text-sm">{professionData}</p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BlogAuthors;
