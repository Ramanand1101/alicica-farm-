import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import AddProducts from "./AddProduct";
import ProductPage from "./ProductPage";
export const AdminRoutes = () => {
    return (
        <>
            <Routes>
                {/*index ->  by default Products page will be shown on admin page  */}
                <Route index element={<Dashboard />} />
                <Route path="/products" element={<ProductPage />}></Route>
                <Route path="/add-products" element={<AddProducts />}></Route>
            </Routes>
            <Outlet />
        </>
    );
};