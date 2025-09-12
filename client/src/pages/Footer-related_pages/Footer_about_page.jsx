/*
# RMIT University Vietnam 
# Course: COSC2769 - Full Stack Development 
# Semester: 2025B 
# Assessment: Assignment 02 
# Author: Vu Luong Minh Triet
# ID: s3974712
*/


import Header from "../Footer_and_header/Header"
import Footer_about from "./resources/Footer_about"
import Footer from "../Footer_and_header/Footer"

function Footer_about_page() {
    return (
        <>
            <Header></Header>
            <Footer_about></Footer_about>
            <Footer></Footer>
        </>
    )
}

export default Footer_about_page