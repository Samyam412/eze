import Container from "~/components/container";
import { Skeleton } from "~/components/ui/skeleton";

export default function Loading() {
  return (
    <Container>
      <div className="flex flex-col gap-8 md:flex-row">
        <div className="w-full md:w-1/2  ">
          <div>
            <Skeleton className="h-44 w-full md:h-96" />
          </div>
          <div className="m-3 flex gap-2 md:gap-6">
            <Skeleton className="size-20 md:size-40" />
            <Skeleton className="size-20 md:size-40" />
            <Skeleton className="size-20 md:size-40" />
            <Skeleton className="size-20 md:size-40" />
          </div>
        </div>
        <div className="w-full  border-none shadow-none md:w-1/2">
          <div className="flex flex-col gap-4">
            <Skeleton className="h-8 w-full md:h-16" />
            <Skeleton className="h-12 w-3/5" />
            <div className="flex w-full items-center gap-6">
              <Skeleton className="h-12 w-1/5" />
              <Skeleton className="h-12 w-1/5" />
              <Skeleton className="h-12 w-1/5" />
            </div>
            <div className="flex w-full items-center gap-6">
              <Skeleton className="h-12 w-2/5" />
              <Skeleton className="h-12 w-2/5" />
            </div>
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        </div>
      </div>
      <Skeleton className="mt-4 h-16 w-full " />
      <Skeleton className="mt-4 h-16 w-full" />
    </Container>
  );
}
