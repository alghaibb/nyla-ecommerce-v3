import React from "react";
import Link from "next/link";

const PaymentError = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-4 text-center sm:p-8">
        <div className="flex items-center justify-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-16 h-16 text-zinc-800"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        </div>
        <h1 className="mb-4 text-3xl font-bold sm:text-4xl text-zinc-800">
          Oops! Something went wrong.
        </h1>
        <p className="mb-4 text-base sm:text-lg text-zinc-600">
          We apologize for the inconvenience. Please try again later or contact
          our support.
        </p>
        <Link
          href="/"
          className="text-base tracking-wider uppercase transition duration-300 ease-in-out sm:text-lg text-zinc-500 hover:text-zinc-700"
        >
          Back To Home
        </Link>
      </div>
    </div>
  );
};

export default PaymentError;
