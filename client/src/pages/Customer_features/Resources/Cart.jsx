/*
# RMIT University Vietnam 
# Course: COSC2769 - Full Stack Development 
# Semester: 2025B 
# Assessment: Assignment 02 
# Author: On Tuan Huy
# ID: s4028018
*/

import axios from "axios"
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {
    const navigate = useNavigate()
    // Pagination state
    const [page, set_page] = useState(0)
    const [max_page, set_max_page] = useState(0)
    // Cart totals (kinds of items, total quantity, total price)
    const [total_item, set_total_item] = useState(0)
    const [total_total_item, set_total_total_item] = useState(0)
    const [total_price, set_total_price] = useState(0)
    // Slice of products for the current page
    const [products_per_page, set_products_per_page] = useState([])
    // Banner at top of page (text + color class)
    const [notification, set_notification] = useState(["Your Cart", "text-white"])
    // Full cart list stored in a ref (avoids re-renders when mutated)
    const product_list = useRef([])
    // ---- Pagination: jump to a specific page (from input) ----
    const handle_page_change = (e) => {
        const value = e.target.value
        if (!/^\d+$/.test(value)) { // only allow digits
            return
        }
        const current_page = Number(value)
        // ignore invalid page numbers or same page
        if (current_page < 1 || current_page > max_page || current_page === page) {
            return;
        }
        set_page(current_page)
    }
    // ---- Pagination: next page ----
    const next_page = () => {
        if (page === max_page) {
            return
        }
        const current_page = page + 1
        set_page(current_page)
    }
    // ---- Pagination: previous page ----
    const previous_page = () => {
        if (page === 1) {
            return
        }
        const current_page = page - 1
        set_page(current_page)
    }
    // ---- Place order handler ----
    const handle_order = async () => {
        const distribution_hub = document.getElementById("choose_hub").value
        // Require a hub selection
        if (distribution_hub === "") {
            set_notification(["Please Choose Your Hub", "text-red-400"])
            return
        }
        // Cart must not be empty
        else if (product_list.current.length === 0) {
            set_notification(["Your Cart Is Empty", "text-red-400"])
            return
        }
        // Send order to backend then navigate home
        set_notification(["Sending Order...", "text-green-400"])
        await axios.post("/api/customer_features/send_data", { distribution_hub: distribution_hub })
        setTimeout(() => navigate("/"), 1000)
    }
    // ---- Initial fetch: load cart items & totals ----
    useEffect(() => {
        const get_data = async () => {
            const { data } = await axios.get("/api/customer_features/get_product_from_storage")
            // Save raw list for pagination slicing
            product_list.current = data.list
            // Update totals
            set_total_item(data.total_item)
            set_total_price(data.total_price)
            set_total_total_item(data.total_total_item)
            // Setup pagination (10 items per page)
            if (data.list.length === 0) {
                set_max_page(0)
                set_page(0)
            }
            else {
                set_max_page(Math.ceil(data.list.length / 10))
                set_page(1)
            }
        }
        get_data()
    }, [])
    // ---- When page changes, compute visible slice ----
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
                {/* Heading + actions + totals + hub select */}
                <header className="mb-8">
                    <h1 className={`text-3xl font-extrabold tracking-tight text-center ${notification[1]}`}>{notification[0]}</h1>

                    <div className="mt-3 flex flex-col items-start gap-3">
                        {/* Submit order */}
                        <button
                            type="button"
                            className="rounded-lg border border-green-400  px-4 py-2 text-sm font-medium text-green-400 transition hover:bg-green-400 hover:text-white"
                            onClick={() => handle_order()}
                        >
                            Order
                        </button>
                        {/* Totals display */}
                        <div className="rounded-lg border border-white/30 bg-black/40 px-4 py-2 text-sm font-semibold text-white">
                            <span className="mr-2 text-white/70">Total Kind Of Items:</span>
                            <span>{total_item}</span>
                        </div>

                        <div className="rounded-lg border border-white/30 bg-black/40 px-4 py-2 text-sm font-semibold text-white">
                            <span className="mr-2 text-white/70">Total Items:</span>
                            <span>{total_total_item}</span>
                        </div>

                        <div className="rounded-lg border border-white/30 bg-black/40 px-4 py-2 text-sm font-semibold text-white">
                            <span className="mr-2 text-white/70">Total Price:</span>
                            <span>${total_price}</span>
                        </div>
                        {/* Hub selector (required before ordering) */}
                        <select
                            defaultValue=""
                            className="w-64 rounded-xl border border-white/20 bg-black/60 px-3 py-2 text-sm text-white outline-none transition focus:border-white/40 focus:bg-black/70"
                            id="choose_hub"
                        >
                            <option value="" disabled>
                                Choose distribution hub
                            </option>
                            <option value="TPHCM" className="bg-black text-white">TPHCM</option>
                            <option value="HANOI" className="bg-black text-white">HA NOI</option>
                            <option value="HAIPHONG" className="bg-black text-white">HAI PHONG</option>
                            <option value="NINHBINH" className="bg-black text-white">NINH BINH</option>
                            <option value="TAYNINH" className="bg-black text-white">TAY NINH</option>
                        </select>
                    </div>
                </header>
                {/* Empty state and list */}
                {products_per_page.length === 0 ? (
                    <div className="flex h-64 items-center justify-center rounded-2xl border border-white/20">
                        <p className="text-sm text-white/70">No products to show.</p>
                    </div>
                ) : (
                    < section className="space-y-3">
                        {products_per_page.map((item) => (
                            <article
                                onClick={() => { navigate(`/cart/${item.product_id}`) }}
                                key={item.product_id}
                                className="group relative flex items-center gap-4 rounded-xl border border-white/15 bg-black/60 p-4 transition hover:shadow-[0_0_0_1px_#ffffff]"
                            >
                                {/* Thumbnail */}
                                <div className="h-16 w-16 flex-none overflow-hidden rounded-lg border border-white/10 bg-black">
                                    <img src={item.product_image} alt={item.name} className="h-full w-full object-cover" loading="lazy" />
                                </div>
                                {/* Name, price, seller */}
                                <div className="min-w-0 flex-1">
                                    <h2 className="truncate text-base font-semibold">{item.name}</h2>

                                    <p className="mt-1 text-sm text-white/70">
                                        Price: <span className="font-medium text-white">${item.price}</span>
                                    </p>

                                    <p className="truncate text-xs text-white/50">
                                        <span className="font-medium">{item.seller}</span>
                                    </p>
                                </div>
                                {/* Quantity + per-line total */}
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
                <nav aria-label="Pagination" className="mt-10 flex items-center justify-center gap-4 text-sm">
                    <button type="button" className="rounded-full border border-white/40 px-3 py-1 transition hover:bg-white hover:text-black" onClick={() => previous_page()}> {/* Go to previous page */}
                        &lt;
                    </button>
                    <div className="flex items-center gap-2">
                        {/* custom page input */}
                        <input
                            type="number"
                            value={page}
                            onChange={(e) => handle_page_change(e)}
                            className="w-12 rounded-md border border-white/40 bg-black/40 text-center text-sm font-semibold text-white focus:border-white focus:outline-none"
                        />
                        <span className="text-white/70">/ {max_page}</span>
                    </div>
                    <button type="button" className="rounded-full border border-white/40 px-3 py-1 transition hover:bg-white hover:text-black" onClick={() => next_page()}> {/* Go to next page */}
                        &gt;
                    </button>
                </nav>
            </div>
        </div >
    );
}

export default Cart;
