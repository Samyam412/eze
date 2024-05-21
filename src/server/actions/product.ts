"use server";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { CategoryTable, ProductTable } from "../db/schema";
import type * as z from "zod";
import { Index } from "@upstash/vector";

import { ProductSchema } from "../zodSchemas";
import { vectorize } from "~/lib/vectorize";

export const addCategory = async (name: string) => {
  const category = await db.query.CategoryTable.findFirst({
    where: eq(CategoryTable.name, name),
  });
  if (category) {
    throw new Error("Category already exists");
  }
  await db.insert(CategoryTable).values({ name: name }).execute();
};

export const deleteCategory = async (id: string) => {
  await db.delete(CategoryTable).where(eq(CategoryTable.id, id)).execute();
};

//product
export const addProduct = async (values: z.infer<typeof ProductSchema>) => {
  try {
    const index = new Index();
    const validatedFields = ProductSchema.parse(values);
    if (!validatedFields) {
      return { error: "Invalid input!" };
    }

    const { name, price, description, stock, image, categoryId } =
      validatedFields;

    const [product] = await db
      .insert(ProductTable)
      .values({
        name: name,
        price: price,
        description: description,
        stock: stock,
        images: image, // Corrected property name
        categoryId: categoryId,
      })
      .returning();

    if (product) {
      await index.upsert({
        id: product.id,
        vector: await vectorize(`${product.name}: ${product.description}`),
        metadata: {
          id: product.id,
          name: product.name,
          description: product.description ?? "",
          price: product.price,
          images: product.images ?? "",
        },
      });
    }

    return { success: "Product added!" };
  } catch (error) {

    return { error: "An error occurred while adding the product." };
  }
};

export const editProduct = async (
  id: string,
  values: z.infer<typeof ProductSchema>,
) => {
  try {
    const index = new Index();
    const validatedFields = ProductSchema.parse(values);
    if (!validatedFields) {
      return { error: "Invalid input!" };
    }

    const { name, price, description, stock, image, categoryId } =
      validatedFields;

    const [product] = await db
      .update(ProductTable)
      .set({
        name: name,
        price: price,
        description: description,
        stock: stock,
        images: image, // Corrected property name
        categoryId: categoryId,
      })
      .where(eq(ProductTable.id, id))
      .returning();

    if (product) {
      await index.upsert({
        id: product.id,
        vector: await vectorize(`${product.name}: ${product.description}`),
        metadata: {
          id: product.id,
          name: product.name,
          description: product.description ?? "",
          price: product.price,
          images: product.images ?? "",
        },
      });
    }
    return { success: "Product edited!" };
  } catch (error) {

    return { error: "An error occurred while editing the product." };
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const index = new Index();
    await db.delete(ProductTable).where(eq(ProductTable.id, id));
    await index.delete(id);
    return { success: "Product deleted!" };
  } catch (error) {

    return { error: "An error occurred while deleting the product." };
  }
};
