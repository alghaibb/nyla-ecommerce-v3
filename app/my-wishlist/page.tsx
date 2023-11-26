"use client";

import "../globals.css";
import Image from "next/image";
import Link from "next/link";
import QuantitySelector from "../components/QuantitySelector";
import Spinner from "../components/LoadingSpinner";
import React, { useEffect, useState } from "react";
import { urlFor } from "../lib/client";
import { WishlistProduct } from "../components/AddToWishlist";

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch wishlist items from local storage or API
    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist) {
      const itemsWithQuantities = JSON.parse(storedWishlist).map(
        (item: { quantity: number }) => ({
          ...item,
          quantity: item.quantity || 1, // Ensure each item has a quantity property
        })
      );
      setWishlistItems(itemsWithQuantities);
    }
    setIsLoading(false);
  }, []);

  const handleQuantityChange = (slug: string, newQuantity: number) => {
    const updatedItems = wishlistItems.map((item) => {
      if (item.slug === slug) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setWishlistItems(updatedItems);
    localStorage.setItem("wishlist", JSON.stringify(updatedItems));
  };

  const removeItemFromWishlist = (slug: string) => {
    const updatedItems = wishlistItems.filter((item) => item.slug !== slug);
    setWishlistItems(updatedItems);
    localStorage.setItem("wishlist", JSON.stringify(updatedItems));
    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  const calculateTotalAmount = () => {
    return wishlistItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h3 className="text-2xl italic font-medium text-zinc-600">
          Your wishlist is empty
        </h3>
        <p className="mt-2 text-zinc-500">
          Looks like you haven&apos;t found something you like yet.
        </p>
        <Link href="/collections/all">
          <button className="mt-6 button" aria-label="Explore Our Collection">
            Explore Our Collection
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container p-4">
      <h1 className="px-3 py-3 my-6 text-3xl font-bold border-b-2 border-zinc-800">
        My Wishlist
      </h1>
      <ul>
        {wishlistItems.map((item, index) => (
          <li
            key={item.slug}
            className={`relative flex flex-col items-center justify-center grid-cols-1 px-4 py-6 border-b md:grid md:grid-cols-3 border-zinc-300 md:space-x-4 ${
              index === wishlistItems.length - 1 ? "darker-border" : ""
            }`}
          >
            <div className="flex items-center col-span-1 mobile-view">
              <Image
                src={urlFor(item.image).url()}
                alt={item.name}
                width={100}
                height={100}
                priority={true}
              />
              <div className="ml-4">
                <h4 className="py-2 text-lg font-semibold">{item.name}</h4>
                <p className="text-zinc-500">${item.price}</p>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center justify-center mt-6 bg-transparent md:mt-0 md:col-span-1">
              <QuantitySelector
                initialQuantity={item.quantity}
                onQuantityChange={(newQuantity) =>
                  handleQuantityChange(item.slug, newQuantity)
                }
              />
            </div>

            {/* Remove item button */}
            <div className="mobile-remove-btn md:space-x-2 md:justify-end md:items-center md:flex md:col-span-1 md:py-0">
              <button
                onClick={() => removeItemFromWishlist(item.slug)}
                className="relative inline-flex items-center justify-center p-0 duration-150 hover:text-zinc-900 text-zinc-500"
              >
                {/* SVG for remove button */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 6l12 12M18 6l-12 12"
                  />
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-6 text-right">
        <span className="text-xl font-bold">
          Sub-total: ${calculateTotalAmount().toFixed()}
        </span>
      </div>
    </div>
  );
};

export default WishlistPage;
