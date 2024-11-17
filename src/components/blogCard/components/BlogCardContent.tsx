const BlogCardContent = ({ blogContent }) => {
  return (
    <div>
      <p className="blog-card-content text-muted-foreground p-6 pt-0">
        {blogContent}
      </p>
    </div>
  );
};

export default BlogCardContent;
