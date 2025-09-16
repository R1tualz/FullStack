/*
# RMIT University Vietnam 
# Course: COSC2769 - Full Stack Development 
# Semester: 2025B 
# Assessment: Assignment 02 
# Author: Nguyen Thanh Dat
# ID: s4060872
*/


const express = require("express")
const { Items, Users, TPHCM, HANOI, HAIPHONG, NINHBINH, TAYNINH } = require("../data/data.js")
const mongoose = require("mongoose")
const router = express.Router()

// -----------------------------------------------------
// Search & list products for customers
// - Supports min/max price filter
// - Optional keyword search (case-insensitive, OR across words)
// -----------------------------------------------------

router.post("/get_products", async (request, response) => {
    try {
        let query
        // If no max price provided → only use min price; else use both
        if (!request.body.max_price) {
            query = { price: { $gte: request.body.min_price } }
        }
        else {
            query = { price: { $gte: request.body.min_price, $lte: request.body.max_price } }
        }
        // If keywords exist, add OR conditions on product name (regex, case-insensitive)
        if (request.body.keywords.length !== 0) {
            query.$or = request.body.keywords.map(word => ({
                name: { $regex: word, $options: "i" }
            }));
        }
        // Query DB for items
        const item_list = await Items.find(query)
        // Provide URL for image
        for (i = 0; i < item_list.length; i++) {
            item_list[i].product_image = `http://localhost:5000/product_image/${encodeURIComponent(item_list[i].product_image)}`
        }
        response.json({ list: item_list, status: true })
    }
    catch (err) {
        console.error("Fetch failed:", err)
        response.json({ status: "failed" })
    }
})

// -----------------------------------------------------
// Get a single product by _id
// - Validates MongoDB ObjectId
// - Provide URL for image
// -----------------------------------------------------
router.post("/get_product_specific", async (request, response) => {
    try {
        // check if that ObjectId is valid
        if (!mongoose.Types.ObjectId.isValid(request.body.product_id)) {
            return response.json({ status: false }) // if not, return false
        }
        // fetch item from DB
        const item = await Items.findOne({ _id: request.body.product_id })
        // check if that item is existed
        if (!item) {
            return response.json({ status: false }) // if not, return false
        }
        // provide URL for image
        item.product_image = `http://localhost:5000/product_image/${encodeURIComponent(item.product_image)}`
        response.json({ name: item.name, price: item.price, image: item.product_image, description: item.description, status: true, seller: item.seller })
    }
    catch (err) {
        console.error("Fetch failed:", err)
        response.json({ status: "failed" })
    }
})

// -----------------------------------------------------
// Add a product to the logged-in customer's cart (stored in Users.storage)
// - Uses dynamic keys: storage.<productId>.*
// - Increments quantity by 1 if item already exists
// -----------------------------------------------------
router.post("/add_product_to_cart", async (request, response) => {
    try {
        // get product id
        const id = request.body.product_id
        // add product to customer cart and increase quantity if add same product
        await Users.updateOne({ username: request.session.user }, {
            $set: {
                [`storage.${id}.product_id`]: request.body.product_id,
                [`storage.${id}.name`]: request.body.name,
                [`storage.${id}.price`]: request.body.price,
                [`storage.${id}.product_image`]: request.body.product_image,
                [`storage.${id}.description`]: request.body.description,
                [`storage.${id}.seller`]: request.body.seller
            },
            $inc: {
                [`storage.${id}.quantity`]: 1
            }
        })
        response.json({ status: true })
    }
    catch (err) {
        console.error("Fetch failed:", err)
        response.json({ status: "failed" })
    }
})

// -----------------------------------------------------
// Get the current cart from Users.storage
// - Computes totals (per-item and overall)
// - Normalizes product_image URLs
// -----------------------------------------------------
router.get("/get_product_from_storage", async (request, response) => {
    try {
        const { storage } = await Users.findOne({ username: request.session.user })
        const list = []
        let total_price = 0
        let total_item = 0 // number of distinct products
        let total_total_item = 0 // sum of quantities across products
        Object.values(storage).forEach(value => {
            // Expand stored filename to full URL
            value.product_image = `http://localhost:5000/product_image/${encodeURIComponent(value.product_image)}`
            // Compute line total
            value.total_price = value.price * value.quantity
            total_price += value.total_price
            total_item++
            total_total_item += value.quantity
            list.push(value)
        })
        response.json({ list: list, total_price: total_price, total_item: total_item, total_total_item: total_total_item, status: true })
    }
    catch (err) {
        console.error("Fetch failed:", err)
        response.json({ status: "failed" })
    }
})

// -----------------------------------------------------
// Remove item(s) from cart
// - If remove_all = false → decrement quantity by 1 (or delete if it would hit 0)
// - If remove_all = true  → delete the item from storage
// -----------------------------------------------------
router.post("/remove_item_from_cart", async (request, response) => {
    try {
        // get product id
        const product_id = request.body.product_id
        // find cart storage of a specific user
        const { storage } = await Users.findOne({ username: request.session.user })
        if (!request.body.remove_all) {
            // Decrement quantity by 1; if it would reach 0, remove the entry
            if (storage[product_id].quantity === 1) {
                delete storage[product_id]
                await Users.updateOne({ username: request.session.user }, { $set: { storage } })
            }
            else {
                await Users.updateOne({ username: request.session.user }, {
                    $set: {
                        [`storage.${product_id}.product_id`]: request.body.product_id,
                        [`storage.${product_id}.name`]: request.body.name,
                        [`storage.${product_id}.price`]: request.body.price,
                        [`storage.${product_id}.product_image`]: request.body.product_image,
                        [`storage.${product_id}.description`]: request.body.description,
                        [`storage.${product_id}.seller`]: request.body.seller
                    },
                    $inc: {
                        [`storage.${product_id}.quantity`]: -1
                    }
                })
            }
        }
        else {
            // Remove all of this product from cart
            delete storage[product_id]
            await Users.updateOne({ username: request.session.user }, { $set: { storage } })
        }
        response.json({ status: true })
    }
    catch (err) {
        console.error("Fetch failed:", err)
        response.json({ status: "failed" })
    }
})

// -----------------------------------------------------
// Checkout: send cart to a distribution hub collection
// - Aggregates totals from Users.storage
// - Inserts a document into the selected hub (TPHCM, HANOI, ...)
// - Clears the user's cart afterwards
// -----------------------------------------------------
router.post("/send_data", async (request, response) => {
    try {
        const user = await Users.findOne({ username: request.session.user })
        const list = []
        let total_price_cart = 0
        let total_price_product
        let total_total_item = 0
        // Flatten storage into a list and compute totals
        Object.values(user.storage).forEach(value => {
            total_price_product = value.price * value.quantity
            total_price_cart += total_price_product
            total_total_item += value.quantity
            list.push(value)
        })
        // Insert the order into the correct hub collection based on selected hub
        if (request.body.distribution_hub === "TPHCM") {
            await TPHCM.create({
                list: list,
                total_price: total_price_cart,
                customer_name: user.name,
                total_total_product: total_total_item
            })
        }
        else if (request.body.distribution_hub === "HANOI") {
            await HANOI.create({
                list: list,
                total_price: total_price_cart,
                customer_name: user.name,
                total_total_product: total_total_item
            })
        }
        else if (request.body.distribution_hub === "HAIPHONG") {
            await HAIPHONG.create({
                list: list,
                total_price: total_price_cart,
                customer_name: user.name,
                total_total_product: total_total_item
            })
        }
        else if (request.body.distribution_hub === "NINHBINH") {
            await NINHBINH.create({
                list: list,
                total_price: total_price_cart,
                customer_name: user.name,
                total_total_product: total_total_item
            })
        }
        else {
            await TAYNINH.create({
                list: list,
                total_price: total_price_cart,
                customer_name: user.name,
                total_total_product: total_total_item
            })
        }
        // Clear the user's cart after creating the hub record
        await Users.updateOne({ username: request.session.user }, { $set: { storage: {} } })
        response.json({ status: true })
    }
    catch (err) {
        console.error("Fetch failed:", err)
        response.json({ status: "failed" })
    }
})
module.exports = router