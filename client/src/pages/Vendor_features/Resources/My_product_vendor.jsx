/*
# RMIT University Vietnam 
# Course: COSC2769 - Full Stack Development 
# Semester: 2025B 
# Assessment: Assignment 02 
# Author: On Tuan Huy
# ID: s4028018
*/



import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

function My_product_vendor() {
    const navigate = useNavigate()
    const { id } = useParams() // product ID from route (dynamic URL param)
    // Store product details
    const [product, set_product] = useState({ name: null, price: null, description: null, image: null })
    // Fetch product details on mount
    useEffect(() => {
        const get_data = async () => {
            const { data } = await axios.post("/api/vendor_features/get_user_product_specific", { product_id: id })
            // If product not found, navigate to error page
            if (!data.status) {
                navigate("/product_not_found")
                return
            }
            // Otherwise, set product details in state
            set_product(data)
        }
        get_data()
    }, [])

    return (
        <div className="min-h-screen bg-black text-white antialiased flex items-center justify-center">
            <div className="w-full max-w-3xl px-6 py-12">
                {/* Heading */}
                <header className="mb-8 text-center">
                    <h1 className="text-3xl font-extrabold tracking-tight">Product Details</h1>
                </header>


                {/* Content */}
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
                    {/* Name + price row */}
                    <div className="p-6 space-y-6">
                        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
                            <h2 className="text-2xl font-semibold leading-tight">{product.name}</h2>
                            <div className="text-xl font-medium text-white">${product.price}</div>
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <h3 className="text-xs uppercase tracking-wide text-white/70">Description</h3>
                            <p className="text-sm leading-relaxed text-white/90">{product.description}</p>
                        </div>
                        {/* Back button */}
                        <button
                            className="inline-flex items-center px-4 py-2 rounded-lg border border-red-400 text-red-400 px-4 py-2 text-sm transition hover:bg-red-400 hover:text-white"
                            onClick={() => navigate("/view_my_product")}
                        >
                            Back
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default My_product_vendor