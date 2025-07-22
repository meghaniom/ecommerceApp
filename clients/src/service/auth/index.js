import axios from "axios";
import { API_BASE_URL } from "../../config/constans";

export const SignupUser = async (formData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/register`,
      formData
    );

    return { success: true, data: response.data };
  } catch (err) {
    return {
      success: false,
      error: err?.response?.data?.message || "Signup failed",
    };
  }
};

export const Loginuser = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, formData);
    return { success: true, data: response.data };
  } catch (err) {
    return {
      success: false,
      error: err?.response?.data?.message || "Login failed",
    };
  }
};

export const logoutuser = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/auth/logout`);
    return { success: true, data: response.data };
  } catch (err) {
    return {
      success: false,
      error: err?.response?.data?.message || "Logout failed",
    };
  }
};
