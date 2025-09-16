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
import Failed_to_fetch_data from "./resources/Failed_to_fetch_data"

function Failed_to_fetch_data_page() {
    return (
        <>
            <Header></Header>
            <Failed_to_fetch_data></Failed_to_fetch_data>
            <Footer></Footer>
        </>
    )
}

export default Failed_to_fetch_data_page