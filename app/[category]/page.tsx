import React from "react";
import { client } from "../lib/client";
import { simplifiedProduct } from "../interface";
import Image from "next/image";
import Link from "next/link";

async function getData(category: string) {
  const query = `*[_type == "product" && category->name == "${category}"] {
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

const CategoryPage = async ({ params }: { params: { category: string } }) => {
  const data: simplifiedProduct[] = await getData(params.category);
  return (
    <div className="h-screen bg-zinc-100 font-custom">
      <div className="max-w-2xl px-4 mx-auto sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="flex flex-col items-center justify-center">
          <h2 className="mt-6 mb-2 text-2xl font-semibold tracking-wider text-center uppercase text-zinc-900">
            Products for {params.category}
          </h2>
          <div className="grid grid-cols-1 mt-6 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {data.map((product) => (
              <div key={product._id} className="relative group">
                <div className="w-full overflow-hidden rounded-md aspect-square bg-zinc-200 group-hover:opacity-75 lg:h-80">
                  <Link href={`/product/${product.slug}`}>
                    <Image
                      src={product.imageUrl}
                      alt="Product image"
                      className="object-cover object-center w-full h-full cursor-pointer lg:w-full lg:h-full"
                      width={300}
                      height={300}
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
    </div>
  );
};

export default CategoryPage;
