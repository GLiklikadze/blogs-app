type FeaturedAuthorsProps = {
  id: string;
  author: string;
  authorKa: string;
  iconSrc: string;
  profession: string;
  professionKa: string;
  authorInfo: string;
  authorInfoKa: string;
  authorFollowers: number;
  authorFollowing: number;
};
export type BlogAuthorsProps = {
  featuredAuthors: FeaturedAuthorsProps[];
};
