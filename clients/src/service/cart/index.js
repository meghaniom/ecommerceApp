import axios from "axios";
import { API_BASE_URL } from "../../config/constans";
import { data } from "react-router-dom";

 export  const addCart = async (data) => {
    try {
        const  token = localStorage.getItem("token");
        const response = await axios.post(`${API_BASE_URL}/cart/addCart`,data, {
            headers : {
                Authorization : `Bearer ${token}`,
            }
        });

        console.log(response.data.message );
         return response.data.message;
    }
    catch(error) {
        console.log(error);
        return error.response.data.message || "Something went wrong" ;
    }
 };

  export const removeCart = async(data) => {
    try {
        const token = localStorage.getItem("token");

        const response = await axios.delete(`${API_BASE_URL}/cart/removeCart`, {
            headers : {
                Authorization : `Bearer ${token}`,
            },
            data : {productId},
        });
        console.log(response.data.message);
        return response.data.message;
    }
    catch(error) {
        console.log(error);
        return error.response.data.message || "Something went wrong";
    }
  };

   export const getCart = async()=> {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_BASE_URL}/cart/getCart`, {
            headers : {
                Authorization : `Bearer ${token}`,
            }
        });
        console.log(response.data.message);
        return response.data.message;
    }
    catch(error) {
        console.log(error);
       return { cartItems: [], totalPrice: 0, error: "Something went wrong" };
    }
   };