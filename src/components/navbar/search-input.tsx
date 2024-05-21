"use client";
import { IoSearchOutline } from "react-icons/io5";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { Button } from "../ui/button";
import { useRef, useState, useTransition } from "react";
import { Input } from "../ui/input";
import { useRouter, useSearchParams } from "next/navigation";

const SearchInput = () => {
  const searchParams = useSearchParams();
  const deafultSearch = searchParams?.get("search") ?? "";
  const inputRef = useRef<HTMLInputElement>(null);
  const [isSearching, startTransition] = useTransition();
  const router = useRouter();
  const [search, setSearch] = useState<string>(deafultSearch);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const handleSearch = () => {
    startTransition(() => {
      router.push(`/search?search=${search}`);
      setIsDrawerOpen(false); // Close the Drawer after search
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      inputRef?.current?.blur();
      setIsDrawerOpen(false); // Close the Drawer after escape
    }
    if (e.key === "Enter") {
      handleSearch();

      setIsDrawerOpen(false); // Close the Drazwer after search
    }
  };
  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  return (
    <Drawer
      direction="top"
      onOpenChange={
        (open) => !open && setIsDrawerOpen(false) // Close the Drawer after open change
      }
      onRelease={() => setIsDrawerOpen(false)}
      open={isDrawerOpen}
      onClose={() => setIsDrawerOpen(false)}
    >
      <DrawerTrigger onClick={toggleDrawer}>
        <IoSearchOutline size={20} />
      </DrawerTrigger>
      <DrawerContent className="top-0 m-0 mt-4 h-fit w-full justify-start rounded-b-lg ">
        <DrawerHeader className="flex w-full flex-col items-center justify-center">
          <DrawerTitle>What are you looking for?</DrawerTitle>
          <DrawerDescription className="flex w-full items-center justify-center">
            <Input
              ref={inputRef}
              disabled={isSearching}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-1/3"
              autoComplete="on"
              placeholder="Search for products"
            />
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="items-center">
          <DrawerClose className="w-full">
            <Button
              onClick={handleSearch}
              className=" w-1/3"
              disabled={isSearching}
            >
              Search
            </Button>
          </DrawerClose>
          <DrawerClose onClick={() => setIsDrawerOpen(false)}>
            Cancel
          </DrawerClose>
        </DrawerFooter>
        <div className="m-4 mx-auto h-2 w-[100px] rounded-full bg-black/70 " />
      </DrawerContent>
    </Drawer>
  );
};

export default SearchInput;
