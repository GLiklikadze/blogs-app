import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function AlertDestructive({ alertTitle, alertDescription }) {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{!!alertTitle && alertTitle}</AlertTitle>
      <AlertDescription>
        {!!alertDescription && alertDescription}
      </AlertDescription>
    </Alert>
  );
}
