import axios from "axios";
import { API_BASE_URL } from "../../config/constans";

export const addWatchList = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.post(`${API_BASE_URL}/watchList/addWatchList`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.message || "WatchList added successfully";
  } catch (error) {
    console.error(error);
    return error.response?.data?.message || "Something went wrong";
  }
};

export const getWatchList = async (userId) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(`${API_BASE_URL}/watchList/getWatchList/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return error.response?.data?.message || "Something went wrong";
  }
};

export const removeWatchList = async (userId, productId) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.delete(`${API_BASE_URL}/watchList/removewatchList/${userId}/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { productId, user },
    });
    return response.data.message || "Product removed successfully";
  } catch (error) {
    console.error(error);
    return error.response?.data?.message || "Something went wrong";
  }
};
