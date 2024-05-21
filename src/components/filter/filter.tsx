"use client";
import FilterPrice from "./filter-price";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { ChevronDown } from "lucide-react";
const Filter = () => {
  return (
    <div className="mt-8 flex  gap-4">
      <Drawer direction="top" dismissible={true}>
        <DrawerTrigger className=" flex  items-center text-base font-semibold md:text-lg">
          Price
          <span>
            <ChevronDown className={`h-4 w-4 text-slate-500 `} />
          </span>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="text-center">
              What prices you are looking for?
            </DrawerTitle>
            <DrawerDescription className="mt-6">
              <FilterPrice />
            </DrawerDescription>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Filter;
