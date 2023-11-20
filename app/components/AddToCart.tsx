"use client";

import "../globals.css";
import { useShoppingCart } from "use-shopping-cart";
import { urlFor } from "../lib/client";

export interface ProductCart {
  name: string;
  description: string;
  price: number;
  currency: string;
  image: any;
  quantity: number;
  slug: string;
}

const AddToCart = ({
  name,
  description,
  price,
  currency,
  image,
  quantity,
  slug,
}: ProductCart) => {
  const { addItem, handleCartClick, cartDetails, setItemQuantity } =
    useShoppingCart();

  const handleAddToCart = () => {
    const product = {
      name,
      description,
      price,
      currency,
      image: urlFor(image).url(),
      id: slug,
      quantity,
    };

    // Check if the item is already in the cart
    if (cartDetails && cartDetails[slug]) {
      // Update the quantity of the existing item
      setItemQuantity(
        slug,
        cartDetails && cartDetails[slug].quantity + quantity
      );
    } else {
      // Add the new item to the cart
      addItem(product);
    }

    handleCartClick();
  };

  return (
    <button className="button w-96" onClick={handleAddToCart}>
      <span className="text-sm tracking-widest uppercase">add to cart</span>
    </button>
  );
};

export default AddToCart;
