import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { singleProduct, updateProduct } from "../service/admin";

const AdminUpdate = () => {
  const { productId } = useParams();
  const [productData, setProductData] = useState({
    productTitle: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    image: null,
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handelchange = (e) => {
    if (e.target.name === "image") {
      setProductData((prev) => ({
        ...prev,
        image: e.target.files[0],
      }));
    } else {
      setProductData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await singleProduct(productId);
      console.log("Product data:", data);
      if (!data || data.error) {
        navigate("/adminDashboard");
        return;
      }
      setProductData({
        productTitle: data.product.productTitle || "",
        description: data.product.description,
        price: data.product.price,
        category: data.product.category,
        stock: data.product.stock,
        image: data.product.image || null
      });
    //    console.log("ProductTitle", data.product.image);
      setLoading(false);
    };
    fetchProduct();
  }, [productId, navigate]);

  const handelSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("productTitle", productData.productTitle);
    formData.append("description", productData.description);
    formData.append("price", productData.price);
    formData.append("category", productData.category);
    formData.append("stock", productData.stock);
    if (productData.image) {
      formData.append("image", productData.image);
    }

    const result = await updateProduct(productId, formData);
    alert(result);
    if (
      typeof result === "string" &&
      result.toLowerCase().includes("success")
    ) {
      navigate("/adminDashboard");
    }
  };

  return (
    <div className="max-w-xl mx-auto my-10 bg-white shadow-md p-6 rounded-md">
      <h2 className="text-xl font-semibold mb-4">Update Product</h2>
      <form
        onSubmit={handelSubmit}
        className="space-y-4"
        encType="multipart/form-data"
      >
        <div>
          <label className="block text-gray-600 mb-1">Product Title</label>
          <input
            type="text"
            name="productTitle"
            value={productData.productTitle}
            onChange={handelchange}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-1">Description</label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handelchange}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-1">Price</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handelchange}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-1">Category</label>
          <input
            type="text"
            name="category"
            value={productData.category}
            onChange={handelchange}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-1">Stock</label>
          <input
            type="number"
            name="stock"
            value={productData.stock}
            onChange={handelchange}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-1">Product Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handelchange}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
};

export default AdminUpdate;
