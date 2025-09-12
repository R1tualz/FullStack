/*
# RMIT University Vietnam 
# Course: COSC2769 - Full Stack Development 
# Semester: 2025B 
# Assessment: Assignment 02 
# Author: On Tuan Huy
# ID: s4028018
*/


import Footer from "../Footer_and_header/Footer";
import Header from "../Footer_and_header/Header";
import My_product_customer_cart from "./Resources/My_product_customer_cart";

function My_product_customer_cart_page() {
    return (
        <>
            <Header></Header>
            <My_product_customer_cart></My_product_customer_cart>
            <Footer></Footer>
        </>
    )
}

export default My_product_customer_cart_page