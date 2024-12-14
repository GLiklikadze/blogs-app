import { writeBlogFormValues } from "@/supabase/write/write";
import { MutableRefObject } from "react";
import { Control, FieldErrors, UseFormHandleSubmit } from "react-hook-form";

export type BlogCreateFormProps = {
  control: Control<writeBlogFormValues>;
  handleSubmit: UseFormHandleSubmit<writeBlogFormValues, undefined>;
  onSubmit: (formValues: writeBlogFormValues) => void;
  createdSuccess: boolean;
  BlogCreateError: Error | null;
  isBlogCreateError: boolean;
  isDirty: boolean;
  errors: FieldErrors<writeBlogFormValues>;
  fileInputRef: MutableRefObject<HTMLInputElement | null>;
};
