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
import Guest_page from "../pages/Guest_features/Guest_page"
import Main_screen_page from "../pages/Vendor_features/Main_screen_page"
import View_products_customer_page from "../pages/Customer_features/View_products_customer_page"
import Active_orders_page from "../pages/Shipper_features/Active_orders_page"
import Failed_to_connect_page from "../pages/Not_found_page/Failed_to_connect_page"
import Failed_to_fetch_data_page from "../pages/Not_found_page/Failed_to_fetch_data_page"

// This component decides which main page to render based on the logged-in user's account type
function Main_page_route() {
    // Local state to store the account type once it's fetched
    const [type, set_type] = useState()
    // Set error in case data fail to fetch
    const [error, set_error] = useState(null)
    // Set server error in case data fail to fetch
    const [server_error, set_server_error] = useState(null)
    useEffect(() => {
        // Define async function to fetch account type from backend API
        const get_account_type = async () => {
            try {
                // Assign the account type to state based on API response
                const account_type = await axios.get("/api/custom_path/get_account_type")
                if (account_type.data.status === "failed") {
                    set_server_error(true)
                    return
                }
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
            catch (err) {
                console.error("Connection failed:", err)
                set_error(true)
            }
        }
        // Call the function when the component mounts
        get_account_type()
    }, [])

    if (error) return <Failed_to_connect_page></Failed_to_connect_page>
    if (server_error) return <Failed_to_fetch_data_page></Failed_to_fetch_data_page>
    // Conditional rendering based on account type
    if (type === "Vendor") return <Main_screen_page /> // Vendor → main vendor page
    if (type === "Customer") return <View_products_customer_page /> // Customer → product viewing page
    if (type === "Shipper") return <Active_orders_page /> // Shipper → active orders 
    // Default fallback → if no account type or guest, show guest page
    return <Guest_page />
}

export default Main_page_route
