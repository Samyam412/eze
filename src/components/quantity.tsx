"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { Label } from "@radix-ui/react-label";

const Quantity = ({
  onQuantityChange,
}: {
  onQuantityChange: (quantity: number) => void;
}) => {
  const [quantity, setQuantity] = useState(1);

  const increase = () => {
    if (quantity < 100) {
      setQuantity(quantity + 1);

      onQuantityChange(quantity + 1);
    }
  };
  const decrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      onQuantityChange(quantity - 1);
    }
  };

  return (
    <div className="flex items-center justify-center gap-4">
      <Label>Quantity</Label>
      <Button onClick={decrease} variant="outline">
        -
      </Button>
      <div>{quantity}</div>
      <Button onClick={increase} variant="outline">
        +
      </Button>
    </div>
  );
};

export default Quantity;
