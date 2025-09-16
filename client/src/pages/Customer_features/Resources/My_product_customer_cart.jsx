/*
# RMIT University Vietnam 
# Course: COSC2769 - Full Stack Development 
# Semester: 2025B 
# Assessment: Assignment 02 
# Author: On Tuan Huy
# ID: s4028018
*/

import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Failed_to_connect from "../../Not_found_page/resources/Failed_to_connect"
import Failed_to_fetch_data from "../../Not_found_page/resources/Failed_to_fetch_data"
import Product_not_found from "../../Not_found_page/resources/Product_not_found"
import axios from "axios"


function My_product_customer_cart() {
    const navigate = useNavigate()
    // Set error in case data fail to fetch
    const [error, set_error] = useState(null)
    // Set server error in case data fail to fetch
    const [server_error, set_server_error] = useState(null)
    // Set product not found in case there is missing product
    const [found_status, set_found_status] = useState(null)
    const { id, } = useParams() // product id from route (item inside the cart)
    // Product data and top banner (text + color class)
    const [product, set_product] = useState({ name: null, price: null, description: null, image: null, seller: null })
    const [notification, set_notification] = useState(["Product Details", "text-white"])
    // Remove item from cart
    // mode=false → remove one instance
    // mode=true  → remove all instances of this product
    const handle_remove_item = async (mode) => {
        try {
            const remove_item_from_cart = await axios.post("/api/customer_features/remove_item_from_cart", { product_id: id, remove_all: mode })
            if (remove_item_from_cart.data.status === "failed") {
                set_server_error(true)
                return
            }
            set_notification(["Removing...", "text-red-400"])
            setTimeout(() => {
                navigate("/cart") // go back to cart after action
            }, 500)
        }
        catch (err) {
            console.error("Connection failed:", err)
            set_error(true)
        }
    }
    // Fetch the product’s full info for display
    useEffect(() => {
        const get_data = async () => {
            try {
                const { data } = await axios.post("/api/customer_features/get_product_specific", { product_id: id })
                if (data.status === "failed") {
                    set_server_error(true)
                    return
                }
                if (!data.status) {
                    // If the cart entry points to a missing product
                    set_found_status(true)
                    return
                }
                set_product(data)
            }
            catch (err) {
                console.error("Connection failed:", err)
                set_error(true)
            }
        }
        get_data()
    }, []) // run only once on mount

    if (error) return <Failed_to_connect />
    if (found_status) return <Product_not_found />
    if (server_error) return <Failed_to_fetch_data />


    return (
        <div className="min-h-screen bg-black text-white antialiased flex items-center justify-center">
            <div className="w-full max-w-3xl px-6 py-12">
                {/* Heading with dynamic status color/text */}
                <header className="mb-8 text-center">
                    <h1 className={`text-3xl font-extrabold tracking-tight ${notification[1]}`}>{notification[0]}</h1>
                </header>
                {/* Main card */}
                <section className="rounded-2xl border border-white bg-black/60 overflow-hidden">
                    {/* Product image */}
                    <div className="aspect-[16/9] w-full overflow-hidden border-b border-white/20 bg-black">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover"
                        />
                    </div>
                    {/* Product info */}
                    <div className="p-6 space-y-6">
                        <div>
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-semibold leading-tight">{product.name}</h2>
                                <div className="text-xl font-medium text-white">${product.price}</div>
                            </div>
                            <p className="text-sm text-gray-400">{product.seller}</p>
                        </div>
                        {/* Description */}
                        <div className="space-y-2">
                            <h3 className="text-xs uppercase tracking-wide text-white/70">Description</h3>
                            <p className="text-sm leading-relaxed text-white/90">{product.description}</p>
                        </div>
                        {/* Actions */}
                        <div className="space-y-3">
                            {/* Remove a single quantity */}
                            <button
                                type="button"
                                className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-red-400 text-red-400 px-4 py-2 text-sm font-medium transition hover:bg-red-400 hover:text-white"
                                onClick={() => handle_remove_item(false)}
                            >
                                Remove
                            </button>
                            {/* Remove all quantities of this product */}
                            <button
                                type="button"
                                className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-red-400 text-red-400 px-4 py-2 text-sm font-medium transition hover:bg-red-400 hover:text-white"
                                onClick={() => handle_remove_item(true)}
                            >
                                Remove All
                            </button>
                            {/* Back to cart */}
                            <button
                                type="button"
                                className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-green-400 text-green-400 px-4 py-2 text-sm font-medium transition hover:bg-green-400 hover:text-white"
                                onClick={() => navigate("/cart")}
                            >
                                Back
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default My_product_customer_cart