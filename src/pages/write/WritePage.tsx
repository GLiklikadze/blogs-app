import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button/button";
import { Textarea } from "@/components/ui/textarea";
// import TagInput from "@/components/ui/tagInput";
import { Controller, useForm } from "react-hook-form";
import { useAuthContext } from "@/context/hooks/useAuthContext";
import { TabsList, Tabs, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import { blogFilter, writeBlogFormValues } from "./WritePage.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { blogCreateSchema } from "./schema";
import { AlertDestructive } from "@/components/error/errorAlert";
import { useBlogsData, usePostBlogs } from "@/react-query/writePage";
import { Filter } from "lucide-react";
import { useMemo, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import qs from "qs";
import { useEffect } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { BlogsList } from "./components/BlogsList";

const createBlogDefaultValues = {
  title_ka: "",
  title_en: "",
  description_ka: "",
  description_en: "",
  image_url: null,
};
// const blogFilterDefaultValues = {
//   searchText: "",
// };

const WritePage = () => {
  const { user } = useAuthContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const parsedQueryParams = qs.parse(searchParams.toString());

  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    reset: resetHookForm,
    formState: { errors, isDirty },
  } = useForm<writeBlogFormValues>({
    resolver: zodResolver(blogCreateSchema),
    defaultValues: createBlogDefaultValues,
  });
  const { control: searchControl, watch } = useForm<blogFilter>({
    defaultValues: parsedQueryParams,
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const searchObj = watch();
  const memoizedSearchObj = useMemo(() => searchObj, [searchObj]);
  const debouncedText = useDebounce(memoizedSearchObj?.searchText, 500);

  const { blogsData, isBlogsLoading, refetchBlogs, isSuccess } =
    useBlogsData(debouncedText);

  const handleReset = () => {
    resetHookForm();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  console.log(11);
  const {
    createBlogMutate,
    createdSuccess,
    BlogCreateError,
    isBlogCreateError,
  } = usePostBlogs(refetchBlogs, handleReset);

  // const onSearchSubmit = (data) => {
  //   refetchBlogs(data);
  // };

  useEffect(() => {
    if (isSuccess) {
      setSearchParams(
        qs.stringify(
          { searchText: debouncedText },
          {
            skipNulls: true,
            filter: (_, value) => {
              return value || undefined;
            },
          },
        ),
      );
    }
  }, [isSuccess, debouncedText, setSearchParams]);

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
                      ref={fileInputRef}
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
                alertTitle={BlogCreateError?.name || ""}
                alertDescription={BlogCreateError?.message || ""}
              />
            )}
            {createdSuccess && !isDirty && (
              <div className="mx-auto w-1/2 text-center text-green-800">
                Blog Created Successfuly
              </div>
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
      <div className="space-b flex flex-row items-center gap-4">
        <Label className="whitespace-nowrap text-base font-bold">
          {t("write-page.filter-label")}
        </Label>
        <Controller
          control={searchControl}
          name="searchText"
          render={({ field: { onChange, value } }) => {
            return (
              <Input
                className="h-12 w-60 border-2"
                name="searchText"
                id="search-text"
                value={value}
                onChange={onChange}
                type="text"
                placeholder={t("write-page.filter-placeholder")}
              />
            );
          }}
        />
        {/* <Button onClick={handleSearchSubmit(onSearchSubmit)}>
          Search Blog
        </Button> */}
        <Filter size="2rem" />
      </div>
      <section className="max-w-[50rem] space-y-8">
        {isSuccess && (
          <BlogsList
            blogsData={blogsData ?? []}
            isBlogsLoading={isBlogsLoading}
          />
        )}
      </section>
    </div>
  );
};

export default WritePage;
