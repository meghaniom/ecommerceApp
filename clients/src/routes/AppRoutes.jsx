import React from 'react'
import {  BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from '../component/auth/Signup'
import Login from '../component/auth/Login'

import HomePage from '../pages/homePage'
import ProductAdd from '../admin/ProductAdd'
const AppRoutes = () => {
  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element = {<Signup/>} />
    <Route path='/login' element ={<Login/>} />
   <Route path='/homePage' element= {<HomePage/>} />
   <Route path='/addProduct' element ={<ProductAdd/>} />
   </Routes>
   </BrowserRouter>
  )
}

export default AppRoutes