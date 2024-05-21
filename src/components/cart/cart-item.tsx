
import Image from "next/image";
import noImg from "~/../public/placeholder.png"
import { ImageIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { FaTrash } from "react-icons/fa";
import { useCart } from "~/hooks/use-cart";
import {  type Product } from "types/globals";
import { ImageSplit } from "~/lib/images";

const CartItem = ({
  product,
  quantity,
}: {
  product: Product;
  quantity: number;
}) => {
  const { removeItem } = useCart();
  const image = ImageSplit(product.images );
  return (
    <div className="space-y-3 py-2">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="relative aspect-square h-16 w-16 min-w-fit overflow-hidden rounded">
            {typeof image !== "string" ? (
              <Image
                src={image[0] ?? noImg}
                alt={product.name}
                fill
                className="absolute object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-secondary">
                <ImageIcon
                  aria-hidden="true"
                  className="h-4 w-4 text-muted-foreground"
                />
              </div>
            )}
          </div>
          <div className="flex flex-col self-start ">
            <span className="line-clamp-1 text-xs font-medium mb-1">
              {product.name}
            </span>
            <div className=" text-xs">
              Rs {product.price}
              <span className="text-xs text-muted-foreground">
                {" "}
                x {quantity}
              </span>
            </div>

            <div className="p-0 text-xs  text-muted-foreground">
              <Button
                variant="link"
                onClick={() => removeItem(product.id)}
                className="flex items-center gap-1 text-xs text-destructive p-0"
              >
                <FaTrash className="w-3 h-4" />
                Remove
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
