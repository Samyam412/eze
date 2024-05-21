import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { getAllOrders } from "~/server/data/order";
import { getAllCategories, getAllProducts } from "~/server/data/product";
import { getAllUsers } from "~/server/queries";

export default async function AdminDashboard() {
  const [product, orders, users] = await Promise.all([
    getAllProducts(),
    getAllOrders(),
    getAllUsers(),
    getAllCategories(),
  ]);

  const totalDeliveredOrders = orders.reduce((accumulator, order) => {
    if (order.orderStatus === "Deliverd") {
      return accumulator + 1;
    }

    return accumulator;
  }, 0);

  const totalSales = orders.reduce((accumulator, order) => {
    if (order.orderStatus === "Deliverd") {
      return (
        accumulator +
        order.orderProducts.reduce((acc, product) => {
          return acc + product.quantity * (product.product?.price ?? 1);
        }, 0)
      );
    }
    return accumulator;
  }, 0);

  return (
    <>
      <div className="grid w-full grid-cols-2 items-center justify-center gap-4 p-4 *:size-full  *:bg-secondary md:grid-cols-3">
        <Card>
          <CardHeader className="text-lg">
            <CardTitle className="flex justify-between">
              <span>Sales</span>
              <span className="font-mono text-base text-slate-600">
                orders- {totalDeliveredOrders}
              </span>
            </CardTitle>

            <CardContent className="m-0 p-0 pt-2">Rs- {totalSales}</CardContent>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="text-lg">
            <CardTitle className="flex justify-between">Customers</CardTitle>

            <CardContent className="m-0 p-0 pt-2">
              Total- {users.length}
            </CardContent>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="text-lg">
            <CardTitle className="flex justify-between">Products</CardTitle>

            <CardContent className="m-0 p-0 pt-2">
              Total Products- {product.length}
            </CardContent>
          </CardHeader>
        </Card>
      </div>
      <div className=" grid grid-cols-1 gap-3 md:grid-cols-2">
        <Card>
          <CardHeader className="space-y-6">
            <CardTitle>Total Sales</CardTitle>

            <CardContent>{/* <OrdersByDayChart data={[]} /> */}</CardContent>
          </CardHeader>
        </Card>
      </div>
    </>
  );
}
