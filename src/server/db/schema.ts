// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgTableCreator,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `toysnpark_${name}`);

export const CategoryTable = createTable("category", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 256 }).notNull(),
});

export const CategoryRelations = relations(CategoryTable, ({ many }) => ({
  product: many(ProductTable),
}));

export const ProductTable = createTable("product", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 256 }).notNull(),
  price: integer("price").notNull(),
  description: text("description"),
  stock: integer("stock").default(0),
  images: text("images"),
  categoryId: uuid("category_id").references(() => CategoryTable.id, {
    onDelete: "set null",
  }),
});
export const ProductRelations = relations(ProductTable, ({ one }) => ({
  category: one(CategoryTable, {
    fields: [ProductTable.categoryId],
    references: [CategoryTable.id],
  }),
}));

export const PaymentMethod = pgEnum("paymentMethod", ["Cash", "Online"]);
export const OrderStatus = pgEnum("orderStatus", [
  "Pending",
  "Accepted",
  "Deliverd",
  "Canceled",
]);
export const OrderTable = createTable("order", {
  id: uuid("id").primaryKey().defaultRandom(),
  address: varchar("address", { length: 255 }).notNull(),
  number: varchar("number", { length: 10 }).notNull(),
  details: varchar("details", { length: 255 }),
  paymentMethod: PaymentMethod("paymentMehtod").default("Cash").notNull(),
  orderStatus: OrderStatus("orderStatus").default("Pending").notNull(),
  userId: varchar("user_id", { length: 255 }).notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  notes: text("notes").default(""),
  total: integer("total").default(0),
});

export const OrderProductTable = createTable("orderProduct", {
  id: uuid("id").primaryKey().defaultRandom(),
  orderId: uuid("order_id").references(() => OrderTable.id, {
    onDelete: "cascade",
  }),
  productId: uuid("product_id").references(() => ProductTable.id, {
    onDelete: "cascade",
  }),

  quantity: integer("quantity").notNull(),
});

export const OrderProductRelations = relations(
  OrderProductTable,
  ({ one }) => ({
    order: one(OrderTable, {
      fields: [OrderProductTable.orderId],
      references: [OrderTable.id],
    }),
    product: one(ProductTable, {
      fields: [OrderProductTable.productId],
      references: [ProductTable.id],
    }),
  }),
);
