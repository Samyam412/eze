"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";

import Tiptap from "~/components/tiptap";
import placeholder from "~/../public/placeholder.png";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ProductSchema } from "~/server/zodSchemas";
import { type z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useState, useTransition } from "react";
import { editProduct } from "~/server/actions/product";
import { FormError } from "~/components/form/form-error";
import { FormSuccess } from "~/components/form/form-success";

import { UploadButton } from "~/utils/uploadthing";
import { type Product } from "types/globals";
import Image from "next/image";
import { ImageSplit } from "~/lib/images";

const EditProductForm = ({ product }: { product: Product }) => {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      id: product?.id,
      name: product.name,
      price: product.price,
      description: product.description ?? "",
      stock: product.stock ?? 0,
      image: product.images ?? "",
      categoryId: product.categoryId ?? "",
    },
  });
  function onSubmit(values: z.infer<typeof ProductSchema>) {
    startTransition(async () => {
      await editProduct(values.id ?? "", values)
        .then(() => {
          setSuccess("Product Edited successfully");

          form.reset();
          //reload the page to show the data
          window.location.reload();
          setError(undefined);
        })
        .catch((error: Error) => {
          setError(error.message);
          setSuccess(undefined);
        });
    });
  }

  const images = ImageSplit(product.images);
  return (
    <Sheet>
      <SheetTrigger
        className="flex  items-center gap-2 rounded
        bg-primary-foreground
        p-2 px-4 
        text-center 
        font-mono text-slate-800 transition
        duration-200 hover:text-orange-300 hover:underline"
      >
        Edit Product
      </SheetTrigger>
      <SheetContent className="sm:max-w-2xl">
        <SheetHeader>
          <SheetTitle>Edit Product</SheetTitle>
          <SheetDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit, (errors) => {
                  console.log(errors);
                })}
                className="space-y-8"
              >
                <div className="flex w-full flex-row flex-wrap items-start  gap-4 space-y-4 md:flex-nowrap">
                  <div className="w-1/3">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="flex flex-col items-start">
                          <FormLabel className="self-start">Name</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={pending}
                              placeholder="name"
                              type="text"
                            />
                          </FormControl>
                          <FormMessage>
                            {form.formState.errors.name?.message}
                          </FormMessage>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem className="flex flex-col items-start">
                          <FormLabel>Price</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={pending}
                              placeholder="price"
                              type="number"
                              onChange={(e) =>
                                field.onChange(e.target.valueAsNumber)
                              }
                            />
                          </FormControl>
                          <FormMessage>
                            {form.formState.errors.price?.message}
                          </FormMessage>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="stock"
                      render={({ field }) => (
                        <FormItem className="flex flex-col items-start">
                          <FormLabel>Stock</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={pending}
                              placeholder="stock"
                              type="number"
                              onChange={(e) =>
                                field.onChange(e.target.valueAsNumber)
                              }
                            />
                          </FormControl>
                          <FormMessage>
                            {form.formState.errors.stock?.message}
                          </FormMessage>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="image"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Image</FormLabel>
                          <FormControl>
                            <UploadButton
                              {...field}
                              endpoint="imageUploader"
                              onClientUploadComplete={(files) => {
                                const currentImageUrl = field.value || ""; // Handle initial empty state
                                const newUrls = files.map((file) => file.url);

                                // Combine existing and new URLs with comma separator
                                const updatedImageUrl =
                                  currentImageUrl.length > 0
                                    ? `${currentImageUrl},${newUrls.join(",")}`
                                    : newUrls.join(",");

                                field.onChange(updatedImageUrl);
                              }}
                              onUploadError={(error: Error) => {
                                // Do something with the error (consider logging or improved error handling)
                                console.error(`Upload Error: ${error.message}`); // Example logging
                              }}
                            />
                          </FormControl>
                          <FormMessage>
                            {form.formState.errors.image?.message}
                          </FormMessage>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex-1 md:w-1/2 ">
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem className="flex flex-col items-start">
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Tiptap
                              description={field.value}
                              onChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage>
                            {form.formState.errors.description?.message}
                          </FormMessage>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <FormError message={error} />
                <FormSuccess message={success} />
                <Button
                  disabled={pending}
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 disabled:cursor-not-allowed"
                >
                  Update
                </Button>
              </form>
            </Form>
            <div className="mt-4 grid size-full grid-cols-4 gap-3 ">
              <div className="relative col-span-1 aspect-square">
                <Image
                  src={images[0] ?? placeholder}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative col-span-1 aspect-square">
                <Image
                  src={images[1] ?? placeholder}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative col-span-1 aspect-square">
                <Image
                  src={images[2] ?? placeholder}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative col-span-1 aspect-square">
                <Image
                  src={images[3] ?? placeholder}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default EditProductForm;
