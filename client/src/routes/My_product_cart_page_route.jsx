import axios from "axios"
import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import My_product_customer_cart_page from "../pages/Customer_features/My_product_customer_cart_page"
import Access_denied_page from "../pages/Not_found_page/Access_denied_page"

// This component decides if the user can access the "My Product Cart" page
// - Customer → show My_product_customer_cart_page
// - Other logged-in roles (Vendor/Shipper/etc.) → show Access_denied_page
// - Guest (not logged in) → redirect to login

function My_prouduct_cart_page_route() {
    // Local state to store account type, null until API responds
    const [type, set_type] = useState(null)
    useEffect(() => {
        // Fetch account type from the backend
        const get_account_type = async () => {
            const account_type = await axios.get("/api/custom_path/get_account_type")
            if (account_type.data.type === "Customer") {
                set_type("Customer")
            }
            else if (account_type.data.type !== "guest") {
                set_type("Others")
            }
            else {
                set_type("guest")
            }
        }
        // Run fetch once when the component mounts
        get_account_type()
    }, []);
    // While loading, render nothing
    if (type === null) return null
    // Conditional rendering based on account type
    if (type === "Customer") return <My_product_customer_cart_page /> // Customer → allowed
    if (type === "Others") return <Access_denied_page /> // Other logged-in → denied
    if (type === "guest") return <Navigate to="/login" replace /> // Guest → redirect to login
}

export default My_prouduct_cart_page_route