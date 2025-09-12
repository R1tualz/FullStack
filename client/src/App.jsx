/*
# RMIT University Vietnam 
# Course: COSC2769 - Full Stack Development 
# Semester: 2025B 
# Assessment: Assignment 02 
# Author: Vu Luong Minh Triet
# ID: s3974712
*/


import Footer_about_page from "./pages/Footer-related_pages/Footer_about_page";
import Footer_copyright_page from "./pages/Footer-related_pages/Footer_copyright_page";
import Footer_help_page from "./pages/Footer-related_pages/Footer_help_page";
import Footer_privacy_page from "./pages/Footer-related_pages/Footer_privacy_page";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import My_account_route from "./routes/My_account_route.jsx";
import Add_product_route from "./routes/Add_product_route.jsx";
import My_product_route from "./routes/My_product_route.jsx";
import Main_page_route from "./routes/Main_page_route.jsx";
import Product_not_found_page from "./pages/Not_found_page/Product_not_found_page.jsx";
import Cart_page_route from "./routes/Cart_page_route.jsx";
import My_product_cart_page_route from "./routes/My_product_cart_page_route.jsx"
import Order_details_page_route from "./routes/Order_details_page_route.jsx";
import Order_details_page_specific_route from "./routes/Order_details_page_specific_route.jsx";
import Page_not_found_page from "./pages/Not_found_page/Page_not_found_page.jsx"
import My_product_vendor_route from "./routes/My_product_vendor_route.jsx";
import My_product_vendor_specific_route from "./routes/My_product_vendor_specific_route.jsx";
import Register_route from "./routes/Register_route.jsx";
import Login_route from "./routes/Login_route.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Registration pages */}
        <Route path="/register/:id" element={<Register_route />} />
        <Route path="/register/:id" element={<Register_route />} />
        <Route path="/register/:id" element={<Register_route />} />
        {/* User account page */}
        <Route path="/my_account" element={<My_account_route />} />
        {/* Vendor features */}
        <Route path="/add_new_product" element={<Add_product_route />} />
        <Route path="/view_my_product" element={<My_product_vendor_route />} />
        <Route path="/view_my_product/:id" element={<My_product_vendor_specific_route />} />
        {/* Customer features */}
        <Route path="/cart" element={<Cart_page_route />} />
        <Route path="/cart/:id" element={<My_product_cart_page_route />} />
        <Route path="/view_products/:id" element={<My_product_route />} />
        <Route path="/order/:id" element={<Order_details_page_route />} />
        <Route path="/order/:id1/specific/:id2" element={<Order_details_page_specific_route />} />
        {/* Product not found */}
        <Route path="/product_not_found" element={<Product_not_found_page />} />
        {/* Login page */}
        <Route path="/login" element={<Login_route />} />
        {/* Home page */}
        <Route path="/" element={<Main_page_route />} />
        {/* Other contents */}
        <Route path="/about" element={<Footer_about_page />} />
        <Route path="/copyright" element={<Footer_copyright_page />} />
        <Route path="/privacy" element={<Footer_privacy_page />} />
        <Route path="/help" element={<Footer_help_page />} />
        {/* Page not found */}
        <Route path="*" element={<Page_not_found_page />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
