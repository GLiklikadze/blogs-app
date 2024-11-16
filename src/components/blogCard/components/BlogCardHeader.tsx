const BlogCardHeader = ({ imgSrc, headingText }) => {
  return (
    <div className="blog-card-header flex flex-col space-y-1.5 p-6">
      <img src={imgSrc} className="rounded-lg object-cover w-full h-[200px]" />
      <h1 className="tracking-tighter text-2xl font-bold">{headingText}</h1>
    </div>
  );
};

export default BlogCardHeader;
