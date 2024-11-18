import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button/button";
import { Textarea } from "@/components/ui/textarea";
import TagInput from "@/components/ui/tagInput";

const WritePage = () => {
  const { t } = useTranslation();
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
              <Label htmlFor="postTitle"> Title</Label>
              <Input
                id="postTitle"
                type="text"
                placeholder="Enter post title"
                required
              />
            </div>
            <div className="grid gap-4">
              <Label htmlFor="postContent"> Content</Label>
              <Textarea
                id="postContent"
                rows={5}
                placeholder="Write post content"
                required
              />
            </div>
            <Label htmlFor="imgUploadInput">Cover Image</Label>
            <Input id="imgUploadInput" type="file" />
            <TagInput />
            <Button type="submit" className="w-full">
              {t("login-page.login-button")}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WritePage;
