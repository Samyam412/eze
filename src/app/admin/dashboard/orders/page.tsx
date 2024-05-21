import { getAllOrders } from "~/server/data/order";
import { DataTable } from "./data-table";
import { columns } from "./columns";

const OrderPage = async () => {
  const orders = await getAllOrders()

  

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={orders} />
    </div>
  );
};

export default OrderPage;
