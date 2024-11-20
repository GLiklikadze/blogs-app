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
import { ChangeEvent, FormEvent, useState } from "react";
import { login } from "@/supabase/auth/httpRegister";
import { AlertDestructive } from "@/components/error/errorAlert";
import { useMutation } from "@tanstack/react-query";

const initialLoginObj = {
  email: "",
  password: "",
};
const LoginPage = () => {
  const [loginData, setLoginData] = useState(initialLoginObj);

  const { mutate, isError, error, isSuccess } = useMutation({
    mutationKey: ["register"],
    mutationFn: login,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prevLoginData) => {
      return {
        ...prevLoginData,
        [name]: value,
      };
    });
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(loginData);
    setLoginData(initialLoginObj);
  };
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
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email"> {t("login-page.email-label")}</Label>
                <Input
                  id="email"
                  value={loginData.email}
                  onChange={handleChange}
                  type="email"
                  name="email"
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
                <Input
                  id="password"
                  name="password"
                  type="password"
                  onChange={handleChange}
                  value={loginData.password}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                {t("login-page.login-button")}
              </Button>
            </div>
            {isError && (
              <div className="mt-4">
                <AlertDestructive
                  alertTitle={error.name}
                  alertDescription={error?.message}
                />
              </div>
            )}
            {isSuccess && (
              <p className="text-center text-sm font-normal text-lime-700">
                Sign-in successful
              </p>
            )}
            <div className="mt-4 text-center text-sm">
              {t("login-page.sing-up-label")}
              <Link to="/register" className="text-primary underline">
                {t("login-page.sing-up-link")}
              </Link>
            </div>
          </CardContent>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
