"use client";

import React from "react";
import { useShoppingCart } from "use-shopping-cart";
import "../globals.css";
import { urlFor } from "../lib/client";

export interface ProductCart {
  name: string;
  description: string;
  price: number;
  currency: string;
  image: any;
}

const AddToBag = ({
  name,
  description,
  price,
  currency,
  image,
}: ProductCart) => {
  const { addItem, handleCartClick } = useShoppingCart();

  const product = {
    name: name,
    description: description,
    price: price,
    currency: currency,
    image: urlFor(image).url(),
    id: "adsadas",
  };

  return (
    <button className="button w-96" onClick={() => addItem(product)}>
      <span className="text-sm tracking-widest uppercase">add to cart</span>
    </button>
  );
};

export default AddToBag;
