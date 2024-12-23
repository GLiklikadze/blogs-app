import { login, logOut, register } from "@/supabase/auth/httpRegister";
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AUTH_MUTATION_KEYS } from "./authMutationKeys.enum";
import { PostgrestError } from "@supabase/supabase-js";
import { AUTH_PATHS } from "@/routes/auth/authPaths.enum";
import { httpRegisterProps, LoginResult, UserResponse } from "./auth.types";

export const useLogin = ({
  mutationOptions,
}: {
  mutationOptions?: UseMutationOptions<
    LoginResult,
    PostgrestError,
    httpRegisterProps
  >;
} = {}): UseMutationResult<LoginResult, PostgrestError, httpRegisterProps> => {
  const navigate = useNavigate();
  return useMutation<LoginResult, PostgrestError, httpRegisterProps>({
    mutationKey: [AUTH_MUTATION_KEYS.LOGIN],
    mutationFn: login,
    onSuccess: () => navigate("/"),
    ...mutationOptions,
  });
};

export const useLogOut = ({
  mutationOptions,
}: {
  mutationOptions?: UseMutationOptions<void, PostgrestError, void>;
} = {}): UseMutationResult<void, PostgrestError, void> => {
  const navigate = useNavigate();
  return useMutation<void, PostgrestError, void>({
    mutationKey: [AUTH_MUTATION_KEYS.LOGOUT],
    mutationFn: logOut,
    onSuccess: () => navigate(`/${AUTH_PATHS.AUTH}/${AUTH_PATHS.LOGIN}`),
    ...mutationOptions,
  });
};

export const useRegister = ({
  mutationOptions,
}: {
  mutationOptions?: UseMutationOptions<
    UserResponse,
    PostgrestError,
    httpRegisterProps
  >;
} = {}): UseMutationResult<UserResponse, PostgrestError, httpRegisterProps> => {
  const navigate = useNavigate();
  return useMutation<UserResponse, PostgrestError, httpRegisterProps>({
    mutationKey: [AUTH_MUTATION_KEYS.REGISTER],
    mutationFn: register,
    onSuccess: () => navigate(`/${AUTH_PATHS.AUTH}/${AUTH_PATHS.LOGIN}`),
    ...mutationOptions,
  });
};
