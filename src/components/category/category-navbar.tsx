import { getAllCategories } from "~/server/data/product";
import NavbarContent from "./navbar-content";
const CagtegoryNavbar = async () => {
  const categories = await getAllCategories();
  if ("message" in categories) {
    console.error(categories.message);
    return null;
  }

  return (
    <div className="sticky top-8 z-40 w-full bg-white/30 pl-2 backdrop-blur-md">
      <NavbarContent categories={categories} />
    </div>
  );
};

export default CagtegoryNavbar;
