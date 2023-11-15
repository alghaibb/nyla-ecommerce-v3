"use client";

import React, { useState } from "react";
import { urlFor } from "../lib/client";
import Image from "next/image";

interface iAppProps {
  images: any;
}

const ImageGallery = ({ images }: iAppProps) => {
  const [bigImage, setBigImage] = useState(images[0]);

  const handleSmallImageClick = (image: any) => {
    setBigImage(image);
  };

  return (
    <div className="grid gap-4 lg:grid-cols-5">
      <div className="flex order-last gap-4 lg:order-none lg:flex-col">
        {images.map((image: any, idx: any) => (
          <div key={idx} className="overflow-hidden rounded-lg bg-zinc-100">
            <Image
              src={urlFor(image).url()}
              width={200}
              height={200}
              alt="product images"
              className="object-cover object-center w-full h-full cursor-pointer"
              onClick={() => handleSmallImageClick(image)}
            />
          </div>
        ))}
      </div>

      <div className="relative overflow-hidden rounded-lg bg-zinc-100 lg:col-span-4">
        <Image
          src={urlFor(bigImage).url()}
          alt="Main image for products"
          width={500}
          height={500}
          className="object-cover object-center w-full h-full"
        />

        {/* For when a sale is going on */}
        {/* <span className="absolute top-0 left-0 px-3 bg-red-500 rounded-br-lg py-1.5 text-sm uppercase tracking-widest text-zinc-100">
          Sale
        </span> */}
      </div>
    </div>
  );
};

export default ImageGallery;
