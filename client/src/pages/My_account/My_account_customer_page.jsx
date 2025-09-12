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
import My_account_customer from "./Resources/My_account_customer"


function My_account_customer_page() {
    return (
        <>
            <Header></Header>
            <My_account_customer></My_account_customer>
            <Footer></Footer>
        </>
    )
}

export default My_account_customer_page