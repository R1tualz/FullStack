/*
# RMIT University Vietnam 
# Course: COSC2769 - Full Stack Development 
# Semester: 2025B 
# Assessment: Assignment 02 
# Author: On Tuan Huy
# ID: s4028018
*/



import Footer from "../Footer_and_header/Footer"
import Header from "../Footer_and_header/Header"
import Add_new_product from "./Resources/Add_new_product"

function Add_new_product_page() {
    return (
        <>
            <Header></Header>
            <Add_new_product></Add_new_product>
            <Footer></Footer>
        </>
    )
}

export default Add_new_product_page