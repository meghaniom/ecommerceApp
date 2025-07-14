import React from 'react'
import {  BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from '../component/auth/Signup'
import Login from '../component/auth/Login'
import Header from '../component/comman/Header'
const AppRoutes = () => {
  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element = {<Signup/>} />
    <Route path='/login' element ={<Login/>} />
    <Route path='/header' element={<Header/>} />
   </Routes>
   </BrowserRouter>
  )
}

export default AppRoutes