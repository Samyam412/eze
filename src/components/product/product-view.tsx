"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { useState } from "react";
import { type Product } from "types/globals";
import ProductImage from "./product-image";
import { Star } from "lucide-react";
import { Separator } from "../ui/separator";
import Quantity from "../quantity";
import AddToCartButtons from "../cart/add-to-cart";
import QrCode from "./get-qr-code";

const ProductView = ({
  product,
}: //   reviews,
{
  product: Product;
  //   reviews: Review;
}) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
  };
  return (
    <div className="flex flex-col gap-8 md:flex-row">
      <div className="w-full md:w-1/2 lg:h-screen ">
        <ProductImage
          name={product?.name ?? ""}
          image={product?.images ?? ""}
        />
      </div>
      <Card className="w-full  border-none shadow-none md:w-1/2">
        <div className="">
          <CardHeader className="p-0">
            <CardTitle className="text-lg sm:text-2xl">
              {product?.name}
            </CardTitle>
            <CardDescription className="flex">
              <Star size={24} className=" text-amber-400" fill="gold" />
              <Star size={24} className=" text-amber-400" fill="gold" />
              <Star size={24} className=" text-amber-400" fill="gold" />
              <Star size={24} className=" text-amber-400" fill="gold" />
              <Star size={24} className=" text-amber-400" fill="gold" />
            </CardDescription>
            <CardDescription className="relative w-full text-lg ">
              Rs {product?.price}
              <span
                className={`
            absolute right-0
            ${product?.stock === 0 ? "text-rose-500" : "text-cyan-500"}
            `}
              >
                {product?.stock === 0 ? "Out of stock" : "in stock"}
              </span>
            </CardDescription>
            <Separator />
            <CardContent className="flex w-full justify-center p-2 md:items-center md:justify-start ">
              <div className="flex flex-col justify-center  gap-6 sm:pt-6 xl:flex-row xl:justify-evenly ">
                <Quantity onQuantityChange={handleQuantityChange} />
                <div className="flex gap-4">
                  <Select required>
                    <SelectTrigger className="w-28">
                      <SelectValue placeholder="Size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select required>
                    <SelectTrigger className="w-28">
                      <SelectValue placeholder="Color" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="red">Red</SelectItem>
                      <SelectItem value="blue">Blue</SelectItem>
                      <SelectItem value="green">Green</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>

            <CardContent>
              {product && (
                <AddToCartButtons
                  buy={true}
                  product={product}
                  quantity={quantity}
                />
              )}
            </CardContent>
            <CardContent className="p-0">
              <Accordion type="multiple" defaultValue={["description"]}>
                <AccordionItem value="description">
                  <AccordionTrigger>Product Details</AccordionTrigger>
                  <AccordionContent>
                    <div
                      className=""
                      dangerouslySetInnerHTML={{
                        __html: product?.description ?? "",
                      }}
                    />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>Share</AccordionTrigger>
                  <AccordionContent>
                    <div>
                      <QrCode />
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Reviews</AccordionTrigger>

                  <AccordionContent>
                    {/* {reviews && reviews.map((review) => review?.content)}
                     */}
                    No reviews yet
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </CardHeader>
        </div>
      </Card>
    </div>
  );
};

export default ProductView;
