"use client";

import { type ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown, Edit, PencilIcon } from "lucide-react";
import { type Order } from "types/globals";

import { Button } from "~/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "~/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import OrderDetailsDrawer from "./_components/order-details-drawer";

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "sn",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          SN
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <span>{row.index + 1}</span>;
    },
  },
  {
    accessorKey: "userDetail",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          User
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: async ({ row }) => {
      const order = row.original;
      return <span>{order.userDetail?.fullName}</span>;
    },
  },
  {
    accessorKey: "number",
    header: "Number",
    cell: ({ row }) => {
      const order = row.original;
      return <span>{order.number}</span>;
    },
  },
  {
    accessorKey: "paymentMethod",
    header: "Payment",
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => {
      const order = row.original;

      return <span>{order.address}</span>;
    },
  },
  {
    accessorKey: "orderProducts",
    header: "Products",
    cell: ({ row }) => {
      const order = row.original;

      return (
        <span className="flex flex-col gap-1">
          {order.orderProducts.length} products
        </span>
      );
    },
  },
  {
    accessorKey: "orderStatus",
    header: "Order Status",
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const customer = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <Edit className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(customer.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Drawer direction="right">
                <DrawerTrigger
                  className="flex w-full items-center
                justify-center gap-2 rounded
                py-2 text-center text-sm transition 
                duration-200 hover:bg-gray-100 hover:text-orange-400"
                >
                  <span>
                    <PencilIcon className="size-4" />
                  </span>
                  Edit Details
                </DrawerTrigger>

                <DrawerContent className="right-0 top-0 h-screen w-full bg-white/90 backdrop-blur md:w-[800px]">
                  <OrderDetailsDrawer orders={customer} />
                </DrawerContent>
              </Drawer>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
