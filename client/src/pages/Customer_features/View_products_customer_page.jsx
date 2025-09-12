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
import View_products_customer from "./Resources/View_products_customer"

function View_products_customer_page() {
    return (
        <>
            <Header></Header>
            <View_products_customer></View_products_customer>
            <Footer></Footer>
        </>
    )
}

export default View_products_customer_page