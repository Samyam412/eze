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
import { addProduct } from "~/server/actions/product";
import { FormError } from "~/components/form/form-error";
import { FormSuccess } from "~/components/form/form-success";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { type CategoryName } from "../data-table";
import { UploadButton } from "~/utils/uploadthing";

const AddProductForm = ({ category }: { category: CategoryName[] }) => {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [uploading, setUploading] = useState(true);

  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: "",
      price: 0,
      description: "",
      stock: 0,
      image: "",
      categoryId: "",
    },
  });
  function onSubmit(values: z.infer<typeof ProductSchema>) {
    startTransition(async () => {
      await addProduct({
        name: values.name,
        price: values.price,
        description: values.description,
        stock: values.stock,
        image: values.image,
        categoryId: values.categoryId,
      })
        .then(() => {
          setSuccess("Product added successfully");

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
  return (
    <Sheet>
      <SheetTrigger
        className="flex  items-center
        justify-start gap-2 rounded
        bg-green-500 p-2 px-4 
        text-center 
        font-mono text-white transition
        duration-200 hover:bg-green-300"
      >
        Add Product
      </SheetTrigger>
      <SheetContent className="sm:max-w-2xl">
        <SheetHeader>
          <SheetTitle>Add Product</SheetTitle>
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
                      name="categoryId"
                      render={({ field }) => (
                        <FormItem className="flex flex-col items-start">
                          <FormLabel>Category</FormLabel>

                          <Select
                            disabled={pending}
                            onValueChange={field.onChange}
                            defaultValue={null ?? undefined}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="select a category" />
                            </SelectTrigger>
                            <SelectContent className="relative z-50 border border-slate-700 bg-slate-50">
                              <SelectGroup>
                                <ScrollArea className=" h-[150px] w-[300px]">
                                  {category.map((category) => (
                                    <SelectItem
                                      {...field}
                                      className="capitalize"
                                      key={category.name}
                                      value={category.id}
                                    >
                                      {category.name}
                                    </SelectItem>
                                  ))}
                                </ScrollArea>
                              </SelectGroup>
                            </SelectContent>
                          </Select>

                          <FormMessage>
                            {form.formState.errors.categoryId?.message}
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
                                setUploading(false);

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
                  disabled={pending || uploading}
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 disabled:cursor-not-allowed"
                >
                  Add
                </Button>
              </form>
            </Form>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default AddProductForm;
