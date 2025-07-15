import axios from "axios";
import { API_BASE_URL } from "../../config/constans";

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
        return error.response.data.message ;
    }
 }