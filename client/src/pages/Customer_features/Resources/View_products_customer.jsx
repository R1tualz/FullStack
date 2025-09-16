/*
# RMIT University Vietnam 
# Course: COSC2769 - Full Stack Development 
# Semester: 2025B 
# Assessment: Assignment 02 
# Author: On Tuan Huy
# ID: s4028018
*/


import { Search, ShoppingCart } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import Failed_to_connect from "../../Not_found_page/resources/Failed_to_connect"
import Failed_to_fetch_data from "../../Not_found_page/resources/Failed_to_fetch_data"
import axios from "axios"

function View_products_customer() {
    const navigate = useNavigate()
    // Set error in case data fail to fetch
    const [error, set_error] = useState(null)
    // Set server error in case data fail to fetch
    const [server_error, set_server_error] = useState(null)
    // Pagination state
    const [page, set_page] = useState(0)
    const [max_page, set_max_page] = useState(0)
    const [products_per_page, set_products_per_page] = useState([])
    // Data + search state
    const [products_list, set_products_list] = useState(null)
    const [search_content, set_search_content] = useState([])
    // Price range references
    const minimum = useRef(1)
    const maximum = useRef(null)
    // Notifications for input errors (shown via placeholders)
    const [min_price_notification, set_min_price_notification] = useState(["Min Price", "placeholder-white/40"])
    const [max_price_notification, set_max_price_notification] = useState(["Max Price", "placeholder-white/40"])
    // ----- Pagination handlers -----
    // Handle Page input
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
    // go to next page
    const next_page = () => {
        if (page === max_page) {
            return
        }
        const current_page = page + 1
        set_page(current_page)
    }
    // go to previous page
    const previous_page = () => {
        if (page === 1) {
            return
        }
        const current_page = page - 1
        set_page(current_page)
    }

    // ----- Search logic -----
    const get_search_content = () => {
        const keywords = document.getElementById("search_content").value.trim().split(/\s+/) // get search content
        const min_price = document.getElementById("min_price").value // get min price
        const max_price = document.getElementById("max_price").value // get max price
        // Validate min price
        if (min_price === "") { // if empty -> 1
            minimum.current = 1
            set_min_price_notification(["Min Price", "placeholder-white/40"])
        }
        else if (!/^[+-]?\d+(\.\d+)?$/.test(min_price)) { // must be a real number (eg : 5, -5 or 2.5)
            minimum.current = 1
            document.getElementById("min_price").value = ""
            set_min_price_notification(["Min price should only includes real number !", "placeholder-red-400"])
        }
        else if (Number(min_price) <= 0) { // must be a positive number
            minimum.current = 1
            document.getElementById("min_price").value = ""
            set_min_price_notification(["Min price should be larger than 0 !", "placeholder-red-400"])
        }
        else {
            minimum.current = Number(min_price) // convert string to number
            set_min_price_notification(["Min Price", "placeholder-white/40"])
        }
        // Validate max price
        if (max_price === "") { // if empty -> no max limit
            maximum.current = null
            set_max_price_notification(["Max Price", "placeholder-white/40"])
        }
        else if (!/^[+-]?\d+(\.\d+)?$/.test(max_price)) { // must be a real number (eg : 5, -5 or 2.5)
            maximum.current = null
            document.getElementById("max_price").value = ""
            set_max_price_notification(["Max price should only includes real number !", "placeholder-red-400"])
        }
        else if (Number(max_price) <= 1) { // must be larger than 1
            maximum.current = null
            document.getElementById("max_price").value = ""
            set_max_price_notification(["Max price should be larger than 1 !", "placeholder-red-400"])
        }
        else if (Number(max_price) <= minimum.current) { // must be larger than min price
            maximum.current = null
            document.getElementById("max_price").value = ""
            set_max_price_notification(["Max price should be larger than min price !", "placeholder-red-400"])
        }
        else {
            maximum.current = Number(max_price) // convert string to number
            set_max_price_notification(["Max Price", "placeholder-white/40"])
        }
        // Normalize search text
        document.getElementById("search_content").value = document.getElementById("search_content").value.replace(/\s+/g, " ").trim()
        if (keywords[0].length === 0) {
            set_search_content([])
        }
        else {
            set_search_content(keywords)
        }
    }
    // ----- Fetch products when search changes -----
    useEffect(() => {
        const get_data = async () => {
            try {
                // fetch data from api
                const { data } = await axios.post("/api/customer_features/get_products", { keywords: search_content, min_price: minimum.current, max_price: maximum.current })
                if (data.status === "failed") {
                    set_server_error(true)
                    return
                }
                // if there is nothing, set page and max page to 0
                if (data.list.length === 0) {
                    set_max_page(0)
                    set_page(0)
                }
                // set page to 1 and max page to enough to show all items in page of 6 format
                else {
                    set_max_page(Math.ceil(data.list.length / 6))
                    set_page(1)
                }
                // set total products
                set_products_list(data.list)
            }
            catch (err) {
                console.error("Connection failed:", err)
                set_error(true)
            }
        }
        get_data()
    }, [search_content])
    // ----- Slice product list by current page -----
    useEffect(() => {
        if (!products_list || page === -1) {
            return
        }
        const start_point = (page - 1) * 6
        const page_content = products_list.slice(start_point, start_point + 6)
        set_products_per_page(page_content)
    }, [page, products_list])

    if (error) return <Failed_to_connect />
    if (server_error) return <Failed_to_fetch_data />

    return (
        <div className="min-h-screen bg-black text-white antialiased">
            <div className="mx-auto w-full max-w-6xl px-6 py-12">

                <header className="mb-12">
                    {/* Heading */}
                    <h1 className="text-3xl font-extrabold tracking-tight mb-6 text-center">
                        View Products
                    </h1>

                    {/* Cart button */}
                    <div className="mb-4 flex justify-start">
                        <button
                            type="button"
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-green-400 px-4 py-2 text-sm font-medium text-green-400 hover:bg-green-400 hover:text-white transition"
                            onClick={() => navigate("/cart")}
                        >
                            <ShoppingCart className="h-4 w-4" />
                            Go to Cart
                        </button>
                    </div>

                    {/* Price filters */}
                    <div className="mb-6 flex flex-col gap-3 max-w-xs">
                        <input
                            id="min_price"
                            type="text"
                            placeholder={min_price_notification[0]}
                            className={`w-full rounded-xl border border-white/20 bg-black/60 py-2.5 px-4 text-sm text-white ${min_price_notification[1]} outline-none transition focus:border-white/40 focus:bg-black/70`}
                        />
                        <input
                            id="max_price"
                            type="text"
                            placeholder={max_price_notification[0]}
                            className={`w-full rounded-xl border border-white/20 bg-black/60 py-2.5 px-4 text-sm text-white ${max_price_notification[1]} outline-none transition focus:border-white/40 focus:bg-black/70`}
                        />
                    </div>

                    {/* Search bar */}
                    <div
                        className="relative w-full"
                        role="search"
                        aria-label="Search products"
                    >
                        <span
                            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2"
                            aria-hidden
                        >
                            <Search className="h-5 w-5 text-white/60" />
                        </span>

                        <input
                            id="search_content"
                            type="search"
                            placeholder="Search products…"
                            className="w-full rounded-xl border border-white/20 bg-black/60 py-2.5 pl-10 pr-24 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-white/40 focus:bg-black/70"
                            autoComplete="off"
                        />

                        <button
                            type="button"
                            aria-label="Search"
                            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg border border-white/20 bg-black/40 px-3 py-1.5 text-xs text-white/80 hover:bg-white hover:text-black"
                            onClick={() => get_search_content()}
                        >
                            Search
                        </button>
                    </div>
                </header>

                {/* Show products and empty state */}
                {/* Empty state */}
                {products_per_page.length === 0 ? (
                    <div className="flex h-64 items-center justify-center rounded-2xl border border-white/20">
                        <p className="text-sm text-white/70">No products to show.</p>
                    </div>
                ) : (
                    <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {/* Show products */}
                        {products_per_page.map((p) => (
                            <article
                                key={p._id}
                                className="group relative overflow-hidden rounded-2xl border border-white bg-black/60 transition hover:shadow-[0_0_0_1px_#fff]"
                                onClick={() => navigate(`/view_products/${p._id}`)}
                            >
                                {/* Image */}
                                <div className="aspect-[4/3] w-full overflow-hidden border-b border-white/20 bg-black">
                                    <img
                                        src={p.product_image}
                                        alt={p.name}
                                        className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                                        loading="lazy"
                                    />
                                </div>

                                {/* Info */}
                                <div className="p-5">
                                    <span className="block text-sm font-medium text-white/70">${p.price}</span>
                                    <div className="flex items-center justify-between gap-2">
                                        <h2 className="text-lg font-semibold leading-tight line-clamp-2">
                                            {p.name}
                                        </h2>
                                        <span className="text-sm text-white/60">{p.seller}</span>
                                    </div>

                                    {p.description && (
                                        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/85">
                                            {p.description}
                                        </p>
                                    )}
                                </div>
                            </article>
                        ))}
                    </section>
                )}
                {/* Pagination */}
                <nav aria-label="Pagination" className="mt-10 flex items-center justify-center gap-4 text-sm">
                    {/* Go to previous page button */}
                    <button
                        type="button"
                        className="rounded-full border border-white/40 px-3 py-1 transition hover:bg-white hover:text-black"
                        onClick={() => previous_page()}
                    >
                        &lt;
                    </button>
                    {/* custom page input */}
                    <div className="flex items-center gap-2">
                        <input
                            type="number"
                            value={page}
                            onChange={(e) => handle_page_change(e)}
                            className="w-12 rounded-md border border-white/40 bg-black/40 text-center text-sm font-semibold text-white focus:border-white focus:outline-none"
                        />
                        <span className="text-white/70">/ {max_page}</span>
                    </div>
                    {/* Go to next page button */}
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
    )
}

export default View_products_customer