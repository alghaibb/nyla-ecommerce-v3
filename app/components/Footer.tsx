import React from "react";
import Container from "./Container";
import FooterList from "./FooterList";
import Link from "next/link";
import { Instagram, Music2 } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-16 text-sm bg-zinc-800 text-zinc-200">
      <Container>
        <div className="flex flex-col justify-between pt-16 pb-8 md:flex-row">
          <FooterList>
            <h3 className="mb-2 text-base font-bold">Customer Service</h3>
            <Link href="/">Contact Us</Link>
            <Link href="/">Shipping Policy</Link>
            <Link href="/">Returns & Exchanges</Link>
            <Link href="/">FAQs</Link>
          </FooterList>
          <div className="w-full mb-6 md:w-1/3 md:mb-0">
            <h3 className="mb-2 text-base font-bold">About Us</h3>
            <p className="mb-2">
              At Nyla, we embrace the elegance of modesty through our exclusive
              range of hijabs and abayas. Our mission is to blend traditional
              values with modern fashion, offering attire that symbolizes grace
              and sophistication. Each piece reflects our dedication to quality,
              comfort, and style, empowering women to express their identity
              with confidence. Join us in the celebration of modest fashion
              redefined.
            </p>
            <p>&copy; {new Date().getFullYear()} Nyla. All rights reserved.</p>
          </div>
          <FooterList>
            <h3 className="mb-2 text-base font-bold">Follow Us</h3>
            <div className="flex gap-4">
              <Link href="/" target="_blank">
                <Instagram />
              </Link>
              <Link href="/" target="_blank">
                <Music2 />
              </Link>
            </div>
          </FooterList>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
