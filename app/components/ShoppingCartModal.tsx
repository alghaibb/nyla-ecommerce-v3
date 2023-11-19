"use client";

import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useShoppingCart } from "use-shopping-cart";
import Image from "next/image";
import QuantitySelector from "./QuantitySelector";

const ShoppingCartModal = () => {
  const {
    cartCount,
    shouldDisplayCart,
    handleCartClick,
    cartDetails,
    removeItem,
  } = useShoppingCart();
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
    // Additional logic if needed, such as updating a shopping cart state
  };

  if (!cartCount) {
    return (
      <Sheet open={shouldDisplayCart} onOpenChange={handleCartClick}>
        <SheetContent className="bg-zinc-200 sm:max-w-lg w-full md:w-[90vw] text-zinc-900">
          <SheetHeader></SheetHeader>
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-lg font-bold text-center uppercase">
              Your cart is empty
            </h1>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet open={shouldDisplayCart} onOpenChange={() => handleCartClick()}>
      <SheetContent className="bg-zinc-100 sm:max-w-lg w-[90vw]">
        <SheetHeader>
          <SheetTitle className="tracking-wider uppercase">
            Your Cart
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col justify-between h-full">
          <div className="flex-1 mt-8 overflow-y-auto">
            <ul className="-my-6 divide-y divide-zinc-400">
              {Object.values(cartDetails ?? {}).map((entry) => (
                <li key={entry.id} className="flex items-start py-6">
                  <div className="flex-shrink-0 w-24 h-24 overflow-hidden">
                    <Image
                      src={entry.image as string}
                      alt="Cart product image"
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className="flex flex-col flex-1 ml-4">
                    <div className="flex items-start justify-between w-full">
                      <h3 className="text-sm font-semibold text-zinc-900">
                        {entry.name}
                      </h3>
                      <button onClick={() => removeItem(entry.id)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-5 h-5 duration-300 ease-in-out cursor-pointer text-zinc-400 hover:text-zinc-800"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="flex items-center justify-between w-full my-2">
                      <QuantitySelector
                        initialQuantity={quantity}
                        onQuantityChange={handleQuantityChange}
                      />
                      <p className="text-base font-semibold text-zinc-900">
                        ${entry.price}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ShoppingCartModal;
