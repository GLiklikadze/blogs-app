export type writeBlogFormValues = {
  title_ka: string;
  title_en: string;
  description_ka: string;
  description_en: string;
  image_url: null | File;
};
export type blogsData = {
  title_ka: string;
  title_en: string;
  description_ka: string;
  description_en: string;
  image_url: null | File;
  created_at: string;
  id: string;
  user_id: string;
};
