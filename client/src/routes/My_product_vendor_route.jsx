import axios from "axios"
import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import Access_denied_page from "../pages/Not_found_page/Access_denied_page"
import View_products_vendor_page from "../pages/Vendor_features/View_products_vendor_page"

// This component decides if the user can access the "My Products (Vendor)" page
// - Vendor → show View_products_vendor_page
// - Other logged-in roles (Customer/Shipper/etc.) → show Access_denied_page
// - Guest (not logged in) → redirect to login

function My_product_vendor_route() {
    // Local state to hold account type (null until API responds)
    const [type, set_type] = useState(null)
    useEffect(() => {
        // Fetch account type from the backend
        const get_account_type = async () => {
            const account_type = await axios.get("/api/custom_path/get_account_type")
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
        // Run the fetch once when the component mounts
        get_account_type()
    }, []);
    // While loading, render nothing
    if (type === null) return null
    // Conditional rendering based on account type
    if (type === "Vendor") return <View_products_vendor_page /> // Vendor → allowed
    if (type === "Others") return <Access_denied_page /> // Other logged-in → denied
    if (type === "guest") return <Navigate to="/login" replace /> // Guest → redirect to login
}

export default My_product_vendor_route
