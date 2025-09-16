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
import { useNavigate } from "react-router-dom"
import Failed_to_connect from "../../Not_found_page/resources/Failed_to_connect"
import Failed_to_fetch_data from "../../Not_found_page/resources/Failed_to_fetch_data"

function Active_orders() {

    const navigate = useNavigate()
    // Set error in case data fail to fetch
    const [error, set_error] = useState(null)
    // Set server error in case data fail to fetch
    const [server_error, set_server_error] = useState(null)
    // Pagination state
    const [page, set_page] = useState(0) // current page
    const [max_page, set_max_page] = useState(0) // total pages
    const [products_per_page, set_products_per_page] = useState([]) // visible orders on current page
    // Keep full list in a ref to avoid triggering re-renders when assigning
    const product_list = useRef([])
    // Human-friendly hub label (derived from server code)
    const [distribution_hub, set_distribution_hub] = useState("unknown")
    // --- Pagination: jump to a page typed by user ---
    const handle_page_change = (e) => {
        const value = e.target.value
        if (!/^\d+$/.test(value)) { // Must be a positive integer
            return
        }
        const current_page = Number(value)
        if (current_page < 1 || current_page > max_page || current_page === page) {
            return;
        }
        set_page(current_page)
    }
    // --- Pagination: go next page ---
    const next_page = () => {
        if (page === max_page) {
            return
        }
        const current_page = page + 1
        set_page(current_page)
    }
    // --- Pagination: go previous page ---
    const previous_page = () => {
        if (page === 1) {
            return
        }
        const current_page = page - 1
        set_page(current_page)
    }
    // --- Initial fetch: load orders + hub, then set up pagination (10 per page) ---
    useEffect(() => {
        const get_data = async () => {
            try {
                const { data } = await axios.get("/api/shipper_features/get_order")
                if (data.status === "failed") {
                    set_server_error(true)
                    return
                }
                product_list.current = data.list
                // Map backend hub codes to readable labels
                if (data.distribution_hub === "TPHCM") {
                    set_distribution_hub("HCM City")
                }
                else if (data.distribution_hub === "HANOI") {
                    set_distribution_hub("Ha Noi Capital")
                }
                else if (data.distribution_hub === "HAIPHONG") {
                    set_distribution_hub("Hai Phong")
                }
                else if (data.distribution_hub === "NINHBINH") {
                    set_distribution_hub("Ninh Binh")
                }
                else {
                    set_distribution_hub("Tay Ninh")
                }
                // Initialize pagination counts
                if (data.list.length === 0) {
                    set_max_page(0)
                    set_page(0)
                }
                else {
                    set_max_page(Math.ceil(data.list.length / 10))
                    set_page(1)
                }
            }
            catch (err) {
                console.error("Connection failed:", err)
                set_error(true)
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


    if (error) return <Failed_to_connect />
    if (server_error) return <Failed_to_fetch_data />

    return (
        <div className="min-h-screen bg-black text-white antialiased">
            <div className="mx-auto w-full max-w-6xl px-6 py-12">
                <header className="mb-8">
                    <h1 className="text-3xl font-extrabold tracking-tight text-center">
                        Active Orders
                    </h1>

                    {/* Total order + Distribution hub */}
                    <div className="mt-3 flex flex-col items-start gap-3">
                        <div className="rounded-lg border border-white/30 bg-black/40 px-4 py-2 text-sm font-semibold text-white">
                            <span className="mr-2 text-white/70">Total orders:</span>
                            <span>{product_list.current.length}</span>
                        </div>

                        <div className="rounded-lg border border-white/30 bg-black/40 px-4 py-2 text-sm font-semibold text-white">
                            <span className="mr-2 text-white/70">Distribution hub:</span>
                            <span>{distribution_hub}</span>
                        </div>
                    </div>
                </header>
                {/* Empty state vs. list of orders (paginated) */}
                {products_per_page.length === 0 ? (
                    <div className="flex h-64 items-center justify-center rounded-2xl border border-white/20">
                        <p className="text-sm text-white/70">No products to show.</p>
                    </div>
                ) : (
                    <section className="space-y-3">
                        {products_per_page.map((item) => (
                            <article
                                key={item._id}
                                className="flex flex-col rounded-xl border border-white/30 bg-black/60 p-4 transition hover:border-white"
                                onClick={() => navigate(`/order/${item._id}`)}
                            >
                                <h2 className="text-base font-semibold">#{item._id}</h2>
                                <p className="mt-1 text-sm text-white/70">
                                    Customer: {item.customer_name ?? "Anonymous"}
                                </p>
                            </article>
                        ))}
                    </section>
                )}
                {/* Pagination controls */}
                <nav
                    aria-label="Pagination"
                    className="mt-10 flex items-center justify-center gap-4 text-sm"
                >
                    {/* Go to previous page */}
                    <button
                        type="button"
                        className="rounded-full border border-white/30 px-3 py-1 transition hover:border-white hover:bg-white hover:text-black"
                        onClick={() => previous_page()}
                    >
                        &lt;
                    </button>
                    <div className="flex items-center gap-2">
                        {/* Custom page input */}
                        <input
                            type="number"
                            value={page}
                            onChange={(e) => handle_page_change(e)}
                            className="w-14 rounded-md border border-white/30 bg-black/40 text-center text-sm font-semibold text-white focus:border-white focus:outline-none"
                        />
                        <span className="text-white/70">/ {max_page}</span>
                    </div>
                    {/* Go to next page */}
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

export default Active_orders;