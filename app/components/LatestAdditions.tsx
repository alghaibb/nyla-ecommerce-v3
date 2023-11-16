import React from "react";
import { client } from "../lib/client";
import { simplifiedProduct } from "../interface";
import Link from "next/link";
import Image from "next/image";

async function getData() {
  const query = `*[_type == "product"][0...4] | order(_createdAt desc) {
    _id,
    price,
    name,
    "slug": slug.current,
    "categoryName": category->name,
    "imageUrl": image[0].asset->url
  }
  `;

  const data = await client.fetch(query);

  return data;
}

const LatestAdditions = async () => {
  const data: simplifiedProduct[] = await getData();

  return (
    <div className="bg-zinc-100 font-custom">
      <div className="max-w-2xl px-4 py-16 mx-auto sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex flex-col items-center justify-center">
          <h2 className="mb-6 text-2xl font-semibold tracking-wider text-center uppercase text-zinc-900">
            Latest Additions
          </h2>
          <div className="grid grid-cols-1 mt-6 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {data.map((product) => (
              <div key={product._id} className="relative group">
                <div className="w-full overflow-hidden rounded-md aspect-square bg-zinc-200 group-hover:opacity-75 lg:h-80">
                  <Image
                    src={product.imageUrl}
                    alt="Product image"
                    className="object-cover object-center w-full h-full lg:w-full lg:h-full"
                    width={300}
                    height={300}
                  />
                </div>

                <div className="flex justify-center mt-4">
                  <div>
                    <h3 className="text-sm tracking-widest text-center uppercase text-zinc-900">
                      <Link href={`/product/${product.slug}`}>
                        {product.name}
                      </Link>
                    </h3>
                    <p className="text-sm text-center text-zinc-500">
                      ${product.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Link href="/products/all">
            <button className="my-10 tracking-wider button">
              <span className="text-sm">View All Products</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LatestAdditions;
