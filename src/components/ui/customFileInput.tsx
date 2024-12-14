import * as React from "react";
import { Button } from "./button/button";
import { Upload } from "lucide-react";
import { t } from "i18next";

const CustomFileInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, type, ...props }, ref) => {
  let file = null;
  if (ref && "current" in ref && ref.current) {
    file = ref.current.files?.[0] || null;
  }

  const handleClick = () => {
    if (ref && "current" in ref && ref.current) {
      ref.current.click();
    }
  };

  return (
    <div className="flex max-h-11 w-full rounded-sm border">
      <div
        onClick={handleClick}
        className="focus-within:border-blue flex flex-grow cursor-pointer items-center gap-2 rounded-l-md bg-transparent pr-3 text-sm focus-within:border focus-within:ring-2 hover:border-gray-400"
      >
        <Button className="h-full min-w-32">
          <Upload /> {t("file-input.upload-button")}
        </Button>
        <input
          type={type}
          className={`sr-only ${className}`}
          ref={ref}
          {...props}
        />
        <div className="w-full truncate text-center text-gray-500">
          {file ? file?.name : t("file-input.upload-placeholder")}
        </div>
      </div>
    </div>
  );
});
CustomFileInput.displayName = "CustomFileInput";

export { CustomFileInput };
