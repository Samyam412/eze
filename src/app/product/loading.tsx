import Container from "~/components/container";
import { Skeleton } from "~/components/ui/skeleton";

export default function Loading() {
  return (
    <Container>
      <Skeleton className="mb-8 h-16 w-full" />
      <Skeleton className="mb-16 h-12 w-full" />
      <div className="grid grid-cols-10 gap-3">
        {new Array(5).fill(0).map((_, i) => (
          <div
            key={i}
            className="col-span-5 h-full max-w-[500px] rounded-lg border border-gray-200 px-0 py-2 shadow-lg md:col-span-2"
          >
            <div className="w-full space-y-3 p-4 pt-2 ">
              <Skeleton className=" aspect-square rounded-md  " />
              <Skeleton className=" h-8" />

              <div className="gap-1">
                <Skeleton className="h-5 w-full " />
                <Skeleton className="h-5 w-full " />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
