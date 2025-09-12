import axios from "axios"
import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import Login_page from "../pages/Login/Login_page"

// This route controls access to the login page
// - Guest (not logged in) → can access the login page
// - Logged-in users (Customer, Vendor, Shipper, etc.) → redirected to home

function Login_route() {
    // Local state to hold account type (null until API responds)
    const [type, set_type] = useState(null)
    useEffect(() => {
        // Fetch account type from the backend
        const get_account_type = async () => {
            const account_type = await axios.get("/api/custom_path/get_account_type")
            if (account_type.data.type === "guest") {
                set_type("guest") // Guest → show login page
            }
            else {
                set_type("Others") // Logged-in user → block access
            }
        }
        // Run once when component mounts
        get_account_type()
    }, []);
    // While loading, render nothing
    if (type === null) return null
    // Conditional rendering based on account type
    if (type === "guest") return <Login_page /> // Guest → login allowed
    if (type === "Others") return <Navigate to="/" replace /> // Logged-in → redirect home
}

export default Login_route