import axios  from "axios";
 import { API_BASE_URL } from "../../config/constans";

  export const  addProduct = async(addData) => {
    try {
         const token = localStorage.getItem('token');
        const response = await axios.post(`${API_BASE_URL}/product/admin/productAdd`,addData,  {
            headers : {
                Authorization : `Bearer ${token}`,
                "Content-Type" : "multipart/form-data",
            }
        })
         console.log(response.data);
          return response.data.message;
    }
    catch(error) {
        return error?.response?.data?.message;
    }
  }