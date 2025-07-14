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
           <label htmlFor="description" className="block mb-1 font-medium text-gray-700">
            Product Description
           </label>
           <input type="text" name="description" value={form.description} className="w-ful" />
          <input
            type="text"
            name="description"
            value={form.description}
            className="w-full border p-2 mb-3"
            required
          />
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default ProductAdd;
