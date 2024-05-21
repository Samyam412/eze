import { getProductById } from "~/server/data/product";
import OfferCard from "./offer-card";

const FeaturedProducts = async () => {
  const product = await Promise.all([
    getProductById("fbfcab90-ddf4-40d9-b39f-0574f9a8e659"),
    getProductById("91b6b5c9-4c0e-487e-9072-c8bacd60b755"),
    getProductById("de642332-a429-48e9-bd00-2d1dae7ea103"),
    getProductById("a5469bed-476f-4e02-a974-adde35b885a0"),
  ]);
  return (
    <>
      <h1 className="ml-2 mt-8 text-3xl font-semibold text-slate-800 md:ml-4">
        Value For Money
      </h1>
      <div className="m-2 mt-3 grid grid-cols-2 gap-2 sm:m-4 sm:mt-8 md:grid-cols-4 ">
        <OfferCard product={product[0]} />
        <OfferCard product={product[1]} />
        <OfferCard product={product[2]} />
        <OfferCard product={product[3]} />
      </div>
    </>
  );
};

export default FeaturedProducts;
