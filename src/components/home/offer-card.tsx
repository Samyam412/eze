import Image from "next/image";
import { Card, CardHeader } from "../ui/card";
import placeholder from "~/../public/placeholder.png";
import { ImageSplitFirst } from "~/lib/images";
import { formatCurrency } from "~/lib/formatter";
import Link from "next/link";
import AddToCartSmall from "../cart/add-to-cart-small";

type product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock: number | null;
  images: string | null;
  categoryId: string | null;
  category: {
    id: string;
    name: string;
  } | null;
};
type OfferCardProps = {
  product: product | undefined;
};

const OfferCard: React.FC<OfferCardProps> = ({ product }) => {
  return (
    <Card className="h-full max-h-full cursor-pointer ">
      <CardHeader className=" p-4">
        <Link
          href={`/product/${product?.id}`}
          className="relative aspect-square min-w-full self-center "
        >
          <Image
            src={ImageSplitFirst(product?.images) ?? placeholder}
            alt={product?.name ?? "Product"}
            fill
            className="rounded-lg object-cover
             sm:rounded-xl md:rounded-2xl"
          />
        </Link>
        <div className="flex flex-col gap-3 space-y-2">
          <h1 className="line-clamp-2 text-lg  leading-tight">
            {product?.name}
          </h1>
          <p className="flex grow items-center justify-between text-lg text-slate-700">
            {formatCurrency(product?.price ?? 0)}

            <AddToCartSmall productId={product} />
          </p>
        </div>
      </CardHeader>
    </Card>
  );
};

export default OfferCard;
