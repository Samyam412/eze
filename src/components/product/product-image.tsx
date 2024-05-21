"use client";
import Image from "next/image";
import { useCallback, useState } from "react";
import placeholder from "~/../public/placeholder.png";

interface ProductImageProps {
  name: string;
  image: string ;
}

const ProductImage: React.FC<ProductImageProps> = ({ name, image }) => {
  const images = image.split(",");
  const [main, setMain] = useState(images[0] ?? placeholder);
  const handleClick = useCallback((image: string | undefined) => {
    setMain(image ?? placeholder);
  }, []);
  const hover =
    "hover:scale-125 transition-all ease-in-out duration-300  opacity-100 hover:opacity-90";
  return (
    <div>
      <div className="flex h-full w-full flex-col gap-4">
        <div className="relative flex aspect-video h-3/5 max-h-[500px]  w-full flex-col ">
          <Image
            src={main ?? placeholder}
            alt={name}
            fill
            className="object-contain "
            loading="eager"
          />
        </div>
        <div className="flex h-2/5 max-h-[200px] items-start gap-4">
          <div className="relative flex  aspect-square w-1/4  ">
            <Image
              src={images[1] ?? placeholder}
              alt={name}
              fill
              onClick={() => handleClick(images[1] )}
              className={`cursor-pointer object-cover ${hover}`}
              priority
            />
          </div>
          <div className="relative flex  aspect-square w-1/4 ">
            <Image
              src={images[2] ?? placeholder}
              alt={name}
              fill
              onClick={() => handleClick(images[2] )}
              className={`cursor-pointer object-cover ${hover}`}
              priority
            />
          </div>
          <div className="relative flex  aspect-square w-1/4 ">
            <Image
              src={images[3] ?? placeholder}
              alt={name}
              fill
              onClick={() => handleClick(images[3] )}
              className={`cursor-pointer object-cover ${hover}`}
              priority
            />
          </div>
          <div className="relative flex  aspect-square w-1/4 ">
            <Image
              src={images[0] ?? placeholder}
              alt={name}
              fill
              onClick={() => handleClick(images[0] )}
              className={`cursor-pointer object-cover ${hover}`}
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductImage;
