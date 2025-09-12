/*
# RMIT University Vietnam 
# Course: COSC2769 - Full Stack Development 
# Semester: 2025B 
# Assessment: Assignment 02 
# Author: On Tuan Huy
# ID: s4028018
*/


import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"


function Order_details() {
    const { id } = useParams() // order id from route
    const navigate = useNavigate()
    // Pagination state (1-based when active)
    const [page, set_page] = useState(0)
    const [max_page, set_max_page] = useState(0)
    const [products_per_page, set_products_per_page] = useState([])
    // Keep full product list in a ref (avoids re-renders when assigning)
    const product_list = useRef([])
    // Order header info
    const [customer, set_customer] = useState("anonymous")
    const [total_price, set_total_price] = useState(0)
    const [total_product, set_total_product] = useState(0)
    const [total_total_product, set_total_total_product] = useState(0)
    // Banner message (text + color class)
    const [notification, set_notification] = useState(["Order Details", "text-white"])
    // --- Pagination: jump to a page typed by the user ---
    const handle_page_change = (e) => {
        const value = e.target.value
        if (!/^\d+$/.test(value)) {
            return
        }
        const current_page = Number(value)
        if (current_page < 1 || current_page > max_page || current_page === page) {
            return;
        }
        set_page(current_page)
    }
    // --- Pagination: next ---
    const next_page = () => {
        if (page === max_page) {
            return
        }
        const current_page = page + 1
        set_page(current_page)
    }
    // --- Pagination: previous ---
    const previous_page = () => {
        if (page === 1) {
            return
        }
        const current_page = page - 1
        set_page(current_page)
    }
    // --- Mark order status  ---
    const take_order = async () => {
        await axios.post("/api/shipper_features/take_order", { order_id: id })
        set_notification(["Processing...", "text-green-400"])
        setTimeout(() => navigate("/"), 1000)
    }
    // --- Initial fetch: get order details (items + totals), then set up pagination (10 per page) ---
    useEffect(() => {
        const get_data = async () => {
            const { data } = await axios.post("/api/shipper_features/get_order_details", { order_id: id })
            if (!data.status) {
                // If backend indicates missing order, redirect
                navigate("/product_not_found")
                return
            }
            product_list.current = data.order_details.list
            set_total_price(data.order_details.total_price)
            set_customer(data.order_details.customer_name)
            set_total_product(product_list.current.length)
            set_total_total_product(data.order_details.total_total_product)
            if (product_list.current === 0) {
                set_max_page(0)
                set_page(0)
            }
            else {
                set_max_page(Math.ceil(product_list.current.length / 10))
                set_page(1)
            }
        }
        get_data()
    }, [])
    // --- When page changes, compute current page slice from the ref list ---
    useEffect(() => {
        if (page === -1) {
            return
        }
        const start_point = (page - 1) * 10
        const page_content = product_list.current.slice(start_point, start_point + 10)
        set_products_per_page(page_content)
    }, [page])


    return (
        <div className="min-h-screen bg-black text-white antialiased">
            <div className="mx-auto w-full max-w-6xl px-6 py-12">
                <header className="mb-8">
                    {/* Heading with dynamic status color/text */}
                    <h1 className={`text-3xl font-extrabold tracking-tight text-center ${notification[1]}`}>
                        {notification[0]}
                    </h1>
                    {/* Actions + Order summary */}
                    <div className="mt-3 flex flex-col items-start gap-3">
                        <button
                            type="button"
                            className="rounded-lg border border-green-400 bg-black/40 px-4 py-2 text-sm font-medium text-green-400 transition hover:bg-green-400 hover:text-black"
                            onClick={() => take_order()}
                        >
                            Delivered
                        </button>


                        <button
                            type="button"
                            className="rounded-lg border border-red-400 bg-black/40 px-4 py-2 text-sm font-medium text-red-400 transition hover:bg-red-400 hover:text-black"
                            onClick={() => take_order()}
                        >
                            Canceled
                        </button>
                        <div className="rounded-lg border border-white/30 bg-black/40 px-4 py-2 text-sm font-semibold text-white">
                            <span className="mr-2 text-white/70">Total Price:</span>
                            <span>${total_price}</span>
                        </div>
                        <div className="rounded-lg border border-white/30 bg-black/40 px-4 py-2 text-sm font-semibold text-white">
                            <span className="mr-2 text-white/70">Customer:</span>
                            <span>{customer}</span>
                        </div>
                        <div className="rounded-lg border border-white/30 bg-black/40 px-4 py-2 text-sm font-semibold text-white">
                            <span className="mr-2 text-white/70">Total Kind Of Products:</span>
                            <span>{total_product}</span>
                        </div>
                        <div className="rounded-lg border border-white/30 bg-black/40 px-4 py-2 text-sm font-semibold text-white">
                            <span className="mr-2 text-white/70">Total Products:</span>
                            <span>{total_total_product}</span>
                        </div>
                    </div>
                </header>
                {/* Empty state vs. list of products in the order */}
                {products_per_page.length === 0 ? (
                    <div className="flex h-64 items-center justify-center rounded-2xl border border-white/20">
                        <p className="text-sm text-white/70">No products to show.</p>
                    </div>
                ) : (
                    <section className="space-y-3">
                        {products_per_page.map((item) => (
                            <article
                                key={item.product_id}
                                className="group relative flex items-center gap-4 rounded-xl border border-white/15 bg-black/60 p-4 transition hover:shadow-[0_0_0_1px_#ffffff]"
                                onClick={() => navigate(`/order/${id}/specific/${item.product_id}`)}
                            >
                                {/* Thumbnail */}
                                <div className="h-16 w-16 flex-none overflow-hidden rounded-lg border border-white/10 bg-black">
                                    <img src={item.product_image} alt={item.name} className="h-full w-full object-cover" loading="lazy" />
                                </div>
                                {/* Basic info */}
                                <div className="min-w-0 flex-1">
                                    <h2 className="truncate text-base font-semibold">{item.name}</h2>
                                    <p className="mt-1 text-sm text-white/70">
                                        Price: <span className="font-medium text-white">${item.price}</span>
                                    </p>
                                    <p className="truncate text-xs text-white/50">
                                        <span className="font-medium">{item.seller}</span>
                                    </p>
                                </div>
                                {/* Qty + line total */}
                                <div className="flex w-[260px] flex-col items-end text-sm">
                                    <div className="flex items-center gap-3">
                                        <span className="text-white/60">Qty</span>
                                        <span className="tabular-nums font-medium">{item.quantity}</span>
                                        <span className="text-white/40">·</span>
                                        <span className="text-white/60">Total</span>
                                        <span className="tabular-nums font-semibold text-white">${item.price * item.quantity}</span>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </section>
                )}
                {/* Pagination controls */}
                <nav
                    aria-label="Pagination"
                    className="mt-10 flex items-center justify-center gap-4 text-sm"
                >
                    {/* Previous page */}
                    <button
                        type="button"
                        className="rounded-full border border-white/30 px-3 py-1 transition hover:border-white hover:bg-white hover:text-black"
                        onClick={() => previous_page()}
                    >
                        &lt;
                    </button>
                    {/* Custom page input */}
                    <div className="flex items-center gap-2">
                        <input
                            type="number"
                            value={page}
                            onChange={(e) => handle_page_change(e)}
                            className="w-14 rounded-md border border-white/30 bg-black/40 text-center text-sm font-semibold text-white focus:border-white focus:outline-none"
                        />
                        <span className="text-white/70">/ {max_page}</span>
                    </div>
                    {/* Next page */}
                    <button
                        type="button"
                        className="rounded-full border border-white/30 px-3 py-1 transition hover:border-white hover:bg-white hover:text-black"
                        onClick={() => next_page()}
                    >
                        &gt;
                    </button>
                </nav>
            </div>
        </div>
    );
}

export default Order_details;