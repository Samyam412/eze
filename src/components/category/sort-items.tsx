"use client";

import { ChevronDown } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { useState, useEffect, useCallback } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const list = [
  {
    value: "hightolow",
    name: "Price high to low",
  },
  {
    value: "lowtohigh",
    name: "Price low to high",
  },
  {
    value: "asc",
    name: "Ascending",
  },
  {
    value: "des",
    name: "Descending",
  },
  {
    value: "popularity",
    name: "Popularity",
  },
];

const SortItems = () => {
  const searchParams = useSearchParams();
  const path = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    closeMobileMenu();
  }, [searchParams, path]);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleClick = useCallback(
    (value: string) => {
      const existingParams = searchParams.toString();
      const parsedParams = queryString.parse(existingParams);
      parsedParams.filter = value;
      const updatedParams = queryString.stringify(parsedParams, {
        skipNull: true,
      });
      const url = `${path}?${updatedParams}`;
      router.push(url);
    },
    [searchParams, path, router],
  );

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <h3 className="flex  items-center text-base font-semibold md:text-lg">
            Sort by
            <span>
              <ChevronDown
                className={`h-4 w-4 text-slate-500   ${
                  isMobileMenuOpen && "rotate-180"
                }  transition-all ease-in-out`}
              />
            </span>
          </h3>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-4 flex flex-col gap-2 divide-y-2 divide-dotted divide-slate-100">
          {list.map((item) => (
            <DropdownMenuItem
              key={item.value}
              onClick={() => handleClick(item.value)}
              className="mx-2 hover:text-orange-500"
            >
              {item.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SortItems;
