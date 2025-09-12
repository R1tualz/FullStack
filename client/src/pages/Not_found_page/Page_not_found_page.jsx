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
import Page_not_found from "./resources/Page_not_found"


function Page_not_found_page() {
    return (
        <>
            <Header></Header>
            <Page_not_found></Page_not_found>
            <Footer></Footer>
        </>
    )
}

export default Page_not_found_page