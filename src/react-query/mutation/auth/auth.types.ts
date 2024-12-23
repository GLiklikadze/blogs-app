import { Session, User } from "@supabase/supabase-js";

export type UserResponse = {
  user: User | null;
  session: Session | null;
};

export type LoginResult = {
  user: User;
  session: Session;
};
export type httpRegisterProps = {
  email: string;
  password: string;
};
