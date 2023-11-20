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
  quantity: number;
}

const AddToCart = ({
  name,
  description,
  price,
  currency,
  image,
  quantity = 1,
}: ProductCart) => {
  const { addItem, handleCartClick, totalPrice } = useShoppingCart();

  const product = {
    name: name,
    description: description,
    price: price,
    currency: currency,
    image: urlFor(image).url(),
    id: "adsadas",
    quantity: quantity,
  };

  const displayTotalPrice = totalPrice ?? 0;

  return (
    <button
      className="button w-96"
      onClick={() => {
        addItem(product), handleCartClick();
      }}
    >
      <span className="text-sm tracking-widest uppercase">add to cart</span>
    </button>
  );
};

export default AddToCart;
