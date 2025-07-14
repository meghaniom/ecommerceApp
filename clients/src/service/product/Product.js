import axios  from "axios";
import { API_BASE_URL } from "../../config/constans";

   export  const getProduct = async() => {
    try {
   const token = localStorage.getItem("token");
        const response = await axios.get(`${API_BASE_URL}/product/getProduct`, {
            headers : {
                Authorization : `Bearer ${token}`,
            }
        });
        console.log(response.data);
        
         return  response.data;
    }
    catch (err) {
        return err.response.data;
    }
   }