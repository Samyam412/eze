"use client";
import { Card, CardContent } from "~/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { type Product } from "types/globals";
import noImg from "~/../public/placeholder.png";

import { ImageSplitFirst } from "~/lib/images";

interface AllProductsProps {
  products: Product[];
}

const AllProducts: React.FC<AllProductsProps> = ({ products }) => {
  const router = useRouter();

  const handleProdClick = ({ product }: { product: string }) => {
    router.push(`/product/${product}`);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="m-3 text-center text-2xl font-semibold md:m-5 md:text-4xl">
        Our Products
      </h1>
      <section className="flex-1 justify-center">
        <div className="grid grid-cols-10 gap-3">
          {products.map((product) => (
            <Card
              key={product?.id}
              className="col-span-5 h-full max-w-[500px] rounded-lg border border-gray-200 px-0 py-2 shadow-sm md:col-span-2"
            >
              <CardContent
                onClick={() => handleProdClick({ product: product.id })}
                className="w-full cursor-pointer space-y-3 p-4 pt-2"
              >
                <Image
                  src={ImageSplitFirst(product?.images) ?? noImg}
                  width={400}
                  height={400}
                  alt={`Product image of ${product?.name}`}
                  className="group aspect-square rounded-md object-cover"
                />
                <h2 className="line-clamp-2 h-12 text-base font-medium">
                  {product?.name}
                </h2>
                <div className="gap-1">
                  <div className="flex flex-col justify-between gap-1 md:gap-4 lg:flex-row lg:items-center">
                    <p className="text-sm font-semibold text-orange-600 md:text-xl">
                      Rs{product?.price}
                    </p>
                    <p className={`font-mono text-xs text-slate-600`}>
                      {product && product?.stock === 0
                        ? "Out of stock"
                        : `${product?.stock} in stock`}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AllProducts;
