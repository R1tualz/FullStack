/*
# RMIT University Vietnam 
# Course: COSC2769 - Full Stack Development 
# Semester: 2025B 
# Assessment: Assignment 02 
# Author: On Tuan Huy
# ID: s4028018
*/

import { ShoppingCart } from "lucide-react"
import { useState } from "react"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Failed_to_connect from "../../Not_found_page/resources/Failed_to_connect"
import Failed_to_fetch_data from "../../Not_found_page/resources/Failed_to_fetch_data"
import Product_not_found from "../../Not_found_page/resources/Product_not_found"
import axios from "axios"

function My_product_customer() {
    const navigate = useNavigate()
    // Set error in case data fail to fetch
    const [error, set_error] = useState(null)
    // Set server error in case data fail to fetch
    const [server_error, set_server_error] = useState(null)
    // Set product not found in case there is missing product
    const [found_status, set_found_status] = useState(null)
    const { id, seller } = useParams() // read product id and seller from URL params
    // Product data + banner message at top
    const [product, set_product] = useState({ name: null, price: null, description: null, image: null, seller: null })
    const [notification, set_notification] = useState(["Product Details", "text-white"])
    // Add current product to cart, then briefly show "Adding..." and go home
    const add_to_cart = async () => {
        try {
            // store only file name part of image (server expects this)
            const add_product_to_cart = await axios.post("/api/customer_features/add_product_to_cart", { product_id: id, name: product.name, price: product.price, product_image: product.image.split("/").pop(), description: product.description, seller: product.seller })
            if (add_product_to_cart.data.status === "failed") {
                set_server_error(true)
                return
            }
            set_notification(["Adding...", "text-green-400"])
            setTimeout(() => {
                navigate("/")
            }, 500)
        }
        catch (err) {
            console.error("Connection failed:", err)
            set_error(true)
        }
    }
    // Fetch product details on mount using id + seller from route
    useEffect(() => {
        const get_data = async () => {
            try {
                const { data } = await axios.post("/api/customer_features/get_product_specific", { product_id: id, seller: seller })
                if (data.status === "failed") {
                    set_server_error(true)
                    return
                }
                if (!data.status) {
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
    }, []) // run once on mount

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
                    {/* Image */}
                    <div className="aspect-[16/9] w-full overflow-hidden border-b border-white/20 bg-black">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover"
                        />
                    </div>


                    {/* Info */}
                    <div className="p-6 space-y-6">
                        {/* Title + price row, seller under it */}
                        <div>
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-semibold leading-tight">{product.name}</h2>
                                <div className="text-xl font-medium text-white">${product.price}</div>
                            </div>
                            <p className="text-sm text-gray-400">{product.seller}</p>
                        </div>
                        {/* Description block */}
                        <div className="space-y-2">
                            <h3 className="text-xs uppercase tracking-wide text-white/70">Description</h3>
                            <p className="text-sm leading-relaxed text-white/90">{product.description}</p>
                        </div>

                        {/* Add to Cart button */}
                        <div className="flex flex-col items-start gap-3">
                            <button
                                type="button"
                                className="inline-flex items-center gap-2 rounded-lg border border-green-400 text-green-400 px-4 py-2 text-sm transition hover:bg-green-400 hover:text-white"
                                onClick={() => add_to_cart()}
                            >
                                <ShoppingCart className="h-4 w-4" />
                                Add to Cart
                            </button>

                            {/* Back */}
                            <button
                                type="button"
                                onClick={() => navigate("/")}
                                className="inline-flex items-center gap-2 rounded-lg border border-red-400 text-red-400 px-4 py-2 text-sm transition hover:bg-red-400 hover:text-white"
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

export default My_product_customer