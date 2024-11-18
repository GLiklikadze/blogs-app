import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button/button";

const LoginPage = () => {
  const { t } = useTranslation();
  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <Card className="mx-auto w-[30rem]">
        <CardHeader>
          <CardTitle className="mx-auto text-2xl font-bold">
            {t("login-page.login-header")}
          </CardTitle>
          <CardDescription className="mx-auto text-center">
            {t("login-page.login-message")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email"> {t("login-page.email-label")}</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">
                  {" "}
                  {t("login-page.password-label")}
                </Label>
                <Link
                  to=""
                  className="ml-auto inline-block text-sm text-primary underline"
                >
                  {t("login-page.forgot-password")}
                </Link>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              {t("login-page.login-button")}
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            {t("login-page.sing-up-label")}
            <Link to="/register" className="text-primary underline">
              {t("login-page.sing-up-link")}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
