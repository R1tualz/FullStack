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
import Access_denied from "./resources/Access_denied"


function Access_denied_page() {
    return (
        <>
            <Header></Header>
            <Access_denied></Access_denied>
            <Footer></Footer>
        </>
    )
}

export default Access_denied_page