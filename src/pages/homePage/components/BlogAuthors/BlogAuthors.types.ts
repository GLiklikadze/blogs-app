type FeaturedAuthorsProps = {
  author: string;
  authorKa: string;
  iconSrc: string;
  profession: string;
  professionKa: string;
};
export type BlogAuthorsProps = {
  featuredAuthors: FeaturedAuthorsProps[];
};
