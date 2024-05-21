"use client";
import Image from "next/image";
import emptyCart from "~/../public/dog.png";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { FaTrash } from "react-icons/fa";
import { Loader2 } from "lucide-react";
import { MinusCircledIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useCart } from "~/hooks/use-cart";
import { cn } from "~/lib/utils";
import { ImageSplit } from "~/lib/images";
import noImg from "~/../public/placeholder.png";

import ExportedImage from "next-image-export-optimizer";

const CartPage = () => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const { items, removeItem, removeOneItem, addItem } = useCart();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cartTotal = items.reduce((acc, { product, quantity }) => {
    return acc + product.price * quantity;
  }, 0);

  const discount = 0;

  return (
    <div className=" ">
      <div
        className="mx-auto max-w-2xl px-4 pb-24 pt-16
    sm:px-6 lg:max-w-7xl lg:px-8"
      >
        <h1
          className="text-3xl font-bold tracking-tight 
    text-gray-900 sm:text-4xl
    "
        >
          Shopping Cart
        </h1>

        <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16 ">
          <div
            className={cn("lg:col-span-7", {
              "rounded-lg border-2 border-dashed bg-zinc-200 p-12":
                isMounted && items.length === 0,
            })}
          >
            <h2 className="sr-only">Items in your shopping cart</h2>
            {isMounted && items.length === 0 ? (
              <div
                className="flex  h-full flex-col
            items-center justify-center space-y-1"
              >
                <div
                  aria-hidden="true"
                  className="relative mb-4 size-40 text-muted"
                >
                  <ExportedImage
                    src={emptyCart}
                    alt="empty-cart"
                    fill
                    loading="eager"
                  />
                </div>
                <h3 className="text-2xl font-semibold ">Your cart is empty</h3>
                <p className="text-center text-muted-foreground">
                  Whoops! Nothing to show here yet
                </p>
              </div>
            ) : null}

            <ul
              className={cn({
                "divide-y divide-gray-200 border-b border-t border-gray-200 bg-white":
                  isMounted && items.length > 0,
              })}
            >
              {isMounted &&
                items.map(({ product, quantity }) => {
                  const image = ImageSplit(product.images);
                  return (
                    <li key={product.id} className="flex py-6 sm:py-10">
                      <div className="flex-shrink-0">
                        <div className="relative size-24">
                          <Image
                            src={image[0] ?? noImg}
                            alt={product.name || "Product Image"}
                            fill
                            loading="eager"
                            className="size-full rounded-md object-cover object-center"
                          />
                        </div>
                      </div>
                      <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                        <div className="relative pr-9  sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                          <div>
                            <div className="flex justify-between">
                              <h3 className="text-sm ">
                                <Link
                                  href={`/product/${product.id}`}
                                  className="font-medium text-gray-700 hover:text-gray-800"
                                >
                                  {product.name}
                                </Link>
                              </h3>
                            </div>
                            <p className="mt-1 text-sm font-medium text-gray-900">
                              <span className="text-muted-foreground">
                                Rs {product.price} x {quantity} ={" "}
                              </span>

                              <span className="text-muted-foreground">
                                Rs {product.price * quantity}
                              </span>
                            </p>
                          </div>
                          <div className=" mt-4 flex  w-20 gap-4 sm:mt-0 sm:pr-9">
                            <div className=" absolute right-0 top-0">
                              <Button
                                aria-label="Remove item"
                                variant="ghost"
                                onClick={() => removeItem(product.id)}
                                className="flex items-center gap-1 p-0 text-xs text-destructive"
                              >
                                <FaTrash
                                  className="h-4 w-3"
                                  aria-hidden="true"
                                />
                                Remove
                              </Button>
                              <div className="flex gap-3">
                                <Button
                                  aria-label="Remove item"
                                  variant="ghost"
                                  onClick={() => addItem(product, 1)}
                                  className="flex items-center gap-1 p-0 text-xs text-slate-700"
                                >
                                  <PlusCircledIcon
                                    className="size-5"
                                    aria-hidden="true"
                                  />
                                  1
                                </Button>
                                <Button
                                  aria-label="Remove item"
                                  variant="ghost"
                                  onClick={() => removeOneItem(product)}
                                  className="flex items-center gap-1 p-0 text-xs text-slate-700"
                                >
                                  <MinusCircledIcon
                                    className="size-5"
                                    aria-hidden="true"
                                  />
                                  1
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
          <section className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6  lg:col-span-5 lg:mt-0 lg:p-8 ">
            <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
            <div className="mt-6 space-y-4">
              <div className="flex  items-center justify-between">
                <p className="text-sm text-gray-600">Subtotal</p>
                <p className="text-sm font-medium text-gray-900">
                  {isMounted ? (
                    "Rs  " + cartTotal
                  ) : (
                    <Loader2 className="size-4 animate-spin text-muted-foreground" />
                  )}
                </p>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4 ">
                <div className="flex items-center text-sm text-muted-foreground">
                  <span>Discount</span>
                </div>
                <div className="text-sm font-medium text-gray-900">
                  {isMounted ? (
                    "Rs " + discount
                  ) : (
                    <Loader2 className="size-4 animate-spin text-muted-foreground" />
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <div className="text-base font-medium text-gray-900">
                  Order Total
                </div>
                <div className="text-base font-medium text-gray-900">
                  {isMounted ? (
                    "Rs " + (cartTotal - discount)
                  ) : (
                    <Loader2 className="size-4 animate-spin text-muted-foreground" />
                  )}
                </div>
              </div>
            </div>
            <div className="mt-6">
              <Button
                disabled={items.length === 0}
                className="w-full"
                size="lg"
                onClick={() => router.push("/cart/checkout")}
              >
                {items.length === 0 ? "Cart is Empty" : "Checkout"}
              </Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
