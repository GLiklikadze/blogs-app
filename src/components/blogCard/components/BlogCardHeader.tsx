const BlogCardHeader = ({ imgSrc, headingText }) => {
  return (
    <div className="blog-card-header flex flex-col space-y-1.5 p-6">
      <img
        src={imgSrc}
        className="h-[200px] w-full rounded-lg object-cover"
        alt="blog-image"
      />
      <h1 className="text-2xl font-bold tracking-tighter">{headingText}</h1>
    </div>
  );
};

export default BlogCardHeader;
