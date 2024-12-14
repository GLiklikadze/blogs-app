import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button/button";
import { Textarea } from "@/components/ui/textarea";
import { TabsList, Tabs, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AlertDestructive } from "@/components/error/errorAlert";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormHandleSubmit,
} from "react-hook-form";
import { t } from "i18next";
import { writeBlogFormValues } from "@/supabase/write/write";
import { MutableRefObject } from "react";

type BlogCreateFormProps = {
  control: Control<writeBlogFormValues>;
  handleSubmit: UseFormHandleSubmit<writeBlogFormValues, undefined>;
  onSubmit: (formValues: writeBlogFormValues) => void;
  createdSuccess: boolean;
  BlogCreateError: Error | null;
  isBlogCreateError: boolean;
  isDirty: boolean;
  errors: FieldErrors<writeBlogFormValues>;
  fileInputRef: MutableRefObject<HTMLInputElement | null>;
};

export const BlogCreateForm: React.FC<BlogCreateFormProps> = ({
  control,
  handleSubmit,
  onSubmit,
  createdSuccess,
  BlogCreateError,
  isBlogCreateError,
  isDirty,
  errors,
  fileInputRef,
}) => {
  const firstError = Object.values(errors).find((error) => error);
  return (
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
  );
};
