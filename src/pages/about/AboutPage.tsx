import { Book, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AboutPage = () => {
  return (
    <main className="flex-grow px-4 py-8">
      <div className="container mx-auto max-w-4xl space-y-12">
        <header className="space-y-4 text-center">
          <h1 className="text-4xl font-bold">About bitBlogs</h1>
          <p className="text-xl text-muted-foreground">
            Empowering tech enthusiasts to share knowledge and inspire
            innovation.
          </p>
        </header>
        <section className="grid items-center gap-12 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Our Mission</h2>
            <p className="text-muted-foreground">
              At bitBlogs, we believe in the power of shared knowledge. Our
              mission is to create a platform where tech enthusiasts,
              developers, and innovators can come together to share ideas, learn
              from each other, and push the boundaries of what&apos;s possible
              in the world of technology.
            </p>
          </div>
          <img
            src="https://g-zwkebgiacpe.vusercontent.net/placeholder.svg?height=400&amp;width=400"
            alt="Team collaboration"
            className="rounded-lg object-cover"
          />
        </section>

        <section className="space-y-8">
          <h2 className="text-center text-3xl font-bold">What We Offer</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <Book className="h-12 w-12 text-primary" />
                <CardTitle>Rich Content</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Access a wide range of articles, tutorials, and insights on
                  the latest tech trends and best practices.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-12 w-12 text-primary" />
                <CardTitle>Vibrant Community</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Connect with like-minded individuals, share your knowledge,
                  and grow your professional network.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Zap className="h-12 w-12 text-blue-600" />
                <CardTitle>Cutting-edge Topics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Stay ahead of the curve with content covering emerging
                  technologies and innovative solutions.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
        <section className="space-y-4 rounded-lg bg-muted p-8">
          <h2 className="text-3xl font-bold">Our Story</h2>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Founded in 2023, bitBlogs started as a small project by a group of
              passionate developers who wanted to create a space for sharing
              their experiences and learning from others. What began as a simple
              blog quickly grew into a thriving community of tech enthusiasts
              from all around the world.
            </p>
            <p className="text-muted-foreground">
              Today, bitBlogs is proud to be a leading platform for
              technology-focused content, fostering innovation and collaboration
              in the ever-evolving world of tech.
            </p>
          </div>
        </section>

        <section className="space-y-6 text-center">
          <h2 className="text-3xl font-bold">Join Us on Our Journey</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Whether you&apos;re a seasoned developer, a curious beginner, or
            somewhere in between, there&apos;s a place for you at bitBlogs.
            Let&apos;s shape the future of technology together.
          </p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            Get Started Today
          </Button>
        </section>
      </div>
    </main>
  );
};
export default AboutPage;
