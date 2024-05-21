import { Button } from "../ui/button";
import Link from "next/link";
import Head from "next/head";
import { getProductById } from "~/server/data/product";
import ProductView from "./product-view";
import dog from "~/../public/error.jpeg";
import Image from "next/image";

interface ProductDisplayProps {
  productId: string;
}

const ProductDisplay: React.FC<ProductDisplayProps> = async ({ productId }) => {
  const product = await getProductById(productId).catch((error) =>
    console.error(error as string),
  );

  if (!product) {
    return (
      <>
        <div className="flex h-72 flex-col items-center justify-center gap-10 font-mono text-3xl font-semibold">
          <p>Product not found</p>
          <Button variant="default">
            <Link href="/">Go back</Link>
          </Button>
        </div>
        <div className="relative  h-96 ">
          <Image
            src={dog.src}
            fill
            unoptimized
            alt="404 Not Found"
            className="h-96 w-full object-contain"
          />
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{product?.name ?? "Product not found"}</title>
        <meta name="description" content="Checkout our product" key="desc" />
        <meta property="og:title" content="Social Title for Cool Page" />
        <meta
          property="og:description"
          content={product?.description ?? "Product not found"}
        />
      </Head>
      <ProductView product={product} />
    </>
  );
};

export default ProductDisplay;
