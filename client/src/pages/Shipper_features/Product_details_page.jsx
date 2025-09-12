/*
# RMIT University Vietnam 
# Course: COSC2769 - Full Stack Development 
# Semester: 2025B 
# Assessment: Assignment 02 
# Author: On Tuan Huy
# ID: s4028018
*/


import Header from "../Footer_and_header/Header"
import Footer from "../Footer_and_header/Footer"
import Product_details from "./resources/Product_details"

function Product_details_page() {
    return (
        <>
            <Header></Header>
            <Product_details></Product_details>
            <Footer></Footer>
        </>
    )
}

export default Product_details_page