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
  price_id: string;
}

const AddToCart = ({
  name,
  description,
  price,
  currency,
  image,
  quantity,
  price_id,
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
      price_id,
      quantity,
    };

    // Check if the item is already in the cart
    if (cartDetails && cartDetails[price_id]) {
      // Update the quantity of the existing item
      setItemQuantity(
        price_id,
        cartDetails && cartDetails[price_id].quantity + quantity
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
