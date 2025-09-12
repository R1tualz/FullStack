/*
# RMIT University Vietnam 
# Course: COSC2769 - Full Stack Development 
# Semester: 2025B 
# Assessment: Assignment 02 
# Author: Nguyen Thanh Dat
# ID: s4060872
*/



const express = require("express")
const { Users, TPHCM, HANOI, HAIPHONG, NINHBINH, TAYNINH } = require("../data/data.js")
const mongoose = require("mongoose")
const router = express.Router()

// -----------------------------------------------------
// Fetch all active orders for the shipper's hub
// - Looks up current user by session
// - Chooses correct collection based on user.distribution_hub
// - Returns list of orders and hub info
// -----------------------------------------------------
router.get("/get_order", async (request, response) => {
    // get the current shipper
    const user = await Users.findOne({ username: request.session.user })
    let order
    // choose correct collection based on his distribution hub
    if (user.distribution_hub === "TPHCM") {
        order = await TPHCM.find({})
    }
    else if (user.distribution_hub === "HANOI") {
        order = await HANOI.find({})
    }
    else if (user.distribution_hub === "HAIPHONG") {
        order = await HAIPHONG.find({})
    }
    else if (user.distribution_hub === "NINHBINH") {
        order = await NINHBINH.find({})
    }
    else {
        order = await TAYNINH.find({})
    }
    response.json({ list: order, distribution_hub: user.distribution_hub })
})
// -----------------------------------------------------
// Fetch detailed info about a specific order
// - Validates order_id
// - Finds order in the correct hub collection
// - Normalizes product_image paths to full URLs
// -----------------------------------------------------
router.post("/get_order_details", async (request, response) => {
    // check if that ObjectID legit
    if (!mongoose.Types.ObjectId.isValid(request.body.order_id)) {
        return response.json({ status: false })
    }
    // get the current shipper
    const user = await Users.findOne({ username: request.session.user })
    let order
    // choose correct collection based on his distribution hub
    if (user.distribution_hub === "TPHCM") {
        order = await TPHCM.findOne({ _id: request.body.order_id })
    }
    else if (user.distribution_hub === "HANOI") {
        order = await HANOI.findOne({ _id: request.body.order_id })
    }
    else if (user.distribution_hub === "HAIPHONG") {
        order = await HAIPHONG.findOne({ _id: request.body.order_id })
    }
    else if (user.distribution_hub === "NINHBINH") {
        order = await NINHBINH.findOne({ _id: request.body.order_id })
    }
    else {
        order = await TAYNINH.findOne({ _id: request.body.order_id })
    }
    // check if the order existed
    if (!order) {
        return response.json({ status: false })
    }
    // Convert each product image filename → accessible URL
    for (i = 0; i < order.list.length; i++) {
        order.list[i].product_image = `http://localhost:5000/product_image/${encodeURIComponent(order.list[i].product_image)}`
    }
    response.json({ order_details: order, status: true })
})
// -----------------------------------------------------
// Fetch a single product inside an order
// - Validates both order_id (product_id1) and product_id (product_id2)
// - Finds order in hub collection, then loops through its list
// - Returns specific product with normalized image URL
// -----------------------------------------------------
router.post("/get_product_specific", async (request, response) => {
    // check if these ObjectID legit
    if (!mongoose.Types.ObjectId.isValid(request.body.product_id1) || !mongoose.Types.ObjectId.isValid(request.body.product_id2)) {
        return response.json({ status: false })
    }
    // find the current shipper
    const user = await Users.findOne({ username: request.session.user })
    // choose correct collection based on his distribution hub
    if (user.distribution_hub === "TPHCM") {
        product = await TPHCM.findOne({ _id: request.body.product_id1 })
    }
    else if (user.distribution_hub === "HANOI") {
        product = await HANOI.findOne({ _id: request.body.product_id1 })
    }
    else if (user.distribution_hub === "HAIPHONG") {
        product = await HAIPHONG.findOne({ _id: request.body.product_id1 })
    }
    else if (user.distribution_hub === "NINHBINH") {
        product = await NINHBINH.findOne({ _id: request.body.product_id1 })
    }
    else {
        product = await TAYNINH.findOne({ _id: request.body.product_id1 })
    }
    // check if the product list existed
    if (!product) {
        return response.json({ status: false })
    }
    else {
        // find the specific product in product list, if not exist, return false, otherwise return true
        product = product.list
        for (i = 0; i < product.length; i++) {
            if (product[i].product_id === request.body.product_id2) {
                const true_product = product[i]
                true_product.product_image = `http://localhost:5000/product_image/${encodeURIComponent(true_product.product_image)}`
                return response.json({ product: true_product, status: true })
            }
        }
        return response.json({ status: false })
    }
})

// -----------------------------------------------------
// - Deletes order from the correct hub collection
// - In current implementation, both "delivered" and "canceled" use this
// -----------------------------------------------------
router.post("/take_order", async (request, response) => {
    // get the current shipper
    const user = await Users.findOne({ username: request.session.user })
    // choose correct collection based on his distribution hub
    if (user.distribution_hub === "TPHCM") {
        await TPHCM.deleteOne({ _id: request.body.order_id })
    }
    else if (user.distribution_hub === "HANOI") {
        await HANOI.deleteOne({ _id: request.body.order_id })
    }
    else if (user.distribution_hub === "HAIPHONG") {
        await HAIPHONG.deleteOne({ _id: request.body.order_id })
    }
    else if (user.distribution_hub === "NINHBINH") {
        await NINHBINH.deleteOne({ _id: request.body.order_id })
    }
    else {
        await TAYNINH.deleteOne({ _id: request.body.order_id })
    }
    response.json({ status: true })
})

module.exports = router