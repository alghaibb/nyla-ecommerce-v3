"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import "../globals.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [shouldRenderMenuItems, setShouldRenderMenuItems] = useState(false);

  const navigation = [
    { id: 1, title: "Home", href: "/" },
    { id: 2, title: "Hijabs", href: "/hijabs" },
    { id: 3, title: "Abayas", href: "/abayas" },
    // ... other navigation items if needed ...
  ];

  const handleCloseMenu = () => {
    // Hide menu items first with an animation if necessary
    setShouldRenderMenuItems(false);

    // Wait for the transition to finish before hiding the menu completely
    setTimeout(() => {
      setIsMenuOpen(false);
    }, 300); // Match this with your CSS transition time
  };

  useEffect(() => {
    let timeoutId: number | undefined; // Declare the variable with type

    if (isMenuOpen) {
      // Render the menu items after a slight delay, which allows for any open animation
      timeoutId = window.setTimeout(() => {
        // Use window.setTimeout for clarity
        setShouldRenderMenuItems(true);
      }, 300); // Adjust this delay based on your menu opening animation time
    } else {
      // Immediately begin closing animation
      setShouldRenderMenuItems(false);
    }

    // Clean up the timeout when the component is unmounted or before the next effect runs
    return () => {
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
    };
  }, [isMenuOpen]);

  return (
    <div className="w-full h-20 border-b-[1px] border-b-zinc-500 bg-white text-zinc-600">
      <div className="flex items-center justify-between h-full max-w-screen-xl px-4 mx-auto xl:px-0">
        {/* Hamburger Icon */}
        <button
          className={`hamburger ${isMenuOpen ? "open" : ""} md:hidden`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Hamburger Menu for Mobile */}
        <div
          className={`fixed inset-0 transform ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out z-50 bg-white w-4/5 shadow-xl`}
        >
          {/* Close Button inside the menu panel */}
          <div className="absolute top-4 right-4">
            <button
              className="close-button"
              onClick={handleCloseMenu}
              aria-label="Close menu"
            >
              {/* SVG for the close button */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Menu Items */}
          <ul>
            {shouldRenderMenuItems &&
              navigation.map((item, index) => (
                <li key={item.id} className="border-b border-gray-200">
                  <Link href={item.href} onClick={() => setIsMenuOpen(false)}>
                    <span
                      className="block p-4 opacity-0"
                      style={{
                        animation: "slideFadeIn 0.2s ease forwards",
                        animationDelay: `${index * 0.1 + 0.1}s`, // Start after the menu opens
                      }}
                    >
                      {item.title}
                    </span>
                  </Link>
                </li>
              ))}
          </ul>
        </div>

        {/* Overlay when mobile menu is open */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-50"
            onClick={() => setIsMenuOpen(false)}
          ></div>
        )}

        {/* Logo/Shop Name */}
        <Link
          href="/"
          className="text-lg font-semibold tracking-wider text-gray-800 group sm:text-xl md:text-2xl lg:text-3xl"
        >
          <span className="inline-flex items-center justify-center font-bold uppercase">
            Nyla
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div
          className={`hidden md:flex items-center gap-5 text-sm font-semibold tracking-wider uppercase ${
            isMenuOpen ? "hidden" : ""
          }`}
        >
          {navigation.map((item) => (
            <Link key={item.id} href={item.href}>
              <span className="nav-item">{item.title}</span>
            </Link>
          ))}
        </div>
        {/* Icons */}
        <p>icons</p>
      </div>
    </div>
  );
};

export default Navbar;
