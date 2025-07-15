import React from 'react'
import {  BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from '../component/auth/Signup'
import Login from '../component/auth/Login'




import HomePage from '../pages/homePage'



import ProductAdd from '../admin/ProductAdd'



import Cart from '../pages/Cart'

const AppRoutes = () => {
  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element = {<Signup/>} />
    <Route path='/login' element ={<Login/>} />

   

   <Route path='/homePage' element= {<HomePage/>} />
   



   <Route path='/addProduct' element ={<ProductAdd/>} />



   <Route path='/cart' element={<Cart/>} />

   </Routes>
   </BrowserRouter>
  )
}

export default AppRoutes