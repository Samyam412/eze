"use client";
import { Button, buttonVariants } from "~/components/ui/button";
import { useCart } from "~/hooks/use-cart";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { type Product } from "types/globals";
import Link from "next/link";
import { cn } from "~/lib/utils";

const AddToCartButtons = ({
  product,
  buy,
  quantity,
}: {
  product: Product;
  buy: boolean;
  quantity: number;
}) => {
  const { addItem } = useCart();

  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSuccess(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [isSuccess]);

  return (
    <div className="flex h-12 w-full gap-4 ">
      <Button
        onClick={() => {
          addItem(product, quantity);
          setIsSuccess(true);
          toast.success("Added to cart");
        }}
        className="h-full w-full bg-orange-500 transition 
        duration-300 ease-in-out hover:bg-orange-600 
        sm:text-lg"
        variant="default"
      >
        {isSuccess ? "Added to cart" : "Add to cart"}
      </Button>
      {buy && (
        <Link
          onClick={() => {
            addItem(product, quantity);
            setIsSuccess(true);

            toast.success("Proceding to checkout");
            
          }}
          href="/cart/checkout"
          className={cn(
            buttonVariants({ variant: "default" }),
            "h-full w-full sm:text-lg",
          )}
        >
          Buy now
        </Link>
      )}
    </div>
  );
};

export default AddToCartButtons;
