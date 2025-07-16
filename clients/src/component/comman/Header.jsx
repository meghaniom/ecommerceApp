import React from "react";
import { FaShoppingCart, FaUser, FaBars, FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-2xl font-bold text-blue-600">ShopEase</div>


       



        <nav className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <a href="/" className="hover:text-blue-600">
            Home
          </a>
          <a href="/shop" className="hover:text-blue-600">
            Shop
          </a>
          <a href="/about" className="hover:text-blue-600">
            About
          </a>
          <a href="/contact" className="hover:text-blue-600">
            Contact
          </a>
        </nav>

    


        <div className="hidden lg:flex items-center border border-gray-300 rounded-md px-2 py-1 w-72">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full outline-none px-2 text-sm"
          />
        </div>

        <div className="flex items-center space-x-4 text-gray-700 text-xl">
          <FaUser className="cursor-pointer hover:text-blue-600" />
          <Link to="/cart">
            <FaShoppingCart className="cursor-pointer hover:text-blue-600" />
          </Link>
          <div className="md:hidden">
            <FaBars className="cursor-pointer hover:text-blue-600" />
          </div>
              <Link to="/watchList">
            <FaRegHeart  className="cursor-pointer hover:text-blue-600" /> 
              </Link>
        </div>
      </div>
    </header>
  );
};


export default Header;


