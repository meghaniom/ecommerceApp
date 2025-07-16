import { jwtDecode } from "jwt-decode";
import  { useEffect, useState } from "react";
import { getWatchList } from "../service/watchList";

const WatchList = () => {
  const [watchListItems, setWatchListItems] = useState([]);
  const token = localStorage.getItem("token");
  const decoded = token ? jwtDecode(token) : null;
  const userId = decoded?._id || decoded?.id;

  useEffect(() => {
    const fetchWatchList = async () => {
      if (!userId) return;
      const result = await getWatchList(userId);
      if (Array.isArray(result?.watchListItems)) {
        setWatchListItems(result.watchListItems);
      } else {
        console.error(
          "Invalid watchListItems format :",
          result.message || result
        );
      }
    };
    fetchWatchList();
  }, [userId]);

  return (
    <section className="py-16 px-6 bg-gray-100">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Your WatchList
      </h2>
      {watchListItems.length === 0 ? (
        <p className="text-center text-gray-500">No items in your WatchList.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {watchListItems.map((item) => {
            const product = item.productId;
            return (
              <div
                key={product._id}
                className="bg-white p-4 rounded-md shadow-sm relative"
              >
                <div className="h-60 bg-gray-200 mb-4 rounded-md overflow-hidden">
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
                <p className="text-sm text-gray-500 mb-2">{product.price}</p>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
export default WatchList;