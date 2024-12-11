import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { useTranslation } from "react-i18next";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button/button";
import { Textarea } from "@/components/ui/textarea";
// import TagInput from "@/components/ui/tagInput";
import { Controller, useForm } from "react-hook-form";
import { useAuthContext } from "@/context/hooks/useAuthContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getBlogs, postBlogs } from "@/supabase/write/write";
import BlogBox from "../homePage/components/BlogBox/BlogBox";
import BlogCardHeader from "../homePage/components/BlogCardHeader/BlogCardHeader";
import BlogCardInfo from "../homePage/components/BlogCardInfo/BlogCardInfo";
import BlogCardContent from "../homePage/components/BlogCardContent/BlogCardContent";
import { useProfileInfo } from "@/react-query/profileInfo";
import { TabsList, Tabs, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import { writeBlogFormValues } from "./WritePage.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { blogCreateSchema } from "./schema";
import { AlertDestructive } from "@/components/error/errorAlert";
import { Alert } from "@/components/ui/alert";

const createBlogDefaultValues = {
  title_ka: "",
  title_en: "",
  description_ka: "",
  description_en: "",
  image_url: null,
};

const WritePage = () => {
  const { user } = useAuthContext();
  const authorFullName =
    useProfileInfo(user?.id).data?.full_name || user?.email;
  const authorFullNameKa =
    useProfileInfo(user?.id).data?.full_name_ka || user?.email;
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    reset: resetHookForm,
    formState: { errors },
  } = useForm<writeBlogFormValues>({
    resolver: zodResolver(blogCreateSchema),
    defaultValues: createBlogDefaultValues,
  });
  const { data: blogsData, refetch: refetchBlogs } = useQuery({
    queryKey: ["getBlogsData"],
    queryFn: getBlogs,
  });

  const calculateReadTime = (text: string) => {
    const wordsPerMinute = 200;
    const totalWords = text?.trim().split(/\s+/).length;
    const minutes = totalWords / wordsPerMinute;
    const readTime = Math.ceil(minutes);

    return readTime;
  };
  const getFormattedDate = (dateString: string) => {
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
  const {
    isSuccess: createdSuccess,
    mutate: createBlogMutate,
    isError: isBlogCreateError,
    error: BlogCreateError,
  } = useMutation({
    mutationKey: ["create-blog"],
    mutationFn: postBlogs,
    onSuccess: () => {
      refetchBlogs();
      resetHookForm();
    },
  });

  const onSubmit = (formValues: writeBlogFormValues) => {
    const id = user?.id ?? "";
    createBlogMutate({ formValues, id });
  };
  const firstError = Object.values(errors).find((error) => error);
  return (
    <div className="flex w-full flex-col items-center gap-8 px-4">
      <Card className="mx-auto mt-12 min-w-[40rem]">
        <CardHeader>
          <CardTitle className="mx-auto text-2xl font-bold">
            {t("write-page.page-header")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full space-y-4">
            <Tabs defaultValue="geo" className="mx-auto">
              <TabsList className="light:bg-neutral-200 border-1 mx-auto mb-4 grid max-w-48 grid-cols-2 items-center justify-center rounded-lg p-1 text-muted-foreground">
                <TabsTrigger value="geo">{t("write-page.tab-geo")}</TabsTrigger>
                <TabsTrigger value="eng">{t("write-page.tab-eng")}</TabsTrigger>
              </TabsList>
              <TabsContent className="space-y-5" value="geo">
                <div className="grid gap-4">
                  <Label htmlFor="title_ka">
                    {" "}
                    {t("write-page.blog-title-ka")}
                  </Label>
                  <Controller
                    control={control}
                    name="title_ka"
                    render={({ field: { onChange, value, onBlur } }) => {
                      return (
                        <Input
                          id="title_ka"
                          value={value}
                          onChange={onChange}
                          onBlur={onBlur}
                          type="text"
                          placeholder="შეიყვანეთ პოსტის სათაური"
                        />
                      );
                    }}
                  />
                </div>
                <div className="grid gap-4">
                  <Label htmlFor="description_ka">
                    {" "}
                    {t("write-page.blog-content-ka")}
                  </Label>
                  <Controller
                    control={control}
                    name="description_ka"
                    render={({ field: { value, onChange, onBlur } }) => {
                      return (
                        <Textarea
                          id="description_en"
                          value={value}
                          onChange={onChange}
                          onBlur={onBlur}
                          rows={5}
                          placeholder="დაწერეთ ბლოგის შინაარსი"
                        />
                      );
                    }}
                  />
                </div>
              </TabsContent>
              <TabsContent className="space-y-5" value="eng">
                <div className="grid gap-4">
                  <Label htmlFor="title_en">
                    {" "}
                    {t("write-page.blog-title-en")}
                  </Label>
                  <Controller
                    control={control}
                    name="title_en"
                    render={({ field: { onChange, value, onBlur } }) => {
                      return (
                        <Input
                          id="title_en"
                          value={value}
                          onChange={onChange}
                          onBlur={onBlur}
                          type="text"
                          placeholder="Enter post title"
                        />
                      );
                    }}
                  />
                </div>
                <div className="grid gap-4">
                  <Label htmlFor="description_en">
                    {" "}
                    {t("write-page.blog-content-en")}
                  </Label>
                  <Controller
                    control={control}
                    name="description_en"
                    render={({ field: { value, onChange, onBlur } }) => {
                      return (
                        <Textarea
                          id="description_en"
                          value={value}
                          onChange={onChange}
                          onBlur={onBlur}
                          rows={5}
                          placeholder="Write post content"
                        />
                      );
                    }}
                  />
                </div>
              </TabsContent>
            </Tabs>
            <div className="grid gap-4">
              <Label htmlFor="image_url">{t("write-page.blog-image")}</Label>
              <Controller
                control={control}
                name="image_url"
                render={({ field: { onChange } }) => {
                  return (
                    <Input
                      id="image_url"
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        onChange(file);
                      }}
                    />
                  );
                }}
              />
            </div>

            {/* <TagInput /> */}
            {firstError && (
              <AlertDestructive
                alertDescription={firstError?.message as string}
              />
            )}
            {isBlogCreateError && (
              <AlertDestructive
                alertTitle={BlogCreateError.name}
                alertDescription={BlogCreateError.message}
              />
            )}
            {createdSuccess && (
              <Alert className="mx-auto border-green-800 text-center text-green-800">
                Blog Created Successfuly
              </Alert>
            )}
            <Button
              onClick={handleSubmit(onSubmit)}
              className="mx-auto flex max-w-72"
            >
              {t("write-page.publish-button")}
            </Button>
          </div>
        </CardContent>
      </Card>
      <section className="max-w-[50rem] space-y-8">
        {blogsData?.map((blog) => {
          const blogImageUrl = blog?.image_url
            ? `${import.meta.env.VITE_SUPABASE_BLOG_IMAGES_STORAGE_URL}/${blog?.image_url}`
            : "";
          const {
            created_at,
            description_en,
            description_ka,
            id,
            title_en,
            title_ka,
            user_id,
          } = blog;

          return (
            <BlogBox key={id}>
              <BlogCardHeader
                imgSrc={blogImageUrl}
                headingText={title_en ?? ""}
                headingTextKa={title_ka ?? ""}
              />
              <BlogCardInfo
                author={authorFullName ?? ""}
                authorKa={authorFullNameKa ?? ""}
                date={getFormattedDate(created_at)}
                dateKa={getFormattedDate(created_at)}
                timeToRead={calculateReadTime(description_en ?? "")}
                authorId={user_id ?? ""}
              />
              <BlogCardContent
                blogContent={description_en ?? ""}
                blogContentKa={description_ka ?? ""}
              />
            </BlogBox>
          );
        })}
      </section>
    </div>
  );
};

export default WritePage;
