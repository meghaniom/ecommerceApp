import React, { useEffect, useState } from "react";
import { getProduct } from "../../service/product/Product";
import { addCart } from "../../service/cart";

import {
  addWatchList,
  getWatchList,
  removeWatchList,
} from "../../service/watchList";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";

const Products = () => {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [watchListProductIds, setWatchListProductIds] = useState([]);

  const token = localStorage.getItem("token");

  const decoded = token ? jwtDecode(token) : null;
  const userId = decoded?._id || decoded?.id;

  useEffect(() => {
    const fetchData = async () => {
      const result = await getProduct();
      const watchListRes = await getWatchList(userId);

      const ids =
        watchListRes?.watchListItems?.map((item) => item.productId._id) || [];

      if (result?.products) setProducts(result.products);
      setWatchListProductIds(ids);
      setLoading(false);
    };

    if (userId) fetchData();
  }, [userId]);

  const handleAddToCart = async (product) => {
    const data = {
      productId: product._id,

      quantity: 1,
    };
    const result = await addCart(data);
    alert(result);
  };

  const handleAddToWatchList = async (product) => {
    const data = {
      productId: product._id,
      userId,
      watchList: true,
    };
    const result = await addWatchList(data);
    if (result.toLowerCase().includes("success")) {
      setWatchListProductIds((prev) => [...prev, product._id]);
    }
    alert(result);
  };
  const handleRemoveFromWatchList = async (product) => {
    const result = await removeWatchList(userId, product._id);
    if (result.toLowerCase().includes("success")) {
      setWatchListProductIds((prev) => prev.filter((id) => id !== product._id));
    }
    alert(result);
  };

  return (
    <section className="py-16 px-6 bg-gray-100">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 max-w-7xl mx-auto">
        Trending Products
      </h2>
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {products.map((product) => {
            return (
              <div
                key={product._id}
                className="bg-white p-4 rounded-md shadow-sm relative"
              >
                <div className="h-90 bg-gray-200 mb-4 rounded-md overflow-hidden">
                  {product.image ? (
                    <img
                      src={`http://localhost:3000/uploads/${product.image}`}
                      alt={product.productTitle}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <p className="text-gray-400 text-sm text-center mt-16">
                      {" "}
                      No Image
                    </p>
                  )}
                </div>
                <div className="absolute top-3 right-3">
                  {watchListProductIds.includes(product._id) ? (
                    <FaHeart
                      className="text-red-600 text-2xl cursor-pointer"
                      onClick={() => handleRemoveFromWatchList(product)}
                    />
                  ) : (
                    <FaRegHeart
                      className="text-gray-600 text-2xl cursor-pointer hover:text-red-500"
                      onClick={() => handleAddToWatchList(product)}
                    />
                  )}
                </div>
                <h3 className="font-medium text-gray-700 truncate">
                  {product.productTitle}
                </h3>
                <p className="text-sm text-gray-500 mb-2">₹{product.price}</p>
                <div className="absolute top-3 right-3">
                  {watchListProductIds.in}
                </div>
                <button
                  className="bg-blue-600 text-white w-full py-1 rounded hover:bg-blue-700"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Products;
