import { Book, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

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
                  {t("about-page.offer-1-content")}
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
