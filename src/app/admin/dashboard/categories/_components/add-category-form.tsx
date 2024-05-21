"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { categorySchema } from "~/server/zodSchemas";
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
import { addCategory } from "~/server/actions/product";
import { FormError } from "~/components/form/form-error";
import { FormSuccess } from "~/components/form/form-success";

const AddCategoryForm = () => {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
    },
  });
  function onSubmit(values: z.infer<typeof categorySchema>) {
    startTransition(async () => {
      await addCategory(values.name)
        .then(() => {
          form.reset();
          setSuccess("Category added successfully");
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
        Add Category
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add Category</SheetTitle>
          <SheetDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit, (errors) => {
                  console.log(errors);
                })}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder="Category Name"
                        />
                      </FormControl>
                      <FormMessage>
                        {form.formState.errors.name?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                <FormError message={error} />
                <FormSuccess message={success} />
                <Button variant="add" type="submit" disabled={pending}>
                  Add Category
                </Button>
              </form>
            </Form>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default AddCategoryForm;
