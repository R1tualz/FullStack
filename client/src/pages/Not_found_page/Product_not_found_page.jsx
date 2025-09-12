/*
# RMIT University Vietnam 
# Course: COSC2769 - Full Stack Development 
# Semester: 2025B 
# Assessment: Assignment 02 
# Author: Vu Luong Minh Triet
# ID: s3974712
*/



import Footer from "../Footer_and_header/Footer"
import Header from "../Footer_and_header/Header"
import Product_not_found from "./resources/Product_not_found"


function Product_not_found_page() {
    return (
        <>
            <Header></Header>
            <Product_not_found></Product_not_found>
            <Footer></Footer>
        </>
    )
}

export default Product_not_found_page