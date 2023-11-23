import React, { useEffect, useState } from "react";
import { urlFor } from "../lib/client";
import Image from "next/image";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

interface WishlistProduct {
  name: string;
  slug: string;
  image: any;
  price: number;
}

const WishlistModal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const [wishlistItems, setWishlistItems] = useState<WishlistProduct[]>([]);

  useEffect(() => {
    if (isOpen) {
      const storedWishList = localStorage.getItem("wishlist");
      if (storedWishList) {
        setWishlistItems(JSON.parse(storedWishList));
      }
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const removeItemFromWishList = (slug: string) => {
    // Filter out the item to be removed based on its slug
    const updatedWishlistItems = wishlistItems.filter(
      (item) => item.slug !== slug
    );

    // Update localstorage
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlistItems));

    // Update state
    setWishlistItems(updatedWishlistItems);

    // Dispatch a custom event after updating the wishlist
    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        {/* Modal header */}
        <div className="border-b modal-header border-zinc-400/60">
          <h2 className="modal-title">My Wishlist</h2>
          <button
            onClick={onClose}
            className="duration-300 ease-out modal-close-button hover:text-zinc-900"
            aria-label="Close"
          >
            &times;
          </button>
        </div>
        {/* Border under the header */}
        <div className="modal-header-border" />
        {/* Modal body */}
        <div className="modal-body flex flex-col items-center justify-start h-[80vh]">
          {wishlistItems.length === 0 && (
            <>
              <h3 className="text-sm font-semibold tracking-wider md:text-lg">
                Adore something? Place it on My Wishlist!
              </h3>
              <p className="px-4 mt-5 text-sm leading- tracking-wider text-zinc-500 max-w-[100%] md:max-w-[60%] lg:max-w-[60%]">
                This handy tool lets you effortlessly monitor your preferred
                items and your browsing history across any device. Skip the
                hassle of retracing your steps to find that perfect piece you
                came across. With My Wishlist, your favorites are conveniently
                gathered in a single spot for easy access.
              </p>
            </>
          )}
          {children}
          {/* Wishlist Items */}
          <ul className="wishlist-items">
            {wishlistItems.map((item, index) => (
              <li key={index} className="wishlist-item">
                <Image
                  src={urlFor(item.image).url()}
                  alt={item.name}
                  width={100}
                  height={100}
                />
                <div className="flex flex-col flex-1 ml-4">
                  <h4 className="text-base font-semibold text-zinc-900">
                    {item.name}
                  </h4>
                  <p className="font-bold text-zinc-900">${item.price}</p>
                </div>
                {/* Remove item from wishlist */}
                <button
                  onClick={() => removeItemFromWishList(item.slug)}
                  className="self-end"
                >
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
              </li>
            ))}
          </ul>

          <button
            onClick={onClose}
            className="mt-8 button"
            aria-label="Continue Shopping"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishlistModal;
