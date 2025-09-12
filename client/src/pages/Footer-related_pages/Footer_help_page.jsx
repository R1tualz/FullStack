/*
# RMIT University Vietnam 
# Course: COSC2769 - Full Stack Development 
# Semester: 2025B 
# Assessment: Assignment 02 
# Author: Vu Luong Minh Triet
# ID: s3974712
*/


import Header from "../Footer_and_header/Header"
import Footer_help from "./resources/Footer_help"
import Footer from "../Footer_and_header/Footer"

function Footer_help_page() {
    return (
        <>
            <Header></Header>
            <Footer_help></Footer_help>
            <Footer></Footer>
        </>
    )
}

export default Footer_help_page