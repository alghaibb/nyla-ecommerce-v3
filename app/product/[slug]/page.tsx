"use client";

import AddToCart from "@/app/components/AddToCart";
import AddToWishlist from "@/app/components/AddToWishlist";
import ImageGallery from "@/app/components/ImageGallery";
import QuantitySelector from "@/app/components/QuantitySelector";
import "../../globals.css";
import Link from "next/link";
import { fullProduct } from "@/app/interface";
import { client } from "@/app/lib/client";
import React, { useEffect, useState } from "react";

async function getData(slug: string): Promise<fullProduct> {
  const query = `*[_type == "product" && slug.current == "${slug}"][0] {
    _id,
      image,
      price,
      name,
      details,
      "slug": slug.current,
      "categoryName": category->name,
      price_id
  }`;

  const data = await client.fetch(query);
  return data;
}

interface ProductPageProps {
  params: { slug: string };
}

const ProductPage: React.FC<ProductPageProps> = ({ params }) => {
  const [data, setData] = useState<fullProduct | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    getData(params.slug).then((fetchedData) => {
      setData(fetchedData);
    });
  }, [params.slug]);

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
  };

  const getBackLinkInfo = () => {
    if (data) {
      switch (data.categoryName.toLowerCase()) {
        case "hijabs":
          return { link: "/hijabs", text: "View Our Hijabs" };
        case "abayas":
          return { link: "/abayas", text: "View Our Abayas" };
        default:
          return { link: "/collections/all", text: "Back To Collections" };
      }
    }

    return { link: "/collections/all", text: "Back To Collections" };
  };

  const backLinkInfo = getBackLinkInfo();

  if (!data) {
    return null;
  }

  return (
    <div>
      <div className="h-screen max-w-screen-xl px-4 mx-auto mt-10 md:px-8">
        {/* Back Arrow */}
        <div className="mx-2 my-4 md:hidden">
          <Link href={backLinkInfo.link}>
            <span className="inline-flex items-center cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
              >
                <path d="M6 8L2 12L6 16" />
                <path d="M2 12H22" />
              </svg>
              <p className="ml-2 text-sm font-medium tracking-wider uppercase text-zinc-900">
                {backLinkInfo.text}
              </p>
            </span>
          </Link>
        </div>

        {/* Product Images */}
        <div className="grid gap-8 md:grid-cols-2">
          <ImageGallery images={data.image} />

          <div className="md:py-8">
            <div className="mb-2 md:mb-3">
              <h2 className="text-xl font-bold tracking-wide uppercase text-zinc-800">
                {data.name}
              </h2>
            </div>

            <div className="mb-4">
              <div className="flex items-end gap-2">
                {/* Price for product */}
                <span className="text-xl font-semibold tracking-wider text-zinc-800">
                  ${data.price}
                </span>
              </div>
            </div>

            {/* All Buttons Container */}
            <div className="flex flex-col gap-4 py-4 md:py-0">
              {/* Quantity Selector */}
              <QuantitySelector
                initialQuantity={quantity}
                onQuantityChange={handleQuantityChange}
              />

              {/* Add to Cart & Add to Wishlist Button Container */}
              <div className="flex flex-col gap-4 mt-8 md:mt-0">
                {/* Add to Cart Button */}
                <AddToCart
                  price_id={data.price_id}
                  currency="AUD"
                  description={data.details}
                  image={data.image[0]}
                  name={data.name}
                  price={data.price}
                  key={data._id}
                  quantity={quantity}
                />

                {/* Add to Wishlist Button */}
                <AddToWishlist
                  name={data.name}
                  description={data.details}
                  image={data.image[0]}
                  price={data.price}
                  key={data._id}
                  slug={data.slug}
                  quantity={data.quantity}
                />
              </div>

              <p className="px-4 py-4 mt-6 text-base tracking-wide text-zinc-900 md:py-0 md:px-0">
                {data.details}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
