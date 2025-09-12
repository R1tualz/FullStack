/*
# RMIT University Vietnam 
# Course: COSC2769 - Full Stack Development 
# Semester: 2025B 
# Assessment: Assignment 02 
# Author: On Tuan Huy
# ID: s4028018
*/



import Header from "../Footer_and_header/Header";
import Footer from "../Footer_and_header/Footer";
import View_products_vendor from "./Resources/View_products_vendor";

function View_products_vendor_page() {
    return (
        <>
            <Header></Header>
            <View_products_vendor></View_products_vendor>
            <Footer></Footer>
        </>
    )
}

export default View_products_vendor_page