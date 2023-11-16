"use client";

import ImageGallery from "@/app/components/ImageGallery";
import { fullProduct } from "@/app/interface";
import { client } from "@/app/lib/client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

async function getData(slug: string): Promise<fullProduct> {
  const query = `*[_type == "product" && slug.current == "${slug}"][0] {
    _id,
      image,
      price,
      name,
      details,
      "slug": slug.current,
      "categoryName": category->name
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

  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrease = () => {
    setQuantity((prevQuantity) =>
      prevQuantity > 1 ? prevQuantity - 1 : prevQuantity
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity > 0) {
      setQuantity(newQuantity);
    }
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="max-w-screen-xl px-4 mx-auto mt-10 md:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <ImageGallery images={data.image} />

          <div className="md:py-8">
            <div className="mb-2 md:mb-3">
              <h2 className="text-xl font-medium tracking-wide uppercase text-zinc-800">
                {data.name}
              </h2>
            </div>

            <div className="mb-4">
              <div className="flex items-end gap-2">
                {/* Price for product */}
                <span className="text-xl font-medium tracking-wider text-zinc-500">
                  ${data.price}
                </span>
              </div>
            </div>

            {/* All Buttons Container */}
            <div className="flex flex-col gap-4">
              {/* Quantity Selector */}
              <p className="text-zinc-500">Quantity:</p>
              <div className="flex items-center justify-start mb-4">
                <div className="flex items-center px-4 py-1 border border-zinc-400/50">
                  <button
                    onClick={handleDecrease}
                    className="px-2 py-1 font-medium text-zinc-600 bg-zinc-200"
                  >
                    −
                  </button>
                  <input
                    type="text"
                    className="w-12 font-medium text-center border-none outline-none text-md text-zinc-600 focus:ring-0"
                    value={quantity}
                    onChange={handleInputChange}
                    min="1"
                  />
                  <button
                    onClick={handleIncrease}
                    className="px-2 py-1 font-medium text-zinc-600 bg-zinc-200"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart & Add to Wishlist Button Container */}
              <div className="flex flex-col gap-4 w-96">
                {/* Add to Cart & Add to Wishlist Button */}
                <button className="button">
                  <Link href="/cart">
                    <span className="text-sm tracking-widest uppercase">
                      add to cart
                    </span>
                  </Link>
                </button>

                <button className="button">
                  <Link href="/wishlist">
                    <span className="text-sm tracking-widest uppercase">
                      add to wishlist
                    </span>
                  </Link>
                </button>
              </div>

              <p className="mt-6 text-base tracking-wide text-zinc-900">
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
