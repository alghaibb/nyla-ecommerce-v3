"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import "../globals.css";
import { usePathname } from "next/navigation";
import { Heart, ShoppingBagIcon, User, Instagram, Music2 } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [shouldRenderMenuItems, setShouldRenderMenuItems] = useState(false);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  const navigation = [
    { id: 1, title: "Home", href: "/" },
    { id: 2, title: "Hijabs", href: "/hijabs" },
    { id: 3, title: "Abayas", href: "/abayas" },
    // ... other navigation items if needed ...
  ];

  // Disable scroll when in mobile menu
  useEffect(() => {
    // Apply or remove the 'overflow-hidden' class from the body
    if (isMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Clean up function to remove class when component unmounts
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isMenuOpen]);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
    // If the menu is being opened, show the overlay immediately
    if (!isMenuOpen) {
      setIsOverlayVisible(true);
    } else {
      // Begin the fade-out effect but keep the overlay visible until it's finished
      setTimeout(() => setIsOverlayVisible(false), 1000);
    }
  };

  const handleCloseMenu = () => {
    // Hide menu items first with an animation if necessary
    setIsMenuOpen(false);

    // Start the fade-out effect for the overlay
    setIsOverlayVisible(true);
    setTimeout(() => {
      setIsOverlayVisible(false);
    }, 1000); // You can adjust the duration as needed
  };

  useEffect(() => {
    let timeoutId: string | number | NodeJS.Timeout | undefined;

    if (isMenuOpen) {
      // Immediately show the menu items when opening
      setShouldRenderMenuItems(true);

      // Show the overlay with a slight delay
      timeoutId = setTimeout(() => {
        setIsOverlayVisible(true);
      }, 1000);
    } else {
      // Delay the hiding of menu items to match the CSS transition
      timeoutId = setTimeout(() => {
        setShouldRenderMenuItems(false);
        setIsOverlayVisible(false); // Hide overlay after menu items are unrendered
      }, 1000); // Adjust this delay based on your menu closing animation time
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isMenuOpen]);

  return (
    <div className="w-full h-20 text-zinc-600 font-custom">
      <div className="flex items-center justify-between h-full max-w-screen-xl px-4 mx-auto xl:px-0">
        {/* Hamburger Icon */}
        <button
          className={`hamburger ${isMenuOpen ? "open" : "closed"} lg:hidden`}
          onClick={handleMenuToggle}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Hamburger Menu for Mobile */}
        <div
          className={`fixed inset-0 transform ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out z-40 bg-white w-full shadow-xl`}
          style={{
            top: "5rem" /* Height of the navbar */,
            height: "calc(100vh - 5rem)" /* Full height minus navbar height */,
          }}
        >
          {/* Menu Items */}
          <ul className="ml-5 space-y-5 mt-14">
            {shouldRenderMenuItems &&
              navigation.map((item, index) => (
                <li key={item.id} className="font-medium text-zinc-900">
                  <Link href={item.href} onClick={() => setIsMenuOpen(false)}>
                    <span
                      className="tracking-widest uppercase mobile-menu-item"
                      style={{
                        animationDelay: `${index * 0.1}s`, // Start after the menu opens
                      }}
                    >
                      {item.title}
                    </span>
                  </Link>
                </li>
              ))}
          </ul>

          <div className="absolute bottom-0 w-full p-4 border-t border-zinc-400/60">
            {/* Container for icons */}
            <div className="flex items-center justify-between text-zinc-900">
              {/* Login Button for mobile */}
              <Link
                href={"/login"}
                className="flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="flex justify-start w-6 h-6" />
                <span className="ml-2 text-sm">Login</span>
              </Link>

              {/* Container for social media icons */}
              <div>
                <Link
                  href={"https://www.instagram.com/"}
                  target="_blank"
                  className="inline-flex items-center mr-4"
                >
                  <Instagram className="w-6 h-6" />
                </Link>
                <Link
                  href={"https://www.tiktok.com/"}
                  target="_blank"
                  className="inline-flex items-center"
                >
                  <Music2 className="w-6 h-6" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Overlay when mobile menu is open or when it is closing */}
        {isOverlayVisible && (
          <div
            className={`fixed inset-0 z-30 backdrop-blur ${
              isOverlayVisible
                ? "backdrop-blur-visible"
                : "backdrop-blur-hidden"
            }`}
            style={{
              top: "5rem",
              height: "calc(100vh - 5rem)",
              transition:
                "opacity 1000ms ease-in, backdrop-filter 1000ms ease-out",
            }}
            onClick={handleCloseMenu}
          ></div>
        )}

        {/* Logo/Shop Name */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-widest text-gray-800 group sm:text-3xl md:text-3xl lg:text-3xl xl:text-3xl 2xl:text-3xl"
        >
          <span className="inline-flex items-center justify-center uppercase">
            Nyla
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div
          className={`hidden md:flex items-center gap-5 text-md font-semibold tracking-widest uppercase ${
            isMenuOpen ? "hidden" : ""
          }`}
        >
          {navigation.map((item) => (
            <Link key={item.id} href={item.href}>
              <span
                className={`nav-item ${pathname === item.href ? "active" : ""}`}
              >
                {item.title}
              </span>
            </Link>
          ))}
        </div>

        {/* Icons */}
        <div className="flex items-center gap-x-5">
          <Link
            href={"/my_wishlist"}
            className="relative duration-300 hover:text-zinc-900 group"
          >
            <Heart className="w-6 h-6" />
            <span className="absolute top-0 flex items-center justify-center w-4 h-4 text-xs font-semibold rounded-full -left-1 bg-zinc-800 text-zinc-200 group-hover:bg-black">
              0
            </span>
          </Link>
          <Link
            href={"/my_cart"}
            className="relative duration-300 hover:text-black group"
          >
            <ShoppingBagIcon className="w-6 h-6" />
            <span className="absolute top-0 flex items-center justify-center w-4 h-4 text-xs font-semibold rounded-full -left-1 bg-zinc-800 text-zinc-200 group-hover:bg-black">
              0
            </span>
          </Link>

          {/* Login for desktop */}
          <Link
            href={"/login"}
            className="relative hidden duration-300 hover:text-zinc-900 group md:flex"
          >
            <User className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
