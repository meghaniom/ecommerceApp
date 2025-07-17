import  { useEffect, useState } from 'react'
import { getProduct } from '../service/product/Product';
import { deleteProduct } from '../service/admin';
import { FaTrash } from 'react-icons/fa';
import {Link} from 'react-router-dom'


const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);



     useEffect(() => {
        fetchProducts();
     },[]);
    const fetchProducts = async () => {
        setLoading(true);
        const result = await getProduct();
        if(Array.isArray(result.products)) {
            setProducts(result.products);
        }
        else {
            console.error("Failed to fetch products:", result.message || "Unknown error");
        }
        setLoading(false);
    };
     const handelDeleteProduct = async(productId) => {
        const  result = await deleteProduct(productId);
       alert(result);
       if(result.toLowercase().includes("success")) {
        setProducts((prev) => prev.filter((product) => product._id !== productId));
       } 
       console.log("Procuct deleted successfully:", result);
        fetchProducts();
     }
  return (
   <section className='py-10  px-6 bg-gray-50 min-h-screen'>
     <h2 className="text-3xl font-semibold mb-8 text-gray-800 text-center">
        Admin Dashboard - Manage Products
      </h2>
      {
        loading ? (<p className='text-center text-gray-500'>Loading Products ....</p>) : products.length === 0 ? (
            <p className='text-center text-gray-500'> No Product found.</p>
        ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto'>
                {
                    products.map((product)=> {
                        return (
                            <div key={product._id} className='bg-white p-4 rounded shadow relative'>
                                <div className='h-48 bg-gray-100 mb-3 overflow-hidden rounded'>
                                    {
                                        product.image ? (
                                            <img src={`http://localhost:3000/server/uploads/${product.image}`} alt={product.productTitle} className='w-full h-full object-cover'  />
                                        ) :(<p className='text-center mt-16 text-gray-400'> No image found.</p>)
                                    }
                                    </div>
                                    <h3 className='text-lg font-medium text-gray-800 truncate'>
                                        {product.productTitle}
                                    </h3>
                                    <p className='text-gray-600 text-sm mb-2'>₹{product.price}

                                    </p>
                                    <Link to={`/adminUpdate/${product._id}`} className ="text-blue-500 hover:underline text-sm px-3 py-1 rounded inline-block"
                                    >
                                        Edit
                                    </Link>

                                    <button 
                                    onClick={() => handelDeleteProduct(product._id)}
                                    className='absolute top-3 right-3 bg-red-500 text-white p-1 rounded hover:bg-red-700' title="Delete Product">
                                        <FaTrash/>
                                    </button>

                                
                            </div>
                        )
                    })
                }

            </div>
        )
      }
   </section>
  )
}

export default AdminDashboard