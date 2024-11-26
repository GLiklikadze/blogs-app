import { Button } from "@/components/ui/button/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthContext } from "@/context/hooks/useAuthContext";
import { logOut } from "@/supabase/auth/httpRegister";
import { fillProfileInfo, getProfileInfo } from "@/supabase/profile/profile";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UserRoundPen } from "lucide-react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAvatar } from "@dicebear/core";
import { avataaars } from "@dicebear/collection";
import { TabsList, Tabs, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { useTranslation } from "react-i18next";

const initialPayload = {
  full_name: "",
  full_name_ka: "",
  avatar_url: "",
  phone_number: "",
};
const ProfilePage = () => {
  const [profilePayload, setProfilePayload] = useState(initialPayload);
  const [toggleEdit, setToggleEdit] = useState(false);
  const { full_name, full_name_ka, avatar_url, phone_number } = profilePayload;
  const { user } = useAuthContext();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { data: receivedProfileData } = useQuery({
    queryKey: ["getprofileinfo", user?.id],
    queryFn: () => getProfileInfo(user?.id as string),
    enabled: !!user,
  });

  useEffect(() => {
    if (receivedProfileData) {
      setProfilePayload((prevProfilePayload) => ({
        ...prevProfilePayload,
        full_name: receivedProfileData?.full_name ?? "",
        full_name_ka: receivedProfileData?.full_name_ka ?? "",
        avatar_url: receivedProfileData?.avatar_url ?? "",
        phone_number: receivedProfileData?.phone_number ?? "",
      }));
    }
  }, [receivedProfileData, setProfilePayload]);

  const { mutate: mutateLogout } = useMutation({
    mutationKey: ["logOut"],
    mutationFn: logOut,
    onSuccess: () => navigate("/login"),
  });
  const queryClient = useQueryClient();
  const { mutate: editProfileData } = useMutation({
    mutationKey: ["fill-profile-info"],
    mutationFn: fillProfileInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getprofilePhoto", user?.id],
      });
    },
  });

  const handleToggleEdit = () => {
    setToggleEdit((prevToggleEdit) => !prevToggleEdit);
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setProfilePayload((prevProfileData) => {
      return {
        ...prevProfileData,
        [name]: value,
      };
    });
  };
  const handleSaveInfo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleToggleEdit();
    editProfileData({ ...profilePayload, id: user?.id as string });
  };

  const handleLogOut = () => {
    mutateLogout();
  };
  useEffect(() => {
    const avatar = createAvatar(avataaars, {
      seed: profilePayload?.full_name,
    });
    const avatarSrc = avatar.toDataUri();

    if (profilePayload?.full_name) {
      setProfilePayload((prev) => ({ ...prev, avatar_url: avatarSrc }));
    }
  }, [profilePayload?.full_name]);
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
              {profilePayload.avatar_url && (
                <img
                  src={profilePayload.avatar_url ?? ""}
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
        <form className="space-y-9 px-4 pb-8 pt-1" onSubmit={handleSaveInfo}>
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
                  <Input
                    type="text"
                    id="nameKa"
                    className="max-w-56"
                    value={full_name_ka}
                    name="full_name_ka"
                    onChange={handleChange}
                  />
                )}
              </div>
            </TabsContent>
            <TabsContent value="eng">
              <div className="flex min-h-9 flex-row items-center gap-14">
                <Label htmlFor="name" className="w-24">
                  {t("profile-page.full-name-label")}
                </Label>
                {!toggleEdit ? (
                  <p className="font-semibold text-green-600">{full_name}</p>
                ) : (
                  <Input
                    type="text"
                    className="max-w-56"
                    value={full_name}
                    name="full_name"
                    onChange={handleChange}
                  ></Input>
                )}
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex min-h-9 flex-row items-center gap-14 overflow-hidden">
            <Label htmlFor="avatarUrl" className="w-24">
              {t("profile-page.avatar-url-label")}
            </Label>
            {!toggleEdit ? (
              <p className="w-60 overflow-hidden text-ellipsis whitespace-nowrap font-semibold text-green-600">
                {avatar_url}
              </p>
            ) : (
              <Input
                type="url"
                id="avatarUrl"
                className="max-w-56"
                value={avatar_url}
                name="avatar_url"
                onChange={handleChange}
              />
            )}
          </div>
          <div className="flex min-h-9 flex-row items-center gap-14">
            <Label htmlFor="phoneNumber" className="w-24">
              {t("profile-page.phone-number-label")}
            </Label>
            {!toggleEdit ? (
              <p className="max-w-60 overflow-hidden font-semibold text-green-600">
                {phone_number}
              </p>
            ) : (
              <Input
                type="tel"
                id="phoneNumber"
                className="max-w-56"
                value={phone_number}
                name="phone_number"
                onChange={handleChange}
              ></Input>
            )}
          </div>

          <Button className="w-full" disabled={!toggleEdit}>
            {t("profile-page.edit-button")}
          </Button>
          <Button
            type="button"
            className="w-full bg-red-700 hover:bg-red-900"
            onClick={handleLogOut}
          >
            {t("profile-page.sign-out-button")}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default ProfilePage;
