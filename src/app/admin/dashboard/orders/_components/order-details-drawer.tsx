"use client";
import Image from "next/image";
import { useState, useTransition } from "react";
import { type Order } from "types/globals";
import { Button } from "~/components/ui/button";
import { DrawerHeader } from "~/components/ui/drawer";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { updateOrderNotes, updateOrderStatus } from "~/server/actions/orders";
import { OrderStatus } from "~/server/db/schema";
import { toast } from "sonner";
const Placeholder = "/public/_4fd65654-2d40-4868-842d-0157fcad1059.jpeg";

const OrderDetailsDrawer = ({ orders }: { orders: Order }) => {
  const [notes, setNotes] = useState(orders.notes ?? "");
  const [status, setStatus] = useState(orders.orderStatus);
  const [pending, startTransition] = useTransition();
  const imageUrls = orders.orderProducts.map(
    (product) => product.product?.images?.split(",")[0],
  );
  const total = orders.orderProducts.reduce(
    (acc, product) => acc + (product.product?.price ?? 0) * product.quantity,
    0,
  );

  return (
    <DrawerHeader className="flex h-svh flex-col gap-4 font-mono">
      <div
        className="flex h-fit w-full justify-between rounded-lg 
      bg-gray-500 p-2 text-lg"
      >
        <div className="text-slate-50">
          Order Id- <span className="text-sm">{orders.id}</span>
        </div>
        <div className="self-end text-xl font-semibold text-orange-200">
          Payment - {orders.paymentMethod}
        </div>
      </div>

      <div
        className="flex h-fit w-full flex-col justify-between divide-x-2 rounded-lg bg-muted-foreground
       p-4 text-lg md:flex-row"
      >
        <ul className="flex flex-col text-left text-slate-200">
          <li>
            User -{" "}
            <span className="text-sm">
              {orders.userDetail?.fullName} (
              {orders.userDetail?.primaryEmailAddress})
            </span>
          </li>
          <li>
            Address - <span className="text-lg">{orders.address}</span>
          </li>
          <li>
            Number - <span className="text-lg">{orders.number}</span>
          </li>
          <li>
            Details - <span className="text-lg">{orders.details}</span>
          </li>
          <li className="mt-5 self-baseline  text-2xl font-semibold">
            Total - <span className="">Rs {total}</span>
          </li>
        </ul>

        <form
          className="ml-2 mt-2 grid h-full grid-cols-4 grid-rows-3 gap-2 rounded-md  bg-slate-200
        p-3 
          text-sm text-slate-800 md:mt-0   md:w-1/2 "
          action={() => {
            startTransition(async () => {
              await updateOrderNotes(orders.id, notes);
              await updateOrderStatus(orders.id, status);
              toast.success("Order Updated");
              window.location.reload();
            });
          }}
        >
          <div className="col-span-4 row-span-3">
            <Label>Notes</Label>
            <Textarea
              className="w-full resize-none md:h-36 "
              onChange={(e) => setNotes(e.target.value)}
              value={notes ?? ""}
            />
          </div>
          <Button
            type="submit"
            disabled={pending}
            variant="default"
            className="row-start-4  "
          >
            Save
          </Button>
          <Select
            disabled={pending}
            onValueChange={(e) =>
              setStatus(e as "Pending" | "Accepted" | "Deliverd" | "Canceled")
            }
          >
            <SelectTrigger className="row-start-4  w-[120px]">
              <SelectValue placeholder={status} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={OrderStatus.enumValues[0]}>
                {OrderStatus.enumValues[0]}
              </SelectItem>
              <SelectItem
                value={OrderStatus.enumValues[1]}
                className="text-green-600"
              >
                {OrderStatus.enumValues[1]}
              </SelectItem>
              <SelectItem
                value={OrderStatus.enumValues[2]}
                className="text-cyan-700"
              >
                {OrderStatus.enumValues[2]}
              </SelectItem>
              <SelectItem
                value={OrderStatus.enumValues[3]}
                className="text-destructive"
              >
                {OrderStatus.enumValues[3]}
              </SelectItem>
            </SelectContent>
          </Select>
        </form>
      </div>

      <div className="flex max-h-fit flex-col gap-6 overflow-y-scroll bg-slate-100 p-3 md:flex-row">
        {orders.orderProducts.map((product) => (
          <div key={product.id} className="flex gap-2  ">
            <div className="flex-shrink-0">
              <div className="relative size-20">
                <Image
                  src={imageUrls[0] ?? Placeholder}
                  alt={product.product?.name ?? "Product Image"}
                  fill
                  loading="lazy"
                  className="size-full rounded-md object-cover object-center"
                />
              </div>
            </div>
            <div className="ml-4 flex flex-1 flex-col justify-center  sm:ml-6">
              <div className="relative ">
                <div className="flex justify-between">
                  <h1 className="line-clamp-2 font-medium text-gray-700">
                    {product.product?.name}
                  </h1>
                </div>
                <p>
                  <span className="text-muted-foreground">
                    Rs {product.product?.price ?? 0} x {product.quantity} units
                    ={" "}
                  </span>
                  <span className="text-muted-foreground">
                    Rs {(product.product?.price ?? 0) * product.quantity}
                  </span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DrawerHeader>
  );
};

export default OrderDetailsDrawer;
