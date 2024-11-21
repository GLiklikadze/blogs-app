import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button/button";
import { ChangeEvent, FormEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { register } from "@/supabase/auth/httpRegister";
import { AlertDestructive } from "@/components/error/errorAlert";

const initialRegisterObj = {
  // full_name: "",
  email: "",
  password: "",
};
const RegisterPage = () => {
  const [registerData, setRegisterData] = useState(initialRegisterObj);
  const navigate = useNavigate();

  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationKey: ["register"],
    mutationFn: register,
    onSuccess: () => navigate("/login"),
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData((prevRegisterData) => {
      return {
        ...prevRegisterData,
        [name]: value,
      };
    });
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRegisterData(initialRegisterObj);
    mutate(registerData);
  };

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
          <form onSubmit={handleSubmit}>
            <CardContent>
              <div className="grid gap-4">
                {/* <div className="grid gap-2">
                  <Label htmlFor="name">
                    {" "}
                    {t("register-page.register-name-label")}
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    name="full_name"
                    value={registerData.full_name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                  />
                </div> */}

                <div className="grid gap-2">
                  <Label htmlFor="email">
                    {" "}
                    {t("register-page.register-email-label")}
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={registerData.email}
                    onChange={handleChange}
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
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    value={registerData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="confirmPassword">
                    {" "}
                    {t("register-page.register-confirm-password-label")}
                  </Label>
                </div>
                <Input id="confirmPassword" type="password" required />
              </div> */}
                <Button type="submit" className="w-full">
                  {isPending
                    ? "submiting.."
                    : t("register-page.sign-up-button")}
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
                  Sign-up successful
                </p>
              )}
              <div className="mt-4 text-center text-sm">
                {t("register-page.sign-up-message")}
                <Link to="/login" className="text-primary underline">
                  {t("register-page.log-in-link")}
                </Link>
              </div>
            </CardContent>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
