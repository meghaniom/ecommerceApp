import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "../component/auth/Signup";
import Login from "../component/auth/Login";

import HomePage from "../pages/homePage";

import ProductAdd from "../admin/ProductAdd";

import Cart from "../pages/Cart";

import WatchList from "../pages/WatchList";

import AdminDashboard from "../admin/AdminDashboard";
import AdminUpdate from "../admin/AdminUpdate";
import ProtectedRoutes from "./ProtectedRoutes";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element= {<Signup/>}/>
        <Route path="/login" element ={<Login/>} />

        {/* user routes */}
        <Route  element={ <ProtectedRoutes allowedRoles={['customer']}/> }/>
        <Route path="/homePage" element ={<HomePage/>}/>
        <Route path="/cart" element ={<Cart/>} />
        <Route path="/watchList" element={<WatchList/>}/>


         {/* admin routes */}
         <Route element={<ProtectedRoutes allowdRoles={['admin']}/>}/>
         <Route path="/adminAddProduct" element={<ProductAdd/>}/>
         <Route path="/adminDashboard" element={<AdminDashboard/>}/>
         <Route path="/adminUpdate/:productId" element={<AdminUpdate/>}/>

        {/* <Route path="/" element={<Signup />} />
        <Route path="/login" 1element={<Login />} />

        <Route path="/homePage" element={<HomePage />} />

        <Route path="/addProduct" element={<ProductAdd />} />

        <Route path="/adminAddProduct" element={<ProductAdd />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />

        <Route path="/adminUpdate/:productId" element={<AdminUpdate />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/watchList" element={<WatchList />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
