import { getProductById } from "~/server/data/product";
import OfferCard from "./offer-card";

const HomeItems = async () => {
  const product = await Promise.all([
    getProductById("fa7fad19-2ed7-41bd-aa9e-150010d1b531"),
    getProductById("69b395a1-8a1d-4b1d-95fe-d8f9c1e43125"),
  ]);
  return (
    <div
      className=" relative left-1/2 mt-6 flex h-full  w-svw -translate-x-1/2 
      flex-col items-center justify-center gap-8 bg-orange-400 
      p-6 sm:mt-8 sm:p-8 md:mt-12 md:flex-row md:gap-16 md:p-12 "
    >
      <h1 className=" w-1/2 text-left text-2xl font-medium text-white md:text-4xl  ">
        Some of our best selling <br /> products
      </h1>
      <div className="flex w-1/2 gap-12 *:w-1/2">
        <OfferCard product={product[0]} />
        <OfferCard product={product[1]} />
      </div>
    </div>
  );
};

export default HomeItems;
