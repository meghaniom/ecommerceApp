import axios from "axios";
import { API_BASE_URL } from "../../config/constans";



export const addProduct = async (addData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${API_BASE_URL}/product/admin/productAdd`,
      addData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response.data);
    return response.data.message;
  } catch (error) {
    return error?.response?.data?.message;
  }
};

export const updateProduct = async (productId) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/product/admin/updateProduct/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: { productId },
      }
    );
    return response.data.message || "Product updated successfully";
  } catch (error) {
    console.error(error.message);
    return error?.response?.data?.messsage || "Something went wrong";
  }
};

export const deleteProduct = async (productId) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/product/admin/deleteProduct/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: { productId },
      }
    );
    console.log(response.data.message)
    return response.data.message || "Product deleted successfully";
  } catch (error) {
    console.error(error.message);
    return error?.response?.data?.message || "Something went wrong";
  }
};

 export const singleProduct = async (productId) => {
    const token = localStorage.getItem("token");
    try{
        const response = await axios.get(`${API_BASE_URL}/product/admin/signleProduct/${productId}`, {
            headers : {
                Authorization : `Bearer ${token}`,
                "Content-Type" : "application/json",
            },

        });
        console.log(response.data);
        return response.data || "Productfetch successfully";
    }
    catch(error) {
        console.error(error.message);
        return error?.response?.data?.message || "Something went wrong";
    }
 };