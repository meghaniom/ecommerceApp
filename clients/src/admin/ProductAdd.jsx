import React, { useState } from "react";
import Header from "../component/comman/Header";
import Footer from "../component/comman/Footer";

const ProductAdd = () => {
  const [form, setForm] = useState({
    productTitle: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    image: null,
  });
  const [loading, setLoading] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div>
      <Header />
      <div className="max-w-xl mx-auto my-10 bg-white shadow-md p-6 rounded-md">
        <h2 className="text-xl font-semibold mb-4"> Add New Product</h2>
        <form encType="multipart/form-data">
          <div className="mb-3">
            <label
              htmlFor="productTitle"
              className="block mb-1 font-medium text-gray-700"
            >
              Product Title
            </label>

            <input
              type="text"
              name="productTitle"
              value={form.productTitle}
              className="w-full border p-2 mb-3"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              value={form.description}
              className="w-full border p-2"
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label
              htmlFor="price"
              className="block mb-1 font-medium text-gray-700"
            >
              Product Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={form.price}
              className="w-full border-2 p-2 mb-3"
              required
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="category"
              className="block mb-1 font-medium text-gray-700"
            >
              Category
            </label>
            <input
              type="text"
              name="category"
              value={form.category}
              className="w-full border-2 p-2 mb-3"
              required
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="stock"
              className="block mb-1 font-medium text-gray-700"
            >
              Stock
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={form.stock}
              className="w-full border-2 p-2 mb-3"
              required
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="image"
              className="block mb-1 font-medium text-gray-700"
            >
              Product Image
            </label>
            <input
              type="file"
              name="image"
              id="image"
              className="w-full border p-2"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add To Product
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default ProductAdd;
