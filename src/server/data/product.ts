import "server-only";
import { db } from "../db";

export async function getAllProducts() {
  const products = await db.query.ProductTable.findMany({
    with: {
      category: true,
    },
  });
  return products;
}

export async function getProductById(id: string) {
  const product = await db.query.ProductTable.findFirst({
    where: (model, { eq }) => eq(model.id, id),
    with: {
      category: true,
    },
  });
  return product;
}

export async function getAllCategories() {
  const categories = await db.query.CategoryTable.findMany({
    with: {
      product: true,
    },
  });
  return categories;
}

export async function getCategoryNames() {
  const categories = await db.query.CategoryTable.findMany({
    columns: {
      id: true,
      name: true,
    },
  });
  return categories;
}
