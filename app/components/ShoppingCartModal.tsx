"use client";

import "../globals.css";
import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useShoppingCart } from "use-shopping-cart";
import Image from "next/image";
import QuantitySelector from "./QuantitySelector";
import Spinner from "./LoadingSpinner";

// Define the type for loading states
type LoadingStates = {
  [key: string]: boolean;
};

const ShoppingCartModal = () => {
  const {
    cartCount,
    shouldDisplayCart,
    handleCartClick,
    cartDetails,
    removeItem,
    totalPrice,
    setItemQuantity,
  } = useShoppingCart();

  const [loadingStates, setLoadingStates] = useState<LoadingStates>({});

  const isLoading = Object.values(loadingStates).some((state) => state);

  const handleQuantityChange = (newQuantity: number, itemId: string) => {
    setLoadingStates((prevStates) => ({ ...prevStates, [itemId]: true }));

    // Replace this with your actual asynchronous operation
    setItemQuantity(itemId, newQuantity);

    setTimeout(() => {
      setLoadingStates((prevStates) => ({ ...prevStates, [itemId]: false }));
    }, 2000);
  };

  const [lastKnownTotal, setLastKnownTotal] = useState(totalPrice);

  useEffect(() => {
    // Update last known total only when loading is finished
    if (!isLoading) {
      setLastKnownTotal(totalPrice);
    }
  }, [isLoading, totalPrice]);

  if (!cartCount) {
    return (
      <Sheet open={shouldDisplayCart} onOpenChange={handleCartClick}>
        <SheetContent className="bg-zinc-200 w-full md:w-[80vw] text-zinc-900">
          <SheetHeader className="font-bold tracking-wider uppercase">
            Your Cart
          </SheetHeader>
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
      <SheetContent className="bg-zinc-100 w-full">
        <SheetHeader>
          <SheetTitle className="font-bold tracking-wider uppercase">
            Your Cart
          </SheetTitle>
        </SheetHeader>
        <div
          className={`flex flex-col justify-between h-full ${
            isLoading ? "overflow-hidden" : "overflow-auto"
          }`}
        >
          <div className="flex-1 mt-8">
            <ul className="-my-6 divide-y divide-zinc-400/40">
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
                    <div className="flex flex-col justify-between w-full">
                      <h3 className="text-base font-semibold text-zinc-900">
                        {entry.name}
                      </h3>
                      <p className="mt-1 text-sm text-zinc-500 line-clamp-3">
                        {entry.description}
                      </p>

                      <button
                        onClick={() => removeItem(entry.id)}
                        className="self-end"
                      >
                        {/* Remove from cart button */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-5 h-5 my-3 duration-300 ease-in-out cursor-pointer text-zinc-400 hover:text-zinc-800"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="flex items-center justify-between w-full my-2">
                      <QuantitySelector
                        initialQuantity={entry.quantity}
                        onQuantityChange={(newQuantity) =>
                          handleQuantityChange(newQuantity, entry.id)
                        }
                      />
                      <div>
                        {loadingStates[entry.id] ? (
                          <Spinner /> // Show spinner when loading
                        ) : (
                          <p className="text-base font-bold text-zinc-900">
                            ${entry.price * entry.quantity}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="px-4 py-6 border-t border-zinc-400/60 sm:px-6">
            <div className="flex justify-between text-base font-semibold text-zinc-900">
              <p className="tracking-wider uppercase">Total:</p>
              <p>${lastKnownTotal?.toFixed()}</p>
            </div>

            <div className="mt-6">
              <button className="tracking-wider button checkout-btn">
                Checkout
              </button>
            </div>

            <div className="flex justify-center mt-6 text-sm text-center text-zinc-500">
              <p className="flex flex-col">
                OR
                <button
                  className="mt-6 font-medium tracking-wider uppercase duration-150 ease-in-out text-zinc-900 hover:text-zinc-900/80"
                  onClick={() => handleCartClick()}
                >
                  Continue Shopping
                </button>
              </p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ShoppingCartModal;
