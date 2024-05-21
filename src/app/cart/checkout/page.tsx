"use client";
import { useCart } from "~/hooks/use-cart";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type * as z from "zod";
import { useEffect, useMemo, useState, useTransition } from "react";
import Image from "next/image";
import { cn } from "~/lib/utils";
import emptyCart from "~/../public/dog.png";
import noImg from "~/../public/placeholder.png";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Separator } from "~/components/ui/separator";
import { OrderSchema } from "~/server/zodSchemas";
import { newOrder } from "~/server/actions/orders";
import { ImageSplit } from "~/lib/images";
import { FormError } from "~/components/form/form-error";
import { FormSuccess } from "~/components/form/form-success";
import { useAuth } from "@clerk/nextjs";
import { PaymentMethod } from "~/server/db/schema";

const CheckoutPage = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [pending, startTransition] = useTransition();
  const { items, clearCart } = useCart();
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const cartTotal = useMemo(() => {
    return items.reduce((acc, { product, quantity }) => {
      return acc + product.price * quantity;
    }, 0);
  }, [items]);
  const cartProducts = useMemo(() => {
    return items.map((item) => ({
      productId: item.product.id,
      quantity: item.quantity,
    }));
  }, [items]);

  const form = useForm<z.infer<typeof OrderSchema>>({
    resolver: zodResolver(OrderSchema),
    defaultValues: {
      userId: "",
      products: cartProducts,
      address: "",
      status: "Pending",
      total: cartTotal,
      number: 0,
      paymentMethod: PaymentMethod.enumValues[0],
      details: "",
    },
  });
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { userId } = useAuth();
  const onSubmit = (values: z.infer<typeof OrderSchema>) => {
    startTransition(() => {
      values.products = cartProducts;
      values.userId = userId ?? "";
      newOrder(values)
        .then(() => {
          form.reset();

          setSuccess("Order Placed successfully");
          //reload the page to show the data
          clearCart();
          setError(undefined);
        })
        .catch((error: Error) => {




          setError(error.message);
          setSuccess(undefined);
        });
    });
  };
  return (
    <>
      <div
        className="mx-auto max-w-2xl px-4 pb-24 pt-16
    sm:px-6 lg:max-w-7xl lg:px-8"
      >
        <h1
          className="text-3xl font-bold tracking-tight 
    text-gray-900 sm:text-4xl
    "
        >
          Checkout
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
                  <Image
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
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit, (errors) =>
                      console.log(errors),
                    )}
                    className="w-full space-y-3"
                  >
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={pending}
                              placeholder="Enter your Address"
                              type="text"
                            />
                          </FormControl>
                          <FormMessage>
                            {form.formState.errors.address?.message}
                          </FormMessage>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="number"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={pending}
                              placeholder="Enter your number"
                              type="number"
                              onChange={(e) =>
                                field.onChange(e.target.valueAsNumber)
                              }
                            />
                          </FormControl>
                          <FormMessage>
                            {form.formState.errors.number?.message}
                          </FormMessage>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="details"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Extra details</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={pending}
                              placeholder="Do you have any specific queries?"
                              type="text"
                            />
                          </FormControl>
                          <FormMessage>
                            {form.formState.errors.details?.message}
                          </FormMessage>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="paymentMethod"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Payment Method</FormLabel>
                          <Select
                            disabled={pending}
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a verified email to display" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value={PaymentMethod.enumValues[0]}>
                                Cash
                              </SelectItem>
                              <SelectItem value={PaymentMethod.enumValues[1]}>
                                Online
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage>
                            {form.formState.errors.paymentMethod?.message}
                          </FormMessage>
                        </FormItem>
                      )}
                    />
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Separator />
                    <Button
                      disabled={pending || cartProducts.length === 0}
                      className="w-full p-2 "
                      size="lg"
                      type="submit"
                    >
                      {pending ? "Ordering" : "Place Order"}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
