import { getUserOrders } from "~/server/data/order";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { currentUser } from "@clerk/nextjs/server";

const OrderPage = async () => {
  const user = await currentUser();
  if (!user) return null;
  const orders = await getUserOrders(user.id);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={orders} />
    </div>
  );
};

export default OrderPage;
