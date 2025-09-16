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
import My_account_customer_page from "../pages/My_account/My_account_customer_page"
import My_account_vendor_page from "../pages/My_account/My_account_vendor_page"
import My_account_shipper_page from "../pages/My_account/My_account_shipper_page"
import Failed_to_connect_page from "../pages/Not_found_page/Failed_to_connect_page"
import Failed_to_fetch_data_page from "../pages/Not_found_page/Failed_to_fetch_data_page"
import { Navigate } from "react-router-dom"

// This component decides which "My Account" page to display
// depending on the logged-in user's account type
function My_account_route() {
    // Local state to hold account type once retrieved from the API
    const [type, set_type] = useState(null)
    // Set error in case data fail to fetch
    const [error, set_error] = useState(null)
    // Set server error in case data fail to fetch
    const [server_error, set_server_error] = useState(null)
    useEffect(() => {
        // Define an async function to fetch account type from the backend
        const get_account_type = async () => {
            try {
                const account_type = await axios.get("/api/custom_path/get_account_type")
                if (account_type.data.status === "failed") {
                    set_server_error(true)
                    return
                }
                // Set state depending on the type returned by the API
                if (account_type.data.type === "Customer") {
                    set_type("Customer")
                }
                else if (account_type.data.type === "Shipper") {
                    set_type("Shipper")
                }
                else if (account_type.data.type === "Vendor") {
                    set_type("Vendor")
                }
                else {
                    // If none of the above, assume the user is a guest
                    set_type("guest")
                }
            }
            catch (err) {
                console.error("Connection failed:", err)
                set_error(true)
            }
        }
        // Call the async function when component mounts
        get_account_type()
    }, []);

    if (error) return <Failed_to_connect_page></Failed_to_connect_page>
    if (server_error) return <Failed_to_fetch_data_page></Failed_to_fetch_data_page>
    // While waiting for account type, render nothing
    if (type === null) { return null }
    // Conditional rendering based on account type
    if (type === "Customer") return <My_account_customer_page />; // Customer → customer account page
    if (type === "Vendor") return <My_account_vendor_page />; // Vendor → vendor account page
    if (type === "Shipper") return <My_account_shipper_page />; // Shipper → shipper account page
    if (type === "guest") return <Navigate to="/login" replace />; // Guest → redirect to login
}

export default My_account_route
