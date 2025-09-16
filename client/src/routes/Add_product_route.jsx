/*
# RMIT University Vietnam 
# Course: COSC2769 - Full Stack Development 
# Semester: 2025B 
# Assessment: Assignment 02 
# Author: Vu Luong Minh Triet
# ID: s3974712
*/



import axios from "axios"
import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import Add_new_product_page from "../pages/Vendor_features/Add_new_product_page";
import Access_denied_page from "../pages/Not_found_page/Access_denied_page"
import Failed_to_connect_page from "../pages/Not_found_page/Failed_to_connect_page";
import Failed_to_fetch_data_page from "../pages/Not_found_page/Failed_to_fetch_data_page";

// This component controls access to the "Add New Product" feature
// It checks the logged-in user's account type and decides what page to render

function Add_product_route() {
    // Local state to hold the account type once it's fetched
    const [type, set_type] = useState(null)
    // Set error in case data fail to fetch
    const [error, set_error] = useState(null)
    // Set server error in case data fail to fetch
    const [server_error, set_server_error] = useState(null)
    useEffect(() => {
        // Define an async function to fetch account type from the server
        const get_account_type = async () => {
            try {
                // Request account type from backend API
                const account_type = await axios.get("/api/custom_path/get_account_type")
                if (account_type.data.status === "failed") {
                    set_server_error(true)
                    return
                }
                // If the user is a Vendor, allow access to the add product page
                if (account_type.data.type === "Vendor") {
                    set_type("Vendor")
                }
                // If the user is logged in but not a Vendor (and not guest), deny access
                else if (account_type.data.type !== "guest") {
                    set_type("others")
                }
                // If the user is a guest, redirect them to login
                else {
                    set_type("guest")
                }
            }
            catch (err) {
                console.error("Connection failed:", err)
                set_error(true)
            }
        }
        // Call the function immediately after component mounts
        get_account_type()
    }, []);

    if (error) return <Failed_to_connect_page></Failed_to_connect_page>
    if (server_error) return <Failed_to_fetch_data_page></Failed_to_fetch_data_page>
    // While account type is still being fetched, render nothing
    if (type === null) { return null }
    // Conditional rendering based on resolved account type
    if (type === "Vendor") return <Add_new_product_page /> // Vendor → show add product page
    if (type === "others") return <Access_denied_page /> // Other users → show access denied
    if (type === "guest") return <Navigate to="/login" replace /> // Guests → redirect to login
}

export default Add_product_route
