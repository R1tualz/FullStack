import axios from "axios"
import { useEffect, useState } from "react"
import My_account_customer_page from "../pages/My_account/My_account_customer_page"
import My_account_vendor_page from "../pages/My_account/My_account_vendor_page"
import My_account_shipper_page from "../pages/My_account/My_account_shipper_page"
import { Navigate } from "react-router-dom"

// This component decides which "My Account" page to display
// depending on the logged-in user's account type
function My_account_route() {
    // Local state to hold account type once retrieved from the API
    const [type, set_type] = useState(null)
    useEffect(() => {
        // Define an async function to fetch account type from the backend
        const get_account_type = async () => {
            const account_type = await axios.get("/api/custom_path/get_account_type")
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
        // Call the async function when component mounts
        get_account_type()
    }, []);
    // While waiting for account type, render nothing
    if (type === null) { return null }
    // Conditional rendering based on account type
    if (type === "Customer") return <My_account_customer_page />; // Customer → customer account page
    if (type === "Vendor") return <My_account_vendor_page />; // Vendor → vendor account page
    if (type === "Shipper") return <My_account_shipper_page />; // Shipper → shipper account page
    if (type === "guest") return <Navigate to="/login" replace />; // Guest → redirect to login
}

export default My_account_route