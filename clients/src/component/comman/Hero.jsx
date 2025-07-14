import React from "react";

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-blue-100 to-purple-100 py-20 px-6 text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
        Welcome to ShopEase
      </h1>
      <p className="text-lg md:text-xl text-gray-600 mb-6">
        Find the best products at unbeatable prices.
      </p>
      <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-lg">
        Shop Now
      </button>
    </section>
  );
};

export default Hero;
