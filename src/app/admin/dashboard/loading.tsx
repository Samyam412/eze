import { Separator } from "~/components/ui/separator";
import { Skeleton } from "~/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="mt-6 size-full">
      <div>
        <Skeleton className="h-16 w-96" />
        <div className="mt-5 flex justify-between">
          <Skeleton className="h-10 w-44" />
          <Skeleton className="h-10 w-44" />
        </div>
        <div className="mt-4 size-full rounded-md border-2 border-slate-100">
          <div className=" flex justify-evenly gap-3 py-5">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>
          <Separator />
          <div className=" flex h-80 flex-col gap-8 p-5">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
