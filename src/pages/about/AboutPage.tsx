import { Book, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
// {
//   "about-heading": "About bitBlogs",
//   "about-description": "Empowering tech enthusiasts to share knowledge and inspire innovation.",
//   "blog-mission-heading": "Our Mission",
//   "blog-mission": "At bitBlogs, we believe in the power of shared knowledge. Our mission is to create a platform where tech enthusiasts, developers, and innovators can come together to share ideas, learn from each other, and push the boundaries of what's possible in the world of technology.",
//   "page-offer-heading": "What We Offer",
//   "offer-1-heading": "Rich Content",
//   "offer-1-content": "Access a wide range of articles, tutorials, and insights on the latest tech trends and best practices.",
//   "offer-2-heading": "Vibrant Community",
//   "offer-2-content": "Connect with like-minded individuals, share your knowledge, and grow your professional network.",
//   "offer-3-heading": "Cutting-edge Topics",
//   "offer-3-content": "Stay ahead of the curve with content covering emerging technologies and innovative solutions.",
//   "page-story-heading": "Our Story",
//   "page-story-content": "Founded in 2023, bitBlogs started as a small project by a group of passionate developers who wanted to create a space for sharing their experiences and learning from others. What began as a simple blog quickly grew into a thriving community of tech enthusiasts from all around the world.\n Today, bitBlogs is proud to be a leading platform for technology-focused content, fostering innovation and collaboration in the ever-evolving world of tech.",
//   "join-us-heading": "Join Us on Our Journey",
//   "join-us-text": "Whether you're a seasoned developer, a curious beginner, or somewhere in between, there's a place for you at bitBlogs. Let's shape the future of technology together.",
//   "start-register-button": "Get Started Today"
// }
const AboutPage = () => {
  const { t } = useTranslation();
  return (
    <main className="flex-grow px-4 py-8">
      <div className="container mx-auto max-w-4xl space-y-12">
        <header className="space-y-4 text-center">
          <h1 className="text-4xl font-bold">
            {t("about-page.about-heading")}
          </h1>
          <p className="text-xl text-muted-foreground">
            {t("about-page.about-description")}
          </p>
        </header>
        <section className="grid items-center gap-12 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">
              {t("about-page.blog-mission-heading")}
            </h2>
            <p className="text-muted-foreground">
              {t("about-page.blog-mission")}
            </p>
          </div>
          <img
            src="https://g-zwkebgiacpe.vusercontent.net/placeholder.svg?height=400&amp;width=400"
            alt="Team collaboration"
            className="rounded-lg object-cover"
          />
        </section>

        <section className="space-y-8">
          <h2 className="text-center text-3xl font-bold">
            {t("about-page.page-offer-heading")}
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <Book className="h-12 w-12 text-primary" />
                <CardTitle>{t("about-page.offer-1-heading")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  <CardTitle className="leading-6">
                    {t("about-page.offer-1-content")}
                  </CardTitle>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-12 w-12 text-primary" />
                <CardTitle>{t("about-page.offer-2-heading")}</CardTitle>
              </CardHeader>
              <CardContent className="leading-6">
                <p className="text-muted-foreground">
                  {t("about-page.offer-2-content")}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="leading-6">
                <Zap className="h-12 w-12 text-primary" />

                {t("about-page.offer-3-heading")}
              </CardHeader>
              <CardContent className="leading-6">
                <p className="text-muted-foreground">
                  {t("about-page.offer-3-content")}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
        <section className="space-y-4 rounded-lg bg-muted p-8">
          <h2 className="text-3xl font-bold">
            {" "}
            <CardTitle>{t("about-page.page-story-heading")}</CardTitle>
          </h2>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              {t("about-page.page-story-content")}
            </p>
            <p className="text-muted-foreground">
              {t("about-page.page-story-content-2")}
            </p>
          </div>
        </section>

        <section className="space-y-6 text-center">
          <h2 className="text-3xl font-bold">
            {t("about-page.join-us-heading")}
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            {t("about-page.join-us-text")}
          </p>
          <br />
          <Link to="/register">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              {t("about-page.start-register-button")}
            </Button>
          </Link>
        </section>
      </div>
    </main>
  );
};
export default AboutPage;
