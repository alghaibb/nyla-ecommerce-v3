"use client";

import React from "react";
import { client } from "../../lib/client";
import { simplifiedProduct } from "../../interface";
import Image from "next/image";
import Link from "next/link";

async function getData() {
  const query = `*[_type == "product"] {
    _id,
      "imageUrl": image[0].asset->url,
      price,
      name,
      "slug": slug.current,
      "categoryName": category->name
  }`;

  const data = await client.fetch(query);

  return data;
}

const AllProductsPage = () => {
  const [data, setData] = React.useState<simplifiedProduct[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const productsData: simplifiedProduct[] = await getData();
      setData(productsData);
    };

    fetchData();
  }, []);

  return (
    <div className="bg-zinc-100 font-custom">
      <div className="max-w-2xl px-4 py-16 mx-auto sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="mb-6 text-2xl font-semibold tracking-wider text-center uppercase text-zinc-900">
          All Collections
        </h2>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {data.map((product) => (
            <div key={product._id} className="relative group">
              <div className="w-full overflow-hidden rounded-md aspect-square bg-zinc-200 group-hover:opacity-75 lg:h-80">
                <Link href={`/product/${product.slug}`}>
                  <Image
                    priority
                    src={product.imageUrl}
                    alt="Product image"
                    layout="responsive"
                    width={300}
                    height={300}
                    objectFit="cover"
                    className="object-cover object-center w-full h-full cursor-pointer"
                  />
                </Link>
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
      </div>
    </div>
  );
};

export default AllProductsPage;
