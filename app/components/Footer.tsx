import React from "react";

const Footer = () => {
  return (
    <footer className="py-8 bg-zinc-800 text-zinc-100">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="mb-6 md:mb-0">
            <h2 className="mb-4 text-xl font-semibold">Company</h2>
            <ul>
              <li className="mb-2">
                <a href="#" className="hover:text-zinc-400">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-zinc-400">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <div className="mb-6 md:mb-0">
            <h2 className="mb-4 text-xl font-semibold">Support</h2>
            <ul>
              <li className="mb-2">
                <a href="#" className="hover:text-zinc-400">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-zinc-400">
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-zinc-400">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          <div className="mb-6 md:mb-0">
            <h2 className="mb-4 text-xl font-semibold">Follow Us</h2>
            <ul>
              <li className="mb-2">
                <a href="#" className="hover:text-zinc-400">
                  Tiktok
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-zinc-400">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
          <div className="mb-6 md:mb-0">
            <h2 className="mb-4 text-xl font-semibold">Newsletter</h2>
            <p className="mb-4">
              Subscribe to our newsletter and get the latest updates and
              promotions.
            </p>
            <div className="flex flex-col md:flex-row">
              <input
                type="email"
                placeholder="Your Email"
                className="px-3 py-2 mb-4 rounded-md bg-zinc-100 text-zinc-600 focus:outline-none md:mb-0 md:rounded-r-none md:rounded-l-md"
              />
              <button className="px-4 py-2 rounded-md bg-zinc-500 text-zinc-100 hover:bg-zinc-400 focus:outline-none md:rounded-l-none md:rounded-r-md">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
