import BlogCardHeader from "./components/BlogCardHeader/BlogCardHeader";
import BlogCardInfo from "./components/BlogCardInfo/BlogCardInfo";
import BlogCardContent from "./components/BlogCardContent/BlogCardContent";
import BlogCardTags from "./components/BlogCardTags/BlogCardTags";
import BlogBox from "./components/BlogBox/BlogBox";
import CardHeader from "./components/CardHeader/CardHeader";
import {
  blogsData,
  featuredAuthors,
  popularTagsData,
  popularTagsDataKa,
} from "@/data/blogs-data";
import BlogAuthors from "./components/BlogAuthors/BlogAuthors";
import { useTranslation } from "react-i18next";

const HomePage = () => {
  const { t } = useTranslation();
  return (
    <main className="px-4 py-8">
      <div className="mx-auto flex w-full flex-row gap-8 max-sm:flex-col">
        <section className="w-2/3 space-y-8">
          {blogsData.map((blogItem) => {
            const {
              author,
              authorKa,
              blogContent,
              blogContentKa,
              date,
              dateKa,
              headingText,
              headingTextKa,
              imgSrc,
              tagsArr,
              tagsArrKa,
              timeToRead,
              id,
              authorId,
            } = blogItem;
            return (
              <BlogBox key={id}>
                <BlogCardHeader
                  imgSrc={imgSrc}
                  headingText={headingText}
                  headingTextKa={headingTextKa}
                />
                <BlogCardInfo
                  author={author}
                  authorKa={authorKa}
                  date={date}
                  dateKa={dateKa}
                  timeToRead={timeToRead}
                  authorId={authorId}
                />
                <BlogCardContent
                  blogContent={blogContent}
                  blogContentKa={blogContentKa}
                />
                <BlogCardTags tagsArr={tagsArr} tagsArrKa={tagsArrKa} />
              </BlogBox>
            );
          })}
        </section>
        <aside className="w-1/3 space-y-8">
          <BlogBox>
            <CardHeader cardHeader={t("home-page.popular-tags")} />
            <BlogCardTags
              tagsArr={popularTagsData}
              tagsArrKa={popularTagsDataKa}
            />
          </BlogBox>
          <BlogBox>
            <CardHeader cardHeader={t("home-page.featured-authors")} />
            <BlogAuthors featuredAuthors={featuredAuthors} />
          </BlogBox>
        </aside>
      </div>
    </main>
  );
};

export default HomePage;
