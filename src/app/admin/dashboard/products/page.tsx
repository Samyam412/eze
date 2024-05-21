import { getAllProducts, getCategoryNames } from "~/server/data/product";
import { DataTable } from "./data-table";
import { columns } from "./columns";

const ProductPage = async () => {
  const products = await getAllProducts();
  const categories = await getCategoryNames();
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={products} category={categories} />
    </div>
  );
};

export default ProductPage;
