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
import { Navigate, useParams } from "react-router-dom"
import Register_as_customer_page from "../pages/Register/Register_as_customer_page"
import Register_as_vendor_page from "../pages/Register/Register_as_vendor_page"
import Register_as_shipper_page from "../pages/Register/Register_as_shipper_page"
import Failed_to_connect_page from "../pages/Not_found_page/Failed_to_connect_page"
import Failed_to_fetch_data_page from "../pages/Not_found_page/Failed_to_fetch_data_page"

// This route handles all registration types dynamically
// Prevent logged-in user from accessing the register page
// Example paths:
//   /register/as_customer → customer registration page
//   /register/as_vendor   → vendor registration page
//   /register/as_shipper  → shipper registration page

function Register_route() {
    // Grab ":id" from the URL (e.g., "as_customer")
    const { id } = useParams()
    // Set error in case data fail to fetch
    const [error, set_error] = useState(null)
    // Set server error in case data fail to fetch
    const [server_error, set_server_error] = useState(null)
    // Local state to hold account type (null until API responds)
    const [type, set_type] = useState(null)
    useEffect(() => {
        // Fetch account type from the backend
        const get_account_type = async () => {
            try {
                const account_type = await axios.get("/api/custom_path/get_account_type")
                if (account_type.data.status === "failed") {
                    set_server_error(true)
                    return
                }
                if (account_type.data.type === "guest") {
                    // Guests are allowed to register
                    set_type("guest")
                }
                // Logged-in users (non-guests) are redirected
                else {
                    set_type("Others")
                }
            }
            catch (err) {
                console.error("Connection failed:", err)
                set_error(true)
            }
        }
        get_account_type()
    }, []);
    if (error) return <Failed_to_connect_page></Failed_to_connect_page>
    if (server_error) return <Failed_to_fetch_data_page></Failed_to_fetch_data_page>
    // While loading, render nothing
    if (type === null) return null
    // Conditional rendering based on account type
    if (type === "guest" && id === "as_customer") return <Register_as_customer_page />
    if (type === "guest" && id === "as_vendor") return <Register_as_vendor_page />
    if (type === "guest" && id === "as_shipper") return <Register_as_shipper_page />
    // If already logged in → redirect to main page
    if (type === "Others") return <Navigate to="/" replace />
}

export default Register_route
