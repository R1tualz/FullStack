/*
# RMIT University Vietnam 
# Course: COSC2769 - Full Stack Development 
# Semester: 2025B 
# Assessment: Assignment 02 
# Author: Vu Luong Minh Triet
# ID: s3974712
*/



import Header from "../Footer_and_header/Header";
import Footer from "../Footer_and_header/Footer";
import Guest from "./resources/Guest";

function Guest_page() {
    return (
        <>
            <Header></Header>
            <Guest></Guest>
            <Footer></Footer>
        </>
    )
}

export default Guest_page