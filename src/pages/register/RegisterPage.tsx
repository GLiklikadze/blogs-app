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
import { AlertDestructive } from "@/components/error/errorAlert";
import { Controller, useForm } from "react-hook-form";
import { RegisterFormValues } from "./RegisterPage.types";
import { useRegister } from "@/react-query/mutation/auth/auth-mutation";

const initialRegisterObj = {
  // full_name: "",
  email: "",
  password: "",
};
const RegisterPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    defaultValues: initialRegisterObj,
    mode: "onBlur",
  });

  const { mutate, isPending, isError, error, isSuccess } = useRegister();

  const onSubmit = (fieldValues: RegisterFormValues) => {
    console.log(fieldValues);
    mutate(fieldValues);
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
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">
                  {" "}
                  {t("register-page.register-email-label")}
                </Label>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: "email-required-error",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "email-invalid-pattern",
                    },
                  }}
                  render={({ field: { value, onChange, onBlur } }) => {
                    return (
                      <Input
                        id="email"
                        type="email"
                        value={value}
                        className={errors.email && "border-red-500"}
                        onChange={onChange}
                        placeholder="m@example.com"
                        onBlur={onBlur}
                      />
                    );
                  }}
                />
                {errors.email && (
                  <div className="mr-10 mt-2 text-red-700">
                    {t(`register-page.${errors?.email.message}`)}
                  </div>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">
                    {" "}
                    {t("register-page.register-password-label")}
                  </Label>
                </div>
                <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: "password-required-error",
                    minLength: {
                      value: 5,
                      message: "password-minLength-error",
                    },
                    maxLength: {
                      value: 25,
                      message: "password-maxLength-error",
                    },
                  }}
                  render={({ field: { onChange, value, onBlur } }) => {
                    return (
                      <Input
                        id="password"
                        type="password"
                        className={errors.password && "border-red-500"}
                        onChange={onChange}
                        value={value}
                        onBlur={onBlur}
                      />
                    );
                  }}
                />
                {errors.password && (
                  <div className="mr-10 mt-2 text-red-700">
                    {t(`register-page.${errors?.password.message}`)}
                  </div>
                )}
              </div>
              <Button
                type="submit"
                className="w-full"
                onClick={handleSubmit(onSubmit)}
              >
                {isPending ? "submiting.." : t("register-page.sign-up-button")}
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
          =
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
