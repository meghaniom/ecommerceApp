import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "../component/auth/Signup";
import Login from "../component/auth/Login";
import HomePage from "../pages/homePage";
import ProductAdd from "../admin/ProductAdd";
import Cart from "../pages/Cart";
import WatchList from "../pages/WatchList";
import AdminDashboard from "../admin/AdminDashboard";
import AdminUpdate from "../admin/AdminUpdate";
import ProtectedRoutes from "./ProtectedRoutes";
import PublicRoutes from "./PublicRoutes";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoutes>
              <Signup />
            </PublicRoutes>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoutes>
              <Login />
            </PublicRoutes>
          }
        />

        <Route element={<ProtectedRoutes allowedRoles={["customer"]} />}>
          <Route path="/homePage" element={<HomePage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/watchList" element={<WatchList />} />
        </Route>

        <Route element={<ProtectedRoutes allowedRoles={["admin"]} />}>
          <Route path="/adminAddProduct" element={<ProductAdd />} />
          <Route path="/adminDashboard" element={<AdminDashboard />} />
          <Route path="/adminUpdate/:productId" element={<AdminUpdate />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
