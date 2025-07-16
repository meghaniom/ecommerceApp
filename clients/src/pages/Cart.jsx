import React, { useEffect, useState } from "react";
import { getCart, removeCart } from "../service/cart";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      const result = await getCart();
      if (result.cartItems) {
        setCartItems(result.cartItems);
        setTotalPrice(result.totalPrice);
      } else {
        setCartItems([]);
        setTotalPrice(0);
        console.error("Failed to load cart");
      }
    };
    fetchCart();
  }, []);

  const handelRemove = async (productId) => {
    const msg = await removeCart(productId);
    alert(msg);
    const result = await getCart();
    if (result?.cartItems) {
      setCartItems(result.cartItems);
      setTotalPrice(result.totalPrice);
    }
  };
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => {
            return (
              <div
                key={item._id}
                className="bg-white shadow-md rounded-md p-4 flex justify-between items-center"
              >
                <img
                  src={`http://localhost:3000/uploads/${item.productId?.image}`}
                  alt={item.productId?.productTitle}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h3 className="text-gray-700 font-medium">
                    {item.productId?.productTitle}
                  </h3>
                  <p className="text-gray-500 text-sm">{item.quantity}</p>
                </div>

                <button
                  className="text-red-500 text-sm mt-2 hover:underline"
                  onClick={() => handelRemove(item.productId._id)}
                >
                  Remove
                </button>
                <p className="text-gray-700 font-medium">
                  ₹{item.productId?.price}
                </p>
                <p className="text-gray-700 font-medium">
                  ₹{item.productId?.price * item.quantity}
                </p>
              </div>
            );
          })}
        </div>
      )}
      <div className="mt-6 text-right text-lg font-semibold text-gray-800">
        Total Price : ₹{totalPrice};
      </div>
    </div>
  );
};

export default Cart;
