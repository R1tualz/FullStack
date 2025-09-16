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
import Failed_to_connect from "../../Not_found_page/resources/Failed_to_connect";
import Failed_to_fetch_data from "../../Not_found_page/resources/Failed_to_fetch_data";


function View_products_vendor() {
    const navigate = useNavigate()
    // Set error in case data fail to fetch
    const [error, set_error] = useState(null)
    // Set server error in case data fail to fetch
    const [server_error, set_server_error] = useState(null)
    // Track pagination state
    const [page, set_page] = useState(0) // current page number
    const [max_page, set_max_page] = useState(0) // total number of pages
    const [products_per_page, set_products_per_page] = useState([]) // visible products on current page
    // Ref to store full product list (does not trigger re-render like state would)
    const product_list = useRef([])
    // Handle page input change (user can type a page number manually)
    const handle_page_change = (e) => {
        const value = e.target.value
        if (!/^\d+$/.test(value)) { // must be number only
            return
        }
        const current_page = Number(value)
        if (current_page < 1 || current_page > max_page || current_page === page) {
            return; // invalid or same as current page
        }
        set_page(current_page)
    }
    // Go to next page
    const next_page = () => {
        if (page === max_page) {
            return
        }
        const current_page = page + 1
        set_page(current_page)
    }
    // Go to previous page
    const previous_page = () => {
        if (page === 1) {
            return
        }
        const current_page = page - 1
        set_page(current_page)
    }
    // Fetch vendor’s products on mount
    useEffect(() => {
        const get_data = async () => {
            try {
                const { data } = await axios.get("/api/vendor_features/get_user_product")
                if (data.status === "failed") {
                    set_server_error(true)
                    return
                }
                // Handle empty product list
                if (data.list.length === 0) {
                    set_max_page(0)
                    set_page(0)
                }
                else {
                    // Each page shows 10 products
                    set_max_page(Math.ceil(data.list.length / 10))
                    set_page(1)
                }
                product_list.current = data.list
            }
            catch (err) {
                console.error("Connection failed:", err)
                set_error(true)
            }
        }
        get_data()
    }, [])
    // Update the list of products shown when page changes
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
                {/* Page heading */}
                <header className="mb-8">
                    <h1 className="text-center text-3xl font-extrabold tracking-tight">
                        Products
                    </h1>

                </header>

                {/* If no products, show message. Otherwise, show paginated list */}
                {products_per_page.length === 0 ? (
                    <div className="flex h-64 items-center justify-center rounded-2xl border border-white/20">
                        <p className="text-sm text-white/70">No products to show.</p>
                    </div>
                ) : (
                    <section className="space-y-3">
                        {products_per_page.map((p) => (
                            <article
                                key={p._id}
                                className="group relative flex items-center gap-4 rounded-xl border border-white/15 bg-black/60 p-4 transition hover:shadow-[0_0_0_1px_#ffffff]"
                                onClick={() => navigate(`/view_my_product/${p._id}`)}
                            >
                                <div className="h-16 w-16 flex-none overflow-hidden rounded-lg border border-white/10 bg-black">
                                    {/* Thumbnail */}
                                    <img
                                        src={p.product_image}
                                        alt={p.name}
                                        className="h-full w-full object-cover"
                                        loading="lazy"
                                    />
                                </div>

                                {/* Product name + short description */}
                                <div className="min-w-0 flex-1">
                                    <h2 className="truncate text-base font-semibold">{p.name}</h2>
                                    {p.description && (
                                        <p className="mt-1 line-clamp-1 text-sm text-white/70">
                                            {p.description}
                                        </p>
                                    )}
                                </div>
                                {/* Price */}
                                <div className="flex w-[260px] flex-col items-end text-sm">
                                    <div className="flex items-center gap-3">
                                        <span className="text-white/60">Price</span>
                                        <span className="tabular-nums font-semibold text-white">
                                            ${p.price}
                                        </span>
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
                    {/* Previous button */}
                    <button
                        type="button"
                        className="rounded-full border border-white/40 px-3 py-1 transition hover:bg-white hover:text-black"
                        onClick={() => previous_page()}
                    >
                        &lt;
                    </button>
                    {/* Current page input */}
                    <div className="flex items-center gap-2">
                        <input
                            type="number"
                            value={page}
                            onChange={(e) => handle_page_change(e)}
                            className="w-12 rounded-md border border-white/40 bg-black/40 text-center text-sm font-semibold text-white focus:border-white focus:outline-none"
                        />
                        <span className="text-white/70">/ {max_page}</span>
                    </div>
                    {/* Next button */}
                    <button
                        type="button"
                        className="rounded-full border border-white/40 px-3 py-1 transition hover:bg-white hover:text-black"
                        onClick={() => next_page()}
                    >
                        &gt;
                    </button>
                </nav>
            </div>
        </div>
    );
}

export default View_products_vendor;
