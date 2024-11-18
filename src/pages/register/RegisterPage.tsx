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

const RegisterPage = () => {
  const { t } = useTranslation();
  return (
    <div>
      <div className="flex h-screen w-full items-center justify-center px-4">
        <Card className="mx-auto w-[30rem]">
          <CardHeader>
            <CardTitle className="mx-auto text-2xl font-bold">
              {t("register-page.register-header")}
            </CardTitle>
            <CardDescription className="mx-auto text-center">
              {t("register-page.register-message")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">
                  {" "}
                  {t("register-page.register-name-label")}
                </Label>
                <Input id="name" type="text" placeholder="John Doe" required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">
                  {" "}
                  {t("register-page.register-email-label")}
                </Label>
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
                    {t("register-page.register-password-label")}
                  </Label>
                </div>
                <Input id="password" type="password" required />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="confirmPassword">
                    {" "}
                    {t("register-page.register-confirm-password-label")}
                  </Label>
                </div>
                <Input id="confirmPassword" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                {t("register-page.sign-up-button")}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              {t("register-page.sign-up-message")}
              <Link to="/login" className="text-primary underline">
                {t("register-page.log-in-link")}
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
