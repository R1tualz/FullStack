import axios from "axios"
import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import Order_details_page from "../pages/Shipper_features/Order_details_page"
import Access_denied_page from "../pages/Not_found_page/Access_denied_page"
import Failed_to_connect_page from "../pages/Not_found_page/Failed_to_connect_page"
import Failed_to_fetch_data_page from "../pages/Not_found_page/Failed_to_fetch_data_page"

// This component decides if the user can access the "Order Details" page
// - Shipper → show Order_details_page
// - Other logged-in roles (Customer/Vendor/etc.) → show Access_denied_page
// - Guest (not logged in) → redirect to login

function Order_details_page_route() {
    // Local state to store account type (null until API responds)
    const [type, set_type] = useState(null)
    // Set error in case data fail to fetch
    const [error, set_error] = useState(null)
    // Set server error in case data fail to fetch
    const [server_error, set_server_error] = useState(null)
    useEffect(() => {
        // Fetch account type from the backend API
        const get_account_type = async () => {
            try {
                const account_type = await axios.get("/api/custom_path/get_account_type")
                if (account_type.data.status === "failed") {
                    set_server_error(true)
                    return
                }
                if (account_type.data.type === "Shipper") {
                    set_type("Shipper")
                }
                else if (account_type.data.type !== "guest") {
                    set_type("Others")
                }
                else {
                    set_type("guest")
                }
            }
            catch (err) {
                console.error("Connection failed:", err)
                set_error(true)
            }
        }
        // Run the fetch once when the component mounts
        get_account_type()
    }, []);
    if (error) return <Failed_to_connect_page></Failed_to_connect_page>
    if (server_error) return <Failed_to_fetch_data_page></Failed_to_fetch_data_page>
    if (type === null) return null
    // Conditional rendering based on account type
    if (type === "Shipper") return <Order_details_page /> // Shipper → allowed
    if (type === "Others") return <Access_denied_page /> // Other logged-in → denied
    if (type === "guest") return <Navigate to="/login" replace /> // Guest → redirect to login
}

export default Order_details_page_route