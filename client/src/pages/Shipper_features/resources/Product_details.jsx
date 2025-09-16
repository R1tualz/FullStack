/*
# RMIT University Vietnam 
# Course: COSC2769 - Full Stack Development 
# Semester: 2025B 
# Assessment: Assignment 02 
# Author: On Tuan Huy
# ID: s4028018
*/



import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Failed_to_connect from "../../Not_found_page/resources/Failed_to_connect"
import Failed_to_fetch_data from "../../Not_found_page/resources/Failed_to_fetch_data"
import Product_not_found from "../../Not_found_page/resources/Product_not_found"
import axios from "axios"

function Product_details() {
    const navigate = useNavigate()
    const { id1, id2 } = useParams() // route params: order id (id1) + product id (id2)
    // Product data shown on the page
    const [product, set_product] = useState({ name: null, price: null, description: null, product_image: null, seller: null })
    // Set error in case data fail to fetch
    const [error, set_error] = useState(null)
    // Set server error in case data fail to fetch
    const [server_error, set_server_error] = useState(null)
    // Set product not found in case there is missing product
    const [found_status, set_found_status] = useState(null)
    // Fetch product details for a specific product inside a specific order
    useEffect(() => {
        const get_data = async () => {
            try {
                const { data } = await axios.post("/api/shipper_features/get_product_specific", { product_id1: id1, product_id2: id2 })
                if (data.status === "failed") {
                    set_server_error(true)
                    return
                }
                if (!data.status) {
                    // If backend says not found → redirect to generic not-found page
                    set_found_status(true)
                    return
                }
                set_product(data.product)
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
                {/* Page heading */}
                <header className="mb-8 text-center">
                    <h1 className="text-3xl font-extrabold tracking-tight">Product Details</h1>
                </header>
                {/* Main card */}
                <section className="rounded-2xl border border-white bg-black/60 overflow-hidden">
                    {/* Image banner */}
                    <div className="aspect-[16/9] w-full overflow-hidden border-b border-white/20 bg-black">
                        <img
                            src={product.product_image}
                            alt={product.name}
                            className="h-full w-full object-cover"
                        />
                    </div>

                    {/* Body: name, price, seller, description, back button */}
                    <div className="p-6 space-y-6">
                        {/* Title + price + seller */}
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
                        {/* Back to the order details page (uses id1) */}
                        <div className="flex flex-col items-start gap-3">
                            <button
                                type="button"
                                onClick={() => navigate(`/order/${id1}`)}
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

export default Product_details