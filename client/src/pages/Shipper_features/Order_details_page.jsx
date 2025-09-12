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
import Order_details from "./resources/Order_details"


function Order_details_page() {
    return (
        <>
            <Header></Header>
            <Order_details></Order_details>
            <Footer></Footer>
        </>
    )
}

export default Order_details_page