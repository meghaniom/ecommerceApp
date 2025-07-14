import axios  from "axios";
import { API_BASE_URL } from "../../config/constans";

   export  const getProduct = async() => {
    try {

        const response = await axios.get(`${API_BASE_URL}/products/getProduct`);
         return  response.data;
    }
    catch (err) {
        return err.response.data;
    }
   }