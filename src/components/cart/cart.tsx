"use client";

import { FaShoppingCart } from "react-icons/fa";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import emptyCartImg from "~/../public/dog.png";
import { useCart } from "~/hooks/use-cart";
import CartItem from "./cart-item";
import { ScrollArea } from "../ui/scroll-area";

const Cart = () => {
  const { items } = useCart();

  const itemCount = items.length;

  const cartTotal = items.reduce((item, { product }) => {
    return item + product.price;
  }, 0);
  return (
    <Sheet>
      <SheetTrigger>
        <FaShoppingCart aria-hidden="true" size={20} />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Your shopping cart</SheetTitle>
          <SheetDescription>
            {itemCount > 0 ? `You have ${itemCount} items in your cart` : ""}
          </SheetDescription>
        </SheetHeader>
        <Separator className="mb-4" />
        {itemCount > 0 ? (
          <>
            <SheetDescription>Product list</SheetDescription>
            <div className="max-h-4/5 h-3/5 space-y-1.5 text-sm">
              <ScrollArea className="h-full w-full rounded-md p-4">
                {items.map(({ product, quantity }) => (
                  <CartItem
                    key={product.id}
                    product={product}
                    quantity={quantity}
                  />
                ))}
              </ScrollArea>
            </div>
            <Separator className="my-4" />
            <SheetDescription className="text-sm">
              Total: Rs {cartTotal}
            </SheetDescription>

            <SheetFooter>
              <SheetTrigger asChild>
                <Link href="/cart" className="mt-3 w-full">
                  <Button
                    type="submit"
                    className="w-full bg-sky-600 hover:bg-sky-800"
                  >
                    Go to cart
                  </Button>
                </Link>
              </SheetTrigger>
            </SheetFooter>
          </>
        ) : (
          <div className="flex  h-5/6 flex-col items-center justify-center space-y-3">
            <SheetDescription className="text-xl">
              Your cart is empty
            </SheetDescription>
            <SheetDescription className="text-base">
              तपाईं केहि किन्नु हुँदैन?
            </SheetDescription>
            <div
              aria-hidden="true"
              className="relative mb-4 h-60 w-60 text-muted-foreground"
            >
              <Image src={emptyCartImg} fill alt="Empty cart" loading="eager" />
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
