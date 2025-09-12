import axios from "axios"
import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import Product_details_page from "../pages/Shipper_features/Product_details_page"
import Access_denied_page from "../pages/Not_found_page/Access_denied_page"

// This component decides if the user can access the "Product Details" page (shipper-specific)
// - Shipper → show Product_details_page
// - Customer → show Access_denied_page
// - Guest (not logged in) → redirect to login

function Order_details_page_specific_route() {
    // Local state to store account type (null until API responds)
    const [type, set_type] = useState(null)
    useEffect(() => {
        // Fetch account type from the backend API
        const get_account_type = async () => {
            const account_type = await axios.get("/api/custom_path/get_account_type")
            if (account_type.data.type === "Shipper") {
                set_type("Shipper")
            }
            else if (account_type.data.type === "Customer") {
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
    if (type === "Shipper") return <Product_details_page /> // Shipper → allowed
    if (type === "Others") return <Access_denied_page /> // Customer → denied
    if (type === "guest") return <Navigate to="/login" replace /> // Guest → login redirect
}

export default Order_details_page_specific_route
