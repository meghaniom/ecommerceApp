import  { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { singleProduct, updateProduct } from '../service/admin';

const AdminUpdate = () => {
    const {productId} = useParams();
    const [productData, setProductData] = useState({
        productTitle : " ",
        description : " ",
        price : "",
        category : " ",
        stock : " ",
        Image : null,

    });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


    const handelchange = (e) => {
        setProductData((prev) => ({
            ...prev,
            [e.target.name] : e.target.value,
        }));
    }
     useEffect(() => {
        const fetchProduct = async () => {
            const data = await singleProduct(productId);
            
            if(!data?.productId) {
                navigate("/adminDashboard");
             }
            if(data) {
                setProductData({
                    productTitle : data.productTitle,
                    description : data.description,
                    price : data.price,
                    category : data.category,
                    stock : data.stock,
                    image : data.image,
                });
            };
             
            setLoading(false);
        }
        fetchProduct();
     },[productId]);

     const handelSubmit = async(e) => {
        e.preventDefault();
        const result = await updateProduct(productId, productData);
        alert(result);
        if(result.toLowerCase().includes("success")) {
           navigate("/adminDashboard");
        }
     }

     
  return (
   <div className='max-w-xl mx-auto my-10 bg-white shadow-md p-6 rounded-md'>
    <h2 className='text-xl font-semibold mb-4'>Update Product</h2>
    <form  onSubmit={handelSubmit}  className="space-y-4" >
        <div>
            <label className='block  text-gray-600  mb-1'>ProductTitle</label>
            <input type="text" className='w-full px-4 py-2 border rounded' name='productTitle' value={productData.productTitle} onChange={handelchange}  required />
        </div>
        <div>
            <label className='block text-gray-600 mb-1'>Description</label>
            <textarea name="description" id="description"  value={productData.description} className='w-full px-4 py-2 border rounded' onChange={handelchange} required></textarea>
        </div>
        <div>
        <label className='block text-gray-600 mb-1'>Price</label> 
        <input type="number" id='price' className='w-full px-4 py-2 border rounded' onChange={handelchange} value={productData.price} required />
        </div>
        <div>
            <label className='block text-gray-600 mb-1'>Category</label>
            <input type="text" name='category' value={productData.category} className='w-full px-4 py-2 border rounded' onChange={handelchange} required/>
        </div>
        <div>
            <label className='block text-gray-600 mb-1'>Stock</label>
            <input type="number" id='number' name='stock' value={productData.stock} className='w-full px-4 py-2 border rounded'onChange={handelchange} required />
        </div>
        <div>
            <label className='block text-gray-600 mb-1'>Product Image</label>
            <input type="file" name='image' id='image' className='w-full px-4 py-2 border rounded' onChange={handelchange} />
        </div>
        <button
        type='submit'
        className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'>
            {loading ? "Updating..." : "Update Product"};

        </button>
    </form>

   </div>
  )
}

export default AdminUpdate