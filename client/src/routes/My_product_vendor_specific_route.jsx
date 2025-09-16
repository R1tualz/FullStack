import axios from "axios"
import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import Access_denied_page from "../pages/Not_found_page/Access_denied_page"
import My_product_vendor_page from "../pages/Vendor_features/My_product_vendor_page"
import Failed_to_connect_page from "../pages/Not_found_page/Failed_to_connect_page"
import Failed_to_fetch_data_page from "../pages/Not_found_page/Failed_to_fetch_data_page"

// This component decides if the user can access the "My Product (Vendor Specific)" page
// - Vendor → show My_product_vendor_page
// - Other logged-in roles (Customer/Shipper/etc.) → show Access_denied_page
// - Guest (not logged in) → redirect to login

function My_product_vendor_specific_route() {
    // Local state to hold account type (null until API responds)
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
                if (account_type.data.type === "Vendor") {
                    set_type("Vendor")
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
    // While loading, render nothing
    if (type === null) return null
    // Conditional rendering based on account type
    if (type === "Vendor") return <My_product_vendor_page /> // Vendor → allowed
    if (type === "Others") return <Access_denied_page /> // Other logged-in → denied
    if (type === "guest") return <Navigate to="/login" replace /> // Guest → redirect to login
}

export default My_product_vendor_specific_route
