/*
# RMIT University Vietnam 
# Course: COSC2769 - Full Stack Development 
# Semester: 2025B 
# Assessment: Assignment 02 
# Author: Vu Luong Minh Triet
# ID: s3974712
*/


import Header from "../Footer_and_header/Header"
import Footer_copyright from "./resources/Footer_copyright"
import Footer from "../Footer_and_header/Footer"

function Footer_copyright_page() {
    return (
        <>
            <Header></Header>
            <Footer_copyright></Footer_copyright>
            <Footer></Footer>
        </>
    )
}

export default Footer_copyright_page