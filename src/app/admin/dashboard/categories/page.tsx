import { getAllCategories } from "~/server/data/product";
import { DataTable } from "./data-table";
import { columns } from "./columns";

const CategoriesPage = async () => {
  const categories = await getAllCategories();
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={categories} />
    </div>
  );
};

export default CategoriesPage;
