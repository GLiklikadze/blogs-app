import { Button } from "@/components/ui/button/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthContext } from "@/context/hooks/useAuthContext";
import { logOut } from "@/supabase/auth/httpRegister";
import { fillProfileInfo, getProfileInfo } from "@/supabase/profile/profile";
import { useMutation, useQuery } from "@tanstack/react-query";
import { UserRoundPen } from "lucide-react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const { userId } = useAuthContext();

  const navigate = useNavigate();

  const { data: receivedProfileData } = useQuery({
    queryKey: ["getprofileinfo", userId],
    queryFn: () => getProfileInfo(userId as string),
    enabled: !!userId,
  });

  useEffect(() => {
    if (receivedProfileData?.data) {
      setProfilePayload((prevProfilePayload) => ({
        ...prevProfilePayload,
        full_name: receivedProfileData?.data?.full_name ?? "",
        full_name_ka: receivedProfileData?.data?.full_name_ka ?? "",
        avatar_url: receivedProfileData?.data?.avatar_url ?? "",
        phone_number: receivedProfileData?.data?.phone_number ?? "",
      }));
    }
  }, [receivedProfileData, setProfilePayload]);

  const { mutate: mutateLogout } = useMutation({
    mutationKey: ["logOut"],
    mutationFn: logOut,
    onSuccess: () => navigate("/login"),
  });
  // console.log(user);

  const { mutate: editProfileData } = useMutation({
    mutationKey: ["fill-profile-info"],
    mutationFn: fillProfileInfo,
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
    editProfileData({ ...profilePayload, id: userId as string });
  };

  const handleLogOut = () => {
    mutateLogout();
  };
  return (
    <div className="mx-auto max-w-lg flex-grow px-4 py-8">
      <Card className="px-4 py-4">
        <CardTitle className="mx-auto text-center text-2xl font-bold">
          Profile Information
        </CardTitle>
        <div className="flex justify-end">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full border-2 border-green-600"
            onClick={handleToggleEdit}
          >
            <UserRoundPen className="h-6 w-8 text-green-600" />
            <span className="sr-only">Twitter</span>
          </Button>
        </div>
        <form className="space-y-9 px-4 pb-8 pt-1" onSubmit={handleSaveInfo}>
          <div className="flex min-h-9 flex-row items-center gap-14">
            <Label htmlFor="name" className="w-24">
              Full Name
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
          <div className="flex min-h-9 flex-row items-center gap-14">
            <Label htmlFor="nameKa" className="w-24">
              Full Name Ka
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
          <div className="flex min-h-9 flex-row items-center gap-14">
            <Label htmlFor="avatarUrl" className="w-24">
              Avatar Url
            </Label>
            {!toggleEdit ? (
              <p className="max-w-60 overflow-hidden font-semibold text-green-600">
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
              Mob Phone
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
            Save Information
          </Button>
          <Button
            type="button"
            className="w-full bg-red-700 hover:bg-red-900"
            onClick={handleLogOut}
          >
            Sign out
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default ProfilePage;
