import React, { useState } from 'react';
import { Loginuser } from '../../service/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const [loginError, setLoginError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    setLoginError("");
    setLoginSuccess("");
    setLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await Loginuser(loginData);

    if (res.success) {
      setLoginSuccess(res.data.message); 
      setLoginError("");
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role); 

      

       localStorage.setItem("userId", response.data.user._id);

    } else {
      setLoginError(res.error); 
      setLoginSuccess("");
    }
    navigate('/homepage')
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <form onSubmit={handleSubmit} className='bg-white shadow-md rounded px-8 pb-8 w-full max-w-md'>
        <h2 className='text-2xl font-bold mb-6 text-center'>Login</h2>
        {loginError && <p className='text-red-500 text-sm mb-4'>{loginError}</p>}
        {loginSuccess && <p className='text-green-500 text-sm mb-4'>{loginSuccess}</p>}
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>Email</label>
          <input
            type="text"
            name="email"
            onChange={handleChange}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            required
            value={loginData.email}
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>Password</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            required
            value={loginData.password}
          />
        </div>
        <button
          type='submit'
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline w-full'
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
