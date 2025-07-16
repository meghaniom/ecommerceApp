import axios  from "axios";
import { API_BASE_URL } from "../../config/constans";

 export const addWatchList = async (data) => {
    const token = localStorage.getItem("token");
    try {
        const token = localStorage.getItem("token");
        const response = await axios.post(`${API_BASE_URL}/watchList/addWatchList`,data, {
            headers : {
                Authorization : `Bearer ${token}`,
            }
        });
        console.log(response.data.message);
        return response.data.message;
    }
    catch(error) {
        console.log(error);
        return error.respose.data.message || "SomeThing went wrong";
    }
 };


  export const getWatchList = async () => {
    const token = localStorage.getItem("token");

    // const {_id} = res._id;

     try {
        const resposne = await axios.get (`${API_BASE_URL}/watchList/getWatchList/${userId}`, {
            headers : {
                Authorization :  `Bearer ${token}`,
            }
        }); 
        console.log(resposne.data.message )
     }
     catch (error) {
        console.log(error);
        return error.response.data.message || "Something went wrong";
     }
  };

   export const removeWatchList = async(productId) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.delete(`${API_BASE_URL}/watchList/removewatchList/${userId}`, {
            headers : {
                Authorization : `Bearer ${token}`,
            },
            data : {productId},
        });
        console.log(response.data.message);
        return response.data.message || "Product removed successfully";
    }
    catch(error) {
        console.log(error);
        return error.response.data.message || "Something went wrong";

    }
   };
   