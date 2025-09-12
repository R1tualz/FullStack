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
import My_product_customer from "./Resources/My_product_customer";

function My_product_customer_page() {
    return (
        <>
            <Header></Header>
            <My_product_customer></My_product_customer>
            <Footer></Footer>
        </>
    )
}

export default My_product_customer_page