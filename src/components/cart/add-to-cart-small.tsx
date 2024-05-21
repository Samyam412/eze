"use client";
import { ShoppingCartIcon } from "lucide-react";
import { toast } from "sonner";
import { type Product } from "types/globals";
import { useCart } from "~/hooks/use-cart";

const AddToCartSmall = ({ productId }: { productId: Product | undefined }) => {
  const { addItem } = useCart();
  if (!productId) {
    return null;
  }
  return (
    <ShoppingCartIcon
    
      onClick={() => {
        addItem(productId, 1);
        toast.success("Added to cart");
      }}
      className="text-slate-500 hover:scale-105 hover:text-orange-500"
      size={24}
    />
  );
};

export default AddToCartSmall;
