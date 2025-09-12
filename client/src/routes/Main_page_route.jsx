import axios from "axios"
import { useEffect, useState } from "react"
import Guest_page from "../pages/Guest_features/Guest_page"
import Main_screen_page from "../pages/Vendor_features/Main_screen_page"
import View_products_customer_page from "../pages/Customer_features/View_products_customer_page"
import Active_orders_page from "../pages/Shipper_features/Active_orders_page"

// This component decides which main page to render based on the logged-in user's account type
function Main_page_route() {
    // Local state to store the account type once it's fetched
    const [type, set_type] = useState()
    useEffect(() => {
        // Define async function to fetch account type from backend API
        const get_account_type = async () => {
            // Assign the account type to state based on API response
            const account_type = await axios.get("/api/custom_path/get_account_type")
            if (account_type.data.type === "Vendor") {
                set_type("Vendor")
            }
            else if (account_type.data.type === "Customer") {
                set_type("Customer")
            }
            else if (account_type.data.type === "Shipper") {
                set_type("Shipper")
            }
        }
        // Call the function when the component mounts
        get_account_type()
    }, [])
    // Conditional rendering based on account type
    if (type === "Vendor") return <Main_screen_page /> // Vendor → main vendor page
    if (type === "Customer") return <View_products_customer_page /> // Customer → product viewing page
    if (type === "Shipper") return <Active_orders_page /> // Shipper → active orders 
    // Default fallback → if no account type or guest, show guest page
    return <Guest_page />
}

export default Main_page_route