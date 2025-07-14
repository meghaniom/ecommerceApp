import React, { useEffect, useState } from "react";
import { getProduct } from "../../service/product/Product";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const result = await getProduct();
      if (result?.products) {
        setProducts(result.products);
      } else {
        console.error("Failed to load products:", result.message || result);
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);
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
                className="bg-white p-4 rounded-md shadow-sm"
              >
                <div className="h-40 bg-gray-200 mb-4 rounded-md overflow-hidden">
                  {product.image ? (
                    <img
                      src={`http://localhost:3000/uploads/${product.image}`}
                      alt={product.productTitle}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <p className="text-gray-400 text-sm text-center mt-16">
                      No Image
                    </p>
                  )}
                </div>
                <h3 className="font-medium text-gray-700 truncate">
                  {product.productTitle}
                </h3>
                <p className="text-sm text-gray-500 mb-2">₹{product.price}</p>
                <button className="bg-blue-600 text-white w-full py-1 rounded hover:bg-blue-700">
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
