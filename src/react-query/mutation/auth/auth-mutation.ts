import { login, logOut, register } from "@/supabase/auth/httpRegister";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AUTH_MUTATION_KEYS } from "./authMutationKeys.enum";

export const useLogin = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: [AUTH_MUTATION_KEYS.LOGIN],
    mutationFn: login,
    onSuccess: () => navigate("/"),
  });
};

export const useLogOut = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: [AUTH_MUTATION_KEYS.LOGOUT],
    mutationFn: logOut,
    onSuccess: () => navigate("/login"),
  });
};

export const useRegister = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: [AUTH_MUTATION_KEYS.REGISTER],
    mutationFn: register,
    onSuccess: () => navigate("/login"),
  });
};
