import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { useAuthContext } from "@/context/hooks/useAuthContext";
import { useTranslation } from "react-i18next";
import { blogFilter } from "./WritePage.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { blogCreateSchema } from "./schema";
import { useBlogsData, usePostBlogs } from "@/react-query/writePage";
import { Filter } from "lucide-react";
import { useMemo, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import qs from "qs";
import { useEffect } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { BlogsList } from "./components/BlogsList";
import { BlogCreateForm } from "./components/BlogCreateForm/BlogCreateForm";
import { writeBlogFormValues } from "@/supabase/write/write";

const createBlogDefaultValues = {
  title_ka: "",
  title_en: "",
  description_ka: "",
  description_en: "",
  image_url: null,
};
const blogFilterDefaultValues = {
  searchText: "",
};

const WritePage = () => {
  const { user } = useAuthContext();
  const [searchParams, setSearchParams] = useSearchParams(
    blogFilterDefaultValues,
  );
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

  const handleReset = () => {
    resetHookForm();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  const { blogsData, isBlogsLoading, refetchBlogs, isSuccess } =
    useBlogsData(debouncedText);

  const {
    createBlogMutate,
    createdSuccess,
    BlogCreateError,
    isBlogCreateError,
  } = usePostBlogs(refetchBlogs, handleReset);

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

  return (
    <div className="flex w-full flex-col items-center gap-8 px-4">
      <BlogCreateForm
        control={control}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        createdSuccess={createdSuccess}
        BlogCreateError={BlogCreateError}
        isBlogCreateError={isBlogCreateError}
        isDirty={isDirty}
        errors={errors}
        fileInputRef={fileInputRef}
      />
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
