"use client";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import Filter from "~/components/filter/filter";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import SortItems from "./sort-items";
import { type Category } from "~/app/admin/dashboard/categories/columns";

interface NavbarContentProps {
  categories: Category[];
}

const NavbarContent: React.FC<NavbarContentProps> = ({ categories }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    closeMobileMenu();
  }, []);

  return (
    <>
      <ScrollArea className=" whitespace-nowrap shadow-sm ">
        <div className="flex flex-row items-center justify-center gap-4">
          <DropdownMenu onOpenChange={(isOpen) => setIsMobileMenuOpen(isOpen)}>
            <DropdownMenuTrigger>
              <h3 className="flex  items-center text-base font-semibold md:text-lg">
                Categories
                <span>
                  <ChevronDown
                    className={`h-4 w-4 text-slate-500   ${
                      isMobileMenuOpen && "rotate-180"
                    }  transition-all ease-in-out`}
                  />
                </span>
              </h3>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-4 flex flex-col gap-2 divide-y-2 divide-dotted divide-slate-100 hover:text-orange-500">
              {categories.map((category: Category) => (
                <DropdownMenuItem key={category.id} className="mx-2">
                  <Link
                    href={`/category/${category.name}`}
                    className="text-gray-800"
                    onClick={closeMobileMenu}
                  >
                    {category.name}
                  </Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem className="mx-2">
                <Link href="/category" className="text-gray-800">
                  All Categories
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <SortItems />
          <Filter />
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </>
  );
};

export default NavbarContent;
