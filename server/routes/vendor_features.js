/*
# RMIT University Vietnam 
# Course: COSC2769 - Full Stack Development 
# Semester: 2025B 
# Assessment: Assignment 02 
# Author: Nguyen Thanh Dat
# ID: s4060872
*/



const express = require("express")
const multer = require("multer")
const { Items } = require("../data/data.js")
const mongoose = require("mongoose")
const { item_image_dir } = require("../data/image_dir.js")
const router = express.Router()

// -----------------------------------------------------
// Multer config for product image uploads
// - Stores uploaded files into `item_image_dir`
// - Restricts file types to common image formats
// -----------------------------------------------------
const upload = multer({
    dest: item_image_dir,
    fileFilter: (req, file, cb) => {
        const allowed = ["image/png", "image/jpeg", "image/jpg", "image/avif", "image/webp"];
        allowed.includes(file.mimetype)
            ? cb(null, true)
            : cb(new Error("Only PNG, JPG, JPEG, AVIF allowed"));
    }
})

// -----------------------------------------------------
// Add a new product (Vendor only)
// - Saves name, price, description, and uploaded image filename
// - Associates product with current session user (seller)
// -----------------------------------------------------
router.post("/add_product", upload.single("image"), async (request, response) => {
    try {
        // get item information
        const { name, price, description } = request.body
        // create new item
        await Items.create({
            name: name, // item name
            price: price, // item price
            description: description, // item description
            product_image: request.file.filename, // just filename stored in DB
            seller: request.session.user // vendor username from session
        })
        response.json({ status: "success" })
    }
    catch (err) {
        console.error("Fetch failed:", err)
        response.json({ status: "failed" })
    }
})

// -----------------------------------------------------
// Check if product with same name already exists for this seller
// - Prevents duplicate product names per vendor
// -----------------------------------------------------

router.post("/check_product", async (request, response) => {
    try {
        const product_exist = await Items.findOne({ seller: request.session.user, name: request.body.product_name })
        if (product_exist) {
            return response.json({ status: false }) // product already exists
        }
        return response.json({ status: true }) // product is unique
    }
    catch (err) {
        console.error("Fetch failed:", err)
        response.json({ status: "failed" })
    }
})

// -----------------------------------------------------
// Get all products created by the current vendor
// - Normalizes stored filenames into full URLs
// -----------------------------------------------------
router.get("/get_user_product", async (request, response) => {
    try {
        // Get all products that have been created by the current vendor
        const item_list = await Items.find({ seller: request.session.user })
        // Convert each stored image filename → accessible URL
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
// Get specific product details by product_id
// - Validates MongoDB ObjectId
// - Returns {name, price, description, image}
// - Normalizes product_image to URL
// -----------------------------------------------------
router.post("/get_user_product_specific", async (request, response) => {
    try {
        // Check if that objectId valid
        if (!mongoose.Types.ObjectId.isValid(request.body.product_id)) {
            return response.json({ status: false })
        }
        // get item from DB
        const item = await Items.findOne({ _id: request.body.product_id })
        // Check if that item existed
        if (!item) {
            return response.json({ status: false })
        }
        // Replace filename with URL
        item.product_image = `http://localhost:5000/product_image/${encodeURIComponent(item.product_image)}`
        response.json({ name: item.name, price: item.price, image: item.product_image, description: item.description, status: true })
    }
    catch (err) {
        console.error("Fetch failed:", err)
        response.json({ status: "failed" })
    }
})

module.exports = router