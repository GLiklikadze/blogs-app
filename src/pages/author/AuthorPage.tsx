import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { Twitter, Facebook, Linkedin, Github, User, Users } from "lucide-react";
import BlogBox from "../homePage/components/BlogBox/BlogBox";
import BlogCardHeader from "../homePage/components/BlogCardHeader/BlogCardHeader";
import BlogCardInfo from "../homePage/components/BlogCardInfo/BlogCardInfo";
import BlogCardContent from "../homePage/components/BlogCardContent/BlogCardContent";
import BlogCardTags from "../homePage/components/BlogCardTags/BlogCardTags";
import { blogsData, featuredAuthors } from "@/data/blogs-data";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

export default function AuthorPage() {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const selectedAuthor = featuredAuthors.find((author) => author.id === id);
  const authorName =
    i18n.language === "ka" ? selectedAuthor?.authorKa : selectedAuthor?.author;
  const authorInfo =
    i18n.language === "ka"
      ? selectedAuthor?.authorInfoKa
      : selectedAuthor?.authorInfo;
  const authorFirstAndLastNameArray = selectedAuthor?.author.split(" ");
  const firstName = authorFirstAndLastNameArray?.[0][0];
  const lastName = authorFirstAndLastNameArray?.[1][0];
  return (
    <div className="mx-auto max-w-4xl flex-grow px-4 py-8">
      <Card className="mb-12 flex flex-col items-center rounded-lg bg-card p-8 shadow-lg md:flex-row md:items-start">
        <div className="flex flex-col items-start gap-6 md:flex-row">
          <Avatar className="h-32 w-32 border-4 border-primary">
            <AvatarFallback className="text-2xl">
              {`${firstName}${lastName}`}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-4">
            <h1 className="text-3xl font-bold"> {authorName}</h1>
            <p className="text-muted-foreground">{authorInfo}</p>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="rounded-full">
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Facebook className="h-4 w-4" />
                <span className="sr-only">Facebook</span>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Button>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>
                  {selectedAuthor?.authorFollowers}{" "}
                  {t("author-page.author-followers")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>
                  {selectedAuthor?.authorFollowing}{" "}
                  {t("author-page.author-following")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>
      <div>
        <Tabs defaultValue="articles">
          <TabsList className="light:bg-neutral-200 mb-8 grid h-9 w-full grid-cols-2 items-center justify-center rounded-lg p-1 text-muted-foreground">
            <TabsTrigger value="articles">
              {t("author-page.tab-articles")}
            </TabsTrigger>
            <TabsTrigger value="about">
              {t("author-page.tab-about")}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="articles">
            <section className="space-y-8">
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
          </TabsContent>
          <TabsContent value="about">
            <BlogBox>
              <CardHeader className="">
                {" "}
                <CardTitle className="text-s font-semibold">
                  {t("author-page.tab-about")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{authorInfo}</CardDescription>
                <CardHeader className="pl-0">
                  <CardTitle className="font-semibold">
                    {t("author-page.author-skills")}
                  </CardTitle>
                </CardHeader>
                <BlogCardTags
                  tagsArr={selectedAuthor?.tagsArr ?? []}
                  tagsArrKa={selectedAuthor?.tagsArrKa ?? []}
                  padding="0"
                />
              </CardContent>
            </BlogBox>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
