import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Blogs from "../pages/Blogs";
import SidebarWithHeader from "../Admin/Sidebar";
import Products from "../pages/Products";
import About from "../pages/About";
import PageNotFound from "../pages/PageNotFound";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import DetailedProductPage from "../pages/DetailedProductPage";
import Address from "../components/Address";
import SignInForm from "../pages/Signin";
import SignUpForm from "../pages/Signup";

export default function AllRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<SignInForm />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/products" element={<Products />} />
            <Route path="/blog" element={<PrivateRoute><Blogs /></PrivateRoute>} />
            <Route path="/about" element={<About />} />
            {/* <Route
                path="/admin"
                element={<AdminRoute><SidebarWithHeader /></AdminRoute>}
            /> */}
            <Route
                path="/admin"
                element={<PrivateRoute><SidebarWithHeader /></PrivateRoute>}
            />
            <Route path="/address" element={<PrivateRoute><Address /></PrivateRoute>} />
            <Route path="/productDetail/:id" element={<DetailedProductPage />} />
            <Route path="*" element={<PageNotFound />} />
            {/* <Route path="/wallet" element={<Wallet />} /> */}
        </Routes>
    )
}