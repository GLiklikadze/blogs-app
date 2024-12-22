import { Button } from "@/components/ui/button/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthContext } from "@/context/hooks/useAuthContext";
import { UserRoundPen } from "lucide-react";
import { useEffect, useState } from "react";
import { createAvatar } from "@dicebear/core";
import { avataaars } from "@dicebear/collection";
import { TabsList, Tabs, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import { Controller, useForm } from "react-hook-form";
import { ProfileFormValues } from "./ProfilePage.types";
import { useLogOut } from "@/react-query/mutation/auth/auth-mutation";
import { useEditProfile } from "@/react-query/mutation/profile/profile-mutation";
import { useProfileInfo } from "@/react-query/query/profile/profile-query";

const initialPayload = {
  full_name: "",
  full_name_ka: "",
  avatar_url: "",
  phone_number: "",
};
const ProfilePage = () => {
  const {
    control,
    handleSubmit,
    reset,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    defaultValues: initialPayload,
    mode: "onBlur",
  });
  const [toggleEdit, setToggleEdit] = useState(false);

  const { user } = useAuthContext();
  const { t } = useTranslation();

  const full_name = watch("full_name");
  const full_name_ka = watch("full_name_ka");
  const avatar_url = watch("avatar_url");
  const phone_number = watch("phone_number");

  // const { data: receivedProfileData } = useQuery({
  //   queryKey: ["getprofileinfo", user?.id],
  //   queryFn: () => getProfileInfo(user?.id as string),
  //   enabled: !!user,
  // });

  const { data: receivedProfileData } = useProfileInfo(user?.id);

  useEffect(() => {
    if (receivedProfileData) {
      reset((prev) => ({
        ...prev,
        full_name: receivedProfileData?.full_name ?? "",
        full_name_ka: receivedProfileData?.full_name_ka ?? "",
        avatar_url: receivedProfileData?.avatar_url ?? "",
        phone_number: receivedProfileData?.phone_number ?? "",
      }));
    }
  }, [receivedProfileData, reset]);

  // const { mutate: mutateLogout } = useMutation({
  //   mutationKey: ["logOut"],
  //   mutationFn: logOut,
  //   onSuccess: () => navigate("/login"),
  // });

  // const queryClient = useQueryClient();

  const { mutate: mutateLogout } = useLogOut();

  // const { mutate: editProfileData } = useMutation({
  //   mutationKey: ["fill-profile-info"],
  //   mutationFn: fillProfileInfo,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({
  //       queryKey: ["getprofilePhoto", user?.id],
  //     });
  //     refetchReceivedProfileData();
  //   },
  // });

  const { mutate: editProfileData } = useEditProfile(user?.id || "");

  const handleToggleEdit = () => {
    setToggleEdit((prevToggleEdit) => !prevToggleEdit);
    if (toggleEdit) {
      clearErrors();
    }
  };
  console.log(full_name);
  console.log(errors);
  const onSubmit = (fieldValues: ProfileFormValues) => {
    console.log(fieldValues);
    handleToggleEdit();
    editProfileData({ ...fieldValues, id: user?.id as string });
  };

  const handleLogOut = () => {
    mutateLogout();
  };

  useEffect(() => {
    const avatar = createAvatar(avataaars, {
      seed: full_name,
    });
    const avatarSrc = avatar.toDataUri();

    if (full_name) {
      reset((prev) => ({ ...prev, avatar_url: avatarSrc }));
    }
  }, [full_name, reset]);
  console.log(full_name);
  return (
    <div className="mx-auto max-w-lg flex-grow px-4 py-8">
      <Card className="px-4 py-4">
        <CardTitle className="mx-auto mb-2 text-center text-2xl font-bold">
          {t("profile-page.card-title")}
        </CardTitle>
        <div className="mb-4 flex justify-between gap-7 p-4">
          <div className="flex items-center gap-14">
            <Label className="mb-2 w-24">{t("profile-page.photo-label")}</Label>
            <div className="flex h-20 w-20 flex-col rounded-lg bg-slate-500 p-1">
              {avatar_url && (
                <img
                  src={avatar_url ?? ""}
                  className="rounded-lg"
                  alt="avatar-pic"
                />
              )}
            </div>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="shadow-s rounded-full border-2 border-green-600"
            onClick={handleToggleEdit}
            title="Edit Information"
          >
            <UserRoundPen className="h-6 w-8 text-green-600" />
          </Button>
        </div>
        <div className="space-y-9 px-4 pb-8 pt-1">
          <Tabs defaultValue="geo" className="mx-auto">
            <TabsList className="light:bg-neutral-200 border-1 mx-auto mb-8 grid h-9 max-w-64 grid-cols-2 items-center justify-center rounded-lg p-1 text-muted-foreground">
              <TabsTrigger value="geo">{t("profile-page.tab-geo")}</TabsTrigger>
              <TabsTrigger value="eng">{t("profile-page.tab-eng")}</TabsTrigger>
            </TabsList>
            <TabsContent value="geo">
              <div className="flex min-h-9 flex-row items-center gap-14">
                <Label htmlFor="nameKa" className="w-24">
                  {t("profile-page.full-name-label")}
                </Label>
                {!toggleEdit ? (
                  <p className="font-semibold text-green-600">{full_name_ka}</p>
                ) : (
                  <Controller
                    name="full_name_ka"
                    control={control}
                    rules={{
                      required: t("profile-page.full-name-ka-required-error"),
                      minLength: {
                        value: 3,
                        message: t("profile-page.full-name-ka-minLength-error"),
                      },
                      maxLength: {
                        value: 25,
                        message: t("profile-page.full-name-ka-maxLength-error"),
                      },
                    }}
                    render={({ field: { onChange, value, onBlur } }) => {
                      return (
                        <>
                          <Input
                            type="text"
                            id="nameKa"
                            className={`max-w-56 ${errors.full_name_ka && "border-red-500"}`}
                            value={value}
                            onChange={onChange}
                            onBlur={onBlur}
                          />
                        </>
                      );
                    }}
                  />
                )}
              </div>
              {errors.full_name_ka && (
                <div className="mr-10 mt-2 text-right text-red-700">
                  {errors?.full_name_ka.message}
                </div>
              )}
            </TabsContent>
            <TabsContent value="eng">
              <div className="flex min-h-9 flex-row items-center gap-14">
                <Label htmlFor="name" className="w-24">
                  {t("profile-page.full-name-label")}
                </Label>
                {!toggleEdit ? (
                  <p className="font-semibold text-green-600">{full_name}</p>
                ) : (
                  <Controller
                    name="full_name"
                    control={control}
                    rules={{
                      required: t("profile-page.full-name-en-required-error"),
                      minLength: {
                        value: 3,
                        message: t("profile-page.full-name-en-minLength-error"),
                      },
                      maxLength: {
                        value: 25,
                        message: t("profile-page.full-name-en-maxLength-error"),
                      },
                    }}
                    render={({ field: { onChange, value, onBlur } }) => {
                      return (
                        <Input
                          type="text"
                          id="name"
                          className={`max-w-56 ${errors.full_name && "border-red-500"}`}
                          value={value}
                          onChange={onChange}
                          onBlur={onBlur}
                        />
                      );
                    }}
                  />
                )}
              </div>
            </TabsContent>
            {errors.full_name && (
              <div className="mr-10 mt-2 text-right text-red-700">
                {errors?.full_name.message}
              </div>
            )}
          </Tabs>
          <div className="flex min-h-10 flex-row items-start gap-14 overflow-hidden">
            <Label htmlFor="avatarUrl" className="w-24">
              {t("profile-page.avatar-url-label")}
            </Label>
            {!toggleEdit ? (
              <p className="w-60 overflow-hidden text-ellipsis whitespace-nowrap font-semibold text-green-600">
                {avatar_url}
              </p>
            ) : (
              <div className="flex w-56 flex-col">
                <Controller
                  name="avatar_url"
                  control={control}
                  rules={{
                    required: t("profile-page.avatar-required-error"),
                  }}
                  render={({ field: { value, onChange, onBlur } }) => {
                    return (
                      <Input
                        type="url"
                        id="avatarUrl"
                        className={`max-w-56 ${errors.avatar_url && "border-red-500"}`}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                      />
                    );
                  }}
                />
                {errors.avatar_url && (
                  <div className="mt-1 max-w-56 text-right text-red-700">
                    {errors?.avatar_url.message}
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="flex min-h-9 flex-row items-start gap-14">
            <Label htmlFor="phoneNumber" className="mt-2 w-24">
              {t("profile-page.phone-number-label")}
            </Label>
            {!toggleEdit ? (
              <p className="max-w-60 overflow-hidden font-semibold text-green-600">
                {phone_number}
              </p>
            ) : (
              <div className="flex w-56 flex-col">
                <Controller
                  name="phone_number"
                  control={control}
                  rules={{
                    required: t("profile-page.phone-number-required-error"),
                    minLength: {
                      value: 6,
                      message: t("profile-page.phone-number-minLength-error"),
                    },
                    maxLength: {
                      value: 14,
                      message: t("profile-page.phone-number-maxLength-error"),
                    },
                  }}
                  render={({ field: { value, onChange, onBlur } }) => {
                    return (
                      <Input
                        type="tel"
                        id="phoneNumber"
                        className={`max-w-56 ${errors.phone_number && "border-red-500"}`}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                      />
                    );
                  }}
                />
                {errors.phone_number && (
                  <div className="mt-1 max-w-56 text-right text-red-700">
                    {errors?.phone_number.message}
                  </div>
                )}
              </div>
            )}
          </div>
          <Button
            type="submit"
            className="w-full"
            onClick={handleSubmit(onSubmit)}
            disabled={!toggleEdit}
          >
            {t("profile-page.edit-button")}
          </Button>
          <Button
            type="button"
            className="w-full bg-red-700 hover:bg-red-900"
            onClick={handleLogOut}
          >
            {t("profile-page.sign-out-button")}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ProfilePage;
