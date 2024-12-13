export const calculateReadTime = (text: string) => {
  const wordsPerMinute = 200;
  const totalWords = text?.trim().split(/\s+/).length;
  const minutes = totalWords / wordsPerMinute;
  const readTime = Math.ceil(minutes);

  return readTime;
};
export const getFormattedDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};
