"use client";

import "../globals.css";
import { useShoppingCart } from "use-shopping-cart";
import { urlFor } from "../lib/client";
import { ProductCart } from "./AddToCart";

const Checkout = ({
  name,
  description,
  price,
  currency,
  image,
  quantity,
  price_id,
}: ProductCart) => {
  const { checkoutSingleItem } = useShoppingCart();

  function buyNow(price_id: string) {
    checkoutSingleItem(price_id);
  }

  const product = {
    name,
    description,
    price,
    currency,
    image: urlFor(image).url(),
    price_id,
    quantity,
  };

  return (
    <button
      className="button w-96"
      onClick={() => {
        buyNow(product.price_id);
      }}
    >
      <span className="text-sm tracking-widest uppercase">add to cart</span>
    </button>
  );
};

export default Checkout;
