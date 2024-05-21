"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export const SearchUsers = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-4 bg-orange-500">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.currentTarget;
          const formData = new FormData(form);
          const queryTerm = formData.get("search") as string;
          router.push(pathname + "?search=" + queryTerm);
        }}
      >
        <label htmlFor="search">Search for Users</label>
        <Input id="search" name="search" type="text" />
        <Button type="submit" variant="outline">
          Submit
        </Button>
      </form>
    </div>
  );
};
