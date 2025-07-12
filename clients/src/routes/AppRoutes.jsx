import React from 'react'
import {  BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from '../component/auth/Signup'
import Login from '../component/auth/Login'
const AppRoutes = () => {
  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element = {<Signup/>} />
    <Route path='/login' element ={<Login/>} />
   </Routes>
   </BrowserRouter>
  )
}

export default AppRoutes