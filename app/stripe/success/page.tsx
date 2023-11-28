import React from "react";
import Link from "next/link";

const SuccessPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-100">
      <div className="text-center">
        <div className="flex items-center justify-center mb-4 md:mb-6 lg:mb-8 xl:mb-10 2xl:mb-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#006400"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-16 h-16 mb-2 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 2xl:w-32 2xl:h-32 md:mb-4 lg:mb-6 xl:mb-8 2xl:mb-10"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M9 12l2 2 4-4" />
          </svg>
        </div>
        <h1 className="my-6 text-2xl font-bold md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl text-zinc-800">
          Payment Successful!
        </h1>
        <p className="mx-2 mb-2 text-base md:text-xl text-zinc-600">
          Thank you for your purchase. Your payment was successful.
        </p>
        <p className="mx-2 mb-2 text-base md:text-xl text-zinc-600">
          May Allah bless your purchase and grant you the best in this world and
          the Hereafter.
        </p>
        <p className="my-6 text-lg md:text-xl text-zinc-600">
          جَزَاكَ اللَّهُ خَيْرًا (JazakAllahu Khairan)
        </p>
        <Link
          href="/"
          className="text-lg tracking-wider uppercase transition duration-300 ease-in-out md:text-xl text-zinc-500 hover:text-zinc-700"
        >
          Back To Home
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
