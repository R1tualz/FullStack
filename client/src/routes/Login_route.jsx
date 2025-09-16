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
import Login_page from "../pages/Login/Login_page"
import Failed_to_connect_page from "../pages/Not_found_page/Failed_to_connect_page"
import Failed_to_fetch_data_page from "../pages/Not_found_page/Failed_to_fetch_data_page"

// This route controls access to the login page
// - Guest (not logged in) → can access the login page
// - Logged-in users (Customer, Vendor, Shipper, etc.) → redirected to home

function Login_route() {
    // Local state to hold account type (null until API responds)
    const [type, set_type] = useState(null)
    // Set error in case data fail to fetch
    const [error, set_error] = useState(null)
    // Set server error in case data fail to fetch
    const [server_error, set_server_error] = useState(null)
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
                    set_type("guest") // Guest → show login page
                }
                else {
                    set_type("Others") // Logged-in user → block access
                }
            }
            catch (err) {
                console.error("Connection failed:", err)
                set_error(true)
            }
        }
        // Run once when component mounts
        get_account_type()
    }, []);

    if (error) return <Failed_to_connect_page></Failed_to_connect_page>
    if (server_error) return <Failed_to_fetch_data_page></Failed_to_fetch_data_page>
    // While loading, render nothing
    if (type === null) return null
    // Conditional rendering based on account type
    if (type === "guest") return <Login_page /> // Guest → login allowed
    if (type === "Others") return <Navigate to="/" replace /> // Logged-in → redirect home
}

export default Login_route
