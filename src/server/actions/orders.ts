"use server";

import { eq } from "drizzle-orm";
import { db } from "../db";
import type * as z from "zod";
import { OrderProductTable, OrderTable } from "../db/schema";
import { OrderSchema } from "../zodSchemas";

export const newOrder = async (values: z.infer<typeof OrderSchema>) => {
  try {
    const validatedFields = OrderSchema.parse(values);
    if (!validatedFields) {
      return { error: "Invalid input!" };
    }

    const {
      userId,
      products,
      address,
      number,
      paymentMethod,
      total,
      details,
    } = validatedFields;

    const [order] = await db
      .insert(OrderTable)
      .values({
        address: address,
        number: number.toString(),
        paymentMethod: paymentMethod,
        userId: userId,
        details: details,
        total: total,
      })
      .returning();

    if (order) {
      const orderProducts = products.map((product) => ({
        orderId: order.id,
        productId: product.productId,
        quantity: product.quantity,
      }));

      await db.insert(OrderProductTable).values(orderProducts).execute();
    }
  } catch (error) {

    return { error: "An error occurred while creating the product." };
  }
};

export const updateOrderNotes = async (orderId: string, notes: string) => {
  await db
    .update(OrderTable)
    .set({ notes: notes })
    .where(eq(OrderTable.id, orderId));
};

export const updateOrderStatus = async (
  orderId: string,
  status: "Pending" | "Accepted" | "Deliverd" | "Canceled",
) => {
  await db
    .update(OrderTable)
    .set({ orderStatus: status })
    .where(eq(OrderTable.id, orderId));
};

export const deleteOrder = async (orderId: string) => {
  await db.delete(OrderTable).where(eq(OrderTable.id, orderId));
};
