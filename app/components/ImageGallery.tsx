"use client";

import React, { useState } from "react";
import { urlFor } from "../lib/client";
import Image from "next/image";

interface iAppProps {
  images: any;
}

const ImageGallery = ({ images }: iAppProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleSmallImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  return (
    <div className="grid gap-4 lg:grid-cols-5">
      <div className="flex order-last gap-4 lg:order-none lg:flex-col">
        {images.map((image: any, idx: number) => (
          <div
            key={idx}
            className={`overflow-hidden rounded-lg bg-zinc-100 ${
              selectedImageIndex === idx ? "border-2 border-zinc-900" : ""
            }`}
          >
            <Image
              src={urlFor(image).url()}
              width={200}
              height={200}
              alt="product images"
              className="object-cover object-center w-full h-full cursor-pointer"
              onClick={() => handleSmallImageClick(idx)}
            />
          </div>
        ))}
      </div>

      <div className="relative overflow-hidden rounded-lg bg-zinc-100 lg:col-span-4">
        <Image
          src={urlFor(images[selectedImageIndex]).url()}
          alt="Main image for products"
          width={500}
          height={500}
          className="object-cover object-center w-full h-full"
        />
      </div>
    </div>
  );
};

export default ImageGallery;
