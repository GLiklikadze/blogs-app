import { Link } from "react-router-dom";
import BlogCard from "@/components/blogCard/BlogBox";
import BlogCardHeader from "@/components/blogCard/components/BlogCardHeader";
import BlogCardInfo from "@/components/blogCard/components/BlogCardInfo";
import BlogCardContent from "@/components/blogCard/components/BlogCardContent";
import BlogCardTags from "@/components/blogCard/components/BlogCardTags";
import BlogBox from "@/components/blogCard/BlogBox";
import CardHeader from "@/components/blogCard/components/CardHeader";
import { Car } from "lucide-react";

const HomePage = () => {
  const {
    author,
    blogContent,
    date,
    headingText,
    imgSrc,
    tagsArr,
    timeToRead,
  } = {
    imgSrc:
      "https://g-zwkebgiacpe.vusercontent.net/placeholder.svg?height=200&width=400",
    headingText: "The Future of Blockchain Technology",
    blogContent: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco
                laboris...`,
    timeToRead: "5",
    date: "May 15, 2023",
    author: "John Doe",
    tagsArr: ["Blockchain", "Technology", "Future"],
  };
  return (
    <main className="px-4 py-8">
      <div className="w-full mx-auto flex flex-row gap-8">
        <section className="w-2/3 space-y-8">
          {/* <div className="rounded-xl border p-6">
            <div className="flex flex-col space-y-1.5">
              <img
                src="https://g-zwkebgiacpe.vusercontent.net/placeholder.svg?height=200&width=400"
                className="rounded-lg object-cover w-full h-[200px]"
              />
              <h1 className="tracking-tighter text-2xl font-bold">
                The Future of Blockchain Technology
              </h1>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Link className="hover:underline" to="">
                John Doe
              </Link>
              <span>•</span>
              <span>May 15, 2023</span>
              <span>•</span>
              <span>5 min read</span>
            </div>
            <div className="">
              <p className="text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco
                laboris...
              </p>
            </div>
            <div className="flex items-center p-6 pl-0 space-x-2">
              <Badge variant="default" color="black">
                Blockchain
              </Badge>
              <Badge variant="default" color="black">
                Technology
              </Badge>
              <Badge variant="default" color="black">
                Future
              </Badge>
            </div>
          </div> */}
          <BlogBox>
            <BlogCardHeader imgSrc={imgSrc} headingText={headingText} />
            <BlogCardInfo author={author} date={date} timeToRead={timeToRead} />
            <BlogCardContent blogContent={blogContent} />
            <BlogCardTags tagsArr={tagsArr} />
          </BlogBox>
        </section>
        <aside className="w-1/3 space-y-8">
          <BlogBox>
            <CardHeader cardHeader="Popular Tags" />
            <BlogCardTags tagsArr={tagsArr} />
          </BlogBox>
          <BlogBox>
            <CardHeader cardHeader="Featured Authors" />
            <div className="pt-0">
              <ul className="space-y-4">
                <li className="">
                  <Link to="" className="flex items-center space-x-4 p-6 pt-0">
                    <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                      <img
                        className="h-full w-full"
                        alt="Avatar of Alice Johnson"
                        src="https://g-zwkebgiacpe.vusercontent.net/placeholder.svg?height=40&amp;width=40"
                      />
                    </span>
                    <div>
                      <div className="font-semibold hover:underline">
                        Alice Johnson
                      </div>
                      <p className="text-sm">Blockchain Enthusiast</p>
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
          </BlogBox>
        </aside>
      </div>
    </main>
  );
};

export default HomePage;
