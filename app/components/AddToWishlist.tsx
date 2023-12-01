"use client";

import "../globals.css";
import React from "react";
import { useToast } from "@/components/ui/use-toast";
import { urlFor } from "../lib/client";
import { useSession } from "next-auth/react";

export interface WishlistProduct {
  quantity: number;
  name: string;
  slug: string;
  image: any;
  description: string;
  price: number;
}

const AddToWishlist = ({
  name,
  slug,
  image,
  description,
  price,
  quantity,
}: WishlistProduct) => {
  const { data: session } = useSession();
  const { toast } = useToast();
  const isAuthenticated = !!session;

  const handleAddToWishlist = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "You must be logged in to add items to your wishlist.",
        variant: "default",
        className: "bg-zinc-800 text-zinc-100",
      });
      return;
    }

    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

    const imageUrl = urlFor(image).url();

    const itemExists = wishlist.some(
      (item: WishlistProduct) => item.slug === slug
    );

    if (!itemExists) {
      wishlist.push({
        name,
        slug,
        image: imageUrl,
        description,
        price,
        quantity,
      });
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      toast({
        title: `${name}`,
        description: `added to your wishlist`,
        variant: "default",
        className: "bg-zinc-800 text-zinc-100",
      });
    } else {
      toast({
        title: `${name}`,
        description: `Is already in your wishlist`,
        variant: "default",
        className: "bg-zinc-800 text-zinc-100",
      });
    }

    // Dispatch a custom event after updating the wishlist
    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  return (
    <button className="button w-96" onClick={handleAddToWishlist}>
      <span className="text-sm tracking-widest uppercase">Add to Wishlist</span>
    </button>
  );
};

export default AddToWishlist;
