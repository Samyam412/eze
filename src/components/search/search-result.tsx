"use client";
import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import placeholder from "~/../public/placeholder.png";
import { useRouter, useSearchParams } from "next/navigation";
import { type CoreProducts } from "~/app/search/page";
import { ImageSplit } from "~/lib/images";

interface SearchResultProps {
  products: CoreProducts[];
}

const SearchResult: React.FC<SearchResultProps> = ({ products }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const serached = searchParams?.get("search");

  const handleProdClick = ({ product }: { product: string }) => {
    router.push(`/product/${product}`);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="m-3 self-start text-xl font-semibold text-gray-800 md:m-5 md:text-2xl">
        Search Result for {serached}...
      </h1>
      <div className="flex flex-col gap-3 md:ml-4 md:flex-row md:gap-6">
        <section className="flex-1 justify-center">
          <div className="grid grid-cols-10 gap-3">
            {products.map((product) => (
              <Card
                key={product?.id}
                className="col-span-5 h-full 
                  max-w-[500px] rounded-lg border border-gray-200 px-0 py-2
                  shadow-lg transition duration-300 ease-in-out hover:scale-105 hover:shadow-sm hover:shadow-orange-100 md:col-span-2"
              >
                <CardContent
                  onClick={() => handleProdClick({ product: product.id })}
                  className="w-full cursor-pointer space-y-3 p-4 pt-2"
                >
                  <Image
                    src={ImageSplit(product.images)[0] ?? placeholder}
                    width={400}
                    height={400}
                    alt={`Product image of ${product?.name}`}
                    className="group aspect-square rounded-md object-cover"
                    priority={true}
                  />
                  <h2 className=" line-clamp-2  text-base font-medium">
                    {product?.name}
                  </h2>
                  <div className="gap-1">
                    <div className="flex flex-col justify-between gap-1 md:gap-4 lg:flex-row lg:items-center">
                      <p className="text-sm font-semibold text-orange-600 md:text-xl">
                        Rs{product?.price}
                      </p>
                      <span className="font-mono text-xs text-slate-600">
                        {product && product?.stock === 0
                          ? "Out of stock"
                          : ` in stock`}
                      </span>
                    </div>
                  </div>
                </CardContent>

                {/* <div className="w-4/5 justify-end flex mx-auto mb-2">
                    <AddToCartButtons
                      quantity={1}
                      key={product?.id}
                      buy={false}
                      product={
                        product }
                    />
                  </div> */}
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default SearchResult;
