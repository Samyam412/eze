import { DataTable } from "./data-table";
import { columns } from "./columns";
import { getAllUsers } from "~/server/queries";

const CustomerPage = async () => {
  const users = await getAllUsers();
  
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={users} />
    </div>
  );
};

export default CustomerPage;
