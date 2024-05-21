"use client";
import { type ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown, Edit } from "lucide-react";
import Image from "next/image";
import { type Order } from "types/globals";

import noImage from "~/../public/placeholder.png";

import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { formatCurrency, formatDateTime } from "~/lib/formatter";
import { ImageSplitFirst } from "~/lib/images";

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "sn",
    header: "SN",
    cell: ({ row }) => {
      return <span>{row.index + 1}</span>;
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const order = formatDateTime(row.original.createdAt);

      return <span>{order}</span>;
    },
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => {
      const order = row.original;

      return <span>{formatCurrency(order.total ?? 0)}</span>;
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
    accessorKey: "orderStatus",
    header: "Order Status",
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
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;

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
              onClick={() => navigator.clipboard.writeText(product.id)}
            >
              Copy Order ID
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Sheet>
                <SheetTrigger className="w-full rounded-md py-2 pl-2 text-left text-sm hover:bg-slate-100">
                  View Products
                </SheetTrigger>
                <SheetContent className="max-h-full overflow-y-scroll">
                  <SheetHeader>
                    <SheetTitle>Products</SheetTitle>
                    <h1 className="text-sm text-slate-500">
                      Created at -{formatDateTime(product.createdAt)}
                    </h1>
                    <article className="mt-8 ">
                      {product.orderProducts.map((orderProduct) => (
                        <Card key={orderProduct.id} className="mb-2 ">
                          <CardHeader className=" line-clamp-2 pb-3 text-xl font-semibold capitalize">
                            {orderProduct.product?.name}
                          </CardHeader>
                          <CardContent className="flex gap-4 ">
                            <div className="relative size-16">
                              <Image
                                src={
                                  ImageSplitFirst(
                                    orderProduct.product?.images,
                                  ) ?? noImage
                                }
                                alt={
                                  orderProduct.product?.name ?? "Product Image"
                                }
                                fill
                                loading="lazy"
                                className="size-full rounded-md object-cover object-center"
                              />
                            </div>
                            <div className="flex w-full flex-col justify-center gap-4">
                              <div className="flex ">
                                <div>
                                  Price -
                                  <span>
                                    {orderProduct.product?.price} *{" "}
                                    {orderProduct.quantity} items
                                  </span>
                                </div>
                              </div>
                              <div className="flex justify-between">
                                <span>Total</span>
                                <span>
                                  {formatCurrency(
                                    orderProduct.quantity *
                                      (orderProduct.product?.price ?? 0),
                                  )}
                                </span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </article>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
