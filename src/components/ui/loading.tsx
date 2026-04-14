import { Spinner } from "@/components/ui/8bit/spinner";

type LoadingProps = {
  message?: string;
};

export const Loading = ({ message = "" }: LoadingProps) => {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="flex flex-col items-center gap-2">
        <Spinner variant="diamond" />
        {message && <p className="text-sm text-muted-foreground">{message}</p>}
      </div>
    </div>
  );
};
