import { z } from "zod";
import { PaymentMethod } from "../db/schema";
export const categorySchema = z.object({
  name: z.string().min(3, {
    message: "Category name must be at least 3 characters long",
  }),
});

export const ProductSchema = z.object({
  id: z.optional(z.string()),
  name: z.string(),
  description: z.string(),
  price: z
    .number({
      required_error: "Price is required",
      invalid_type_error: "Price is not a number",
    })
    .positive({
      message: "Price must be a greater than 0",
    }),
  stock: z
    .number({
      required_error: "Number is required",
      invalid_type_error: "Stock is required",
    })
    .nonnegative(),
  image: z.string({
    required_error: "Image is required",
  }),
  categoryId: z.string(),
});

export const OrderSchema = z.object({
  userId : z.string(),
  products: z.array(
    z.object({
      productId: z.string().uuid(),
      quantity: z.number().positive(),
    }),
  ),
  address: z.string({
    required_error: "Address is required",
  }),
  number: z
    .number({
      required_error: "Number is required",
      invalid_type_error: "Phone Number is required",
    })
    .min(9000000000, {
      message: "Enter a valid number",
    })
    .max(9999999999, {
      message: "Enter a valid number",
    }),
  paymentMethod: z.enum(PaymentMethod.enumValues),
  status: z.string(),
  total: z.number().optional(),
  details: z.string(),
});
