"use client";

import Link from "next/link";
import { Button, buttonVariants } from "~/components/ui/button";

const error = ({ error, reset }: { error: Error; reset: () => void }) => {
  console.log(error.cause);
  return (
    <main className="gid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-xl font-semibold text-destructive ">
          There was a problem
        </p>
        <h1 className="mt-4 text-2xl font-bold tracking-tight text-zinc-900 ">
          {error.message || "Something went wrong"}
        </h1>
        <p
          className="
        mt-6 text-base leading-7 text-zinc-700"
        >
          Please try again later or contact support if the problem persists
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button onClick={reset}>Try again</Button>
          <Link href="/" className={buttonVariants({ variant: "outline" })}>
            Go back Home
          </Link>
        </div>
      </div>
    </main>
  );
};

export default error;
