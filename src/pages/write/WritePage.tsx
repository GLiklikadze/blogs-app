import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { useTranslation } from "react-i18next";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button/button";
import { Textarea } from "@/components/ui/textarea";
// import TagInput from "@/components/ui/tagInput";
import { Controller, useForm } from "react-hook-form";
import { supabase } from "@/supabase/supabaseClient";
import { useAuthContext } from "@/context/hooks/useAuthContext";

type writeBlogFormValues = {
  title_ka: string;
  title_en: string;
  description_ka: string;
  description_en: string;
  // user_id: string;
  image_url: null | File;
};

const createBlogDefaultValues = {
  title_ka: "",
  title_en: "",
  description_ka: "",
  description_en: "",
  // user_id: string;
  image_url: null,
};

const WritePage = () => {
  const { user } = useAuthContext();
  // const { t } = useTranslation();
  const { control, handleSubmit } = useForm<writeBlogFormValues>({
    defaultValues: createBlogDefaultValues,
  });

  const onSubmit = (formValues: writeBlogFormValues) => {
    if (formValues?.image_url) {
      supabase.storage
        .from("blog_images")
        .upload(formValues.image_url?.name, formValues?.image_url)
        .then((res) => {
          return supabase.from("blogs").insert({
            title_ka: formValues.title_ka,
            title_en: formValues.title_en,
            decription_en: formValues.description_en,
            description_ka: formValues.description_ka,
            image_url: res.data?.fullPath,
            user_id: user?.id,
          });
          console.log("Upload File Response:", res.data?.fullPath);
        })
        .then((res) => console.log("created blog", res));
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <Card className="mx-auto w-[46rem]">
        <CardHeader>
          <CardTitle className="mx-auto text-2xl font-bold">
            {/* {t("login-page.login-header")} */}Write a New Post
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-4">
              <Label htmlFor="title_en"> Title En</Label>
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
              <Label htmlFor="title_ka"> Title Ka</Label>
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
              <Label htmlFor="description_en"> Content EN</Label>
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
            <div className="grid gap-4">
              <Label htmlFor="description_ka"> Content KA</Label>
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
            <Label htmlFor="image_url">Cover Image</Label>
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
            {/* <TagInput /> */}
            <Button onClick={handleSubmit(onSubmit)} className="w-full">
              Publish Blog
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WritePage;
