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
import My_account_vendor from "./Resources/My_account_vendor"

function My_account_vendor_page() {
    return (
        <>
            <Header></Header>
            <My_account_vendor></My_account_vendor>
            <Footer></Footer>
        </>
    )
}

export default My_account_vendor_page