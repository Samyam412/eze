import { db } from "../db";
import { getUser } from "../queries";

export async function getAllOrders() {
  const orders = await db.query.OrderTable.findMany({});

  const usersWithDetails = await Promise.all(
    orders.map(async (user) => {
      const userDetail = await getUser(user.userId)
        .then((res) => res)
        .catch((err) => {
          console.error(err);
          return null;
        });

      const orderProducts = await db.query.OrderProductTable.findMany({
        where: (model, { eq }) => eq(model.orderId, user.id),
        with: {
          product: true,
        },
      });

      return {
        ...user,
        orderProducts,
        userDetail,
      };
    }),
  );

  return usersWithDetails;
}

// export async function getSalesData(
//   createdAfter: Date | null,
//   createdBefore: Date | null,
// ) {
//   const createdAtQuery: { where?: ReturnType<typeof gt> } = {};

//   if (createdAfter) {
//     createdAtQuery.where = gt(OrderTable.createdAt, createdAfter);
//   }

//   const data = await db.query.OrderTable.findMany({
//     where: createdAtQuery.where,
//   });

//   return data;
// }

export async function getUserOrders(userId: string) {
  const orders = await db.query.OrderTable.findMany({
    where: (model, { eq }) => eq(model.userId, userId),
  });

  const usersWithDetails = await Promise.all(
    orders.map(async (user) => {
      

      const orderProducts = await db.query.OrderProductTable.findMany({
        where: (model, { eq }) => eq(model.orderId, user.id),
        with: {
          product: true,
        },
      });

      return {
        ...user,
        orderProducts,
      
      };
    }),
  );

  return usersWithDetails;
}
