import   axios from  'axios';
import { API_BASE_URL } from '../../config/constans';
import { handelApiError } from '../../utils/handelApiError';

 
export  const SignupUser = async(FormData) => {
    try {
        console.log("response.data  ",FormData)
        const response = await axios.post(`${API_BASE_URL}/auth/register`,FormData);
        return {success: true, data : response.data};
    }
    catch(err) {
        return {
            success : false,
            error : handelApiError(err, 'Signup failed'),
        };
    }
};