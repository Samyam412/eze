"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "../ui/input";
import queryString from "query-string";
import { useCallback, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { DrawerClose, DrawerFooter } from "../ui/drawer";

const FilterPrice = () => {
  const searchParams = useSearchParams();
  const path = usePathname();
  const router = useRouter();
  const search = searchParams?.get("search");

  const [min, setMin] = useState<string>("0");
  const [max, setMax] = useState<string>("0");

  useEffect(() => {
    setMin(searchParams?.get("min") ?? "0");
    setMax(searchParams?.get("max") ?? "0");
  }, [searchParams]);

  const handleFilter = useCallback(() => {
    const url = queryString.stringifyUrl(
      {
        url: `${path}/`,
        query: {
          search: search,
          min: parseInt(min ?? "0"),
          max: parseInt(max ?? "0"),
        },
      },
      {
        skipNull: true,
      },
    );
    router.push(url);
  }, [min, max, router, path, search]);

  const handleClear = useCallback(() => {
    setMin("0");
    setMax("0");
    const url = queryString.stringifyUrl(
      {
        url: `${path}/`,
        query: {},
      },
      {
        skipNull: true,
      },
    );
    router.push(url);
  }, [router, path]);

  useEffect(() => {
    handleFilter();
  }, [min, max, handleFilter]); // Trigger fetch when min or max changes

  return (
    <div>
      <div className="flex w-full flex-col items-center justify-center gap-4">
        <div className="flex flex-row items-center gap-4">
          <div className="flex flex-col gap-2">
            <h3 className="m-0 md:ml-2">Minimum Price</h3>
            <Input
              type="number"
              name="Min"
              value={min}
              maxLength={99999999}
              placeholder="Min"
              className="w-full"
              onChange={(e) => setMin(e.target.value)}
            />
          </div>
          <div className="mt-6 text-lg font-semibold">-</div>
          <div className="flex flex-col gap-2">
            <h3 className="m-0 md:ml-2">Maximum Price</h3>
            <Input
              type="number"
              name="Max"
              value={max}
              maxLength={99999999}
              placeholder="Max"
              className="w-full"
              onChange={(e) => setMax(e.target.value)}
            />
          </div>
        </div>
        <DrawerFooter className="items-center">
          <DrawerClose>
            <Button
              className=" w-[200px] bg-green-700 transition-all ease-in-out hover:bg-green-600 md:w-[300px]"
              onClick={handleFilter}
            >
              Filter
            </Button>
          </DrawerClose>
          <DrawerClose>
            <Button className=" w-[200px] md:w-[300px]" onClick={handleClear}>
              Clear
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </div>
    </div>
  );
};

export default FilterPrice;
