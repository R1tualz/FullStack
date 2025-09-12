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
import Active_orders from "./resources/Active_orders"

function Active_orders_page() {
    return (
        <>
            <Header></Header>
            <Active_orders></Active_orders>
            <Footer></Footer>
        </>
    )
}

export default Active_orders_page