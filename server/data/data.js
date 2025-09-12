/*
# RMIT University Vietnam 
# Course: COSC2769 - Full Stack Development 
# Semester: 2025B 
# Assessment: Assignment 02 
# Author: Nguyen Thanh Dat
# ID: s4060872
*/



const mongoose = require("mongoose")

// --- User schema ---
// Stores login + profile data for all account types
// - "storage" is kept as a plain object (e.g., cart, saved data)
// - minimize:false ensures empty objects are saved as {} instead of being removed
const user_schema = new mongoose.Schema({
    username: String, // login username
    password: String, // hashed password
    avatar: String, // URL/path to profile avatar
    name: String, // display name
    address: String, // personal address (for customers)
    business_name: String, // vendor field
    business_address: String, // vendor field
    account_type: String, // "guest" | "customer" | "vendor" | "shipper"
    distribution_hub: String, // shipper’s assigned hub
    storage: Object // customer cart
}, { versionKey: false, minimize: false });

// --- Item schema ---
// Represents products in the store
const item_schema = new mongoose.Schema({
    name: String, // item name
    price: Number, // item price
    product_image: String, // store product image filename
    description: String, // Item description
    seller: String // vendor username 
}, { versionKey: false })

// --- Distribution hub schema ---
// Each hub is a separate collection
// - list: array of items/orders for that hub
// - customer_name: who placed the order
// - total_price: total price for the order
// - total_total_product: total number of products (all quantities combined)
const distribution_hub_schema = new mongoose.Schema({
    list: Array,
    customer_name: String,
    total_price: Number,
    total_total_product: Number
}, { versionKey: false })
// Each hub has its own collection; this is a design choice
const Users = mongoose.model("users", user_schema)
const Items = mongoose.model("items", item_schema)
const TPHCM = mongoose.model("tphcms", distribution_hub_schema)
const HANOI = mongoose.model("hanois", distribution_hub_schema)
const HAIPHONG = mongoose.model("haiphongs", distribution_hub_schema)
const NINHBINH = mongoose.model("ninhbinhs", distribution_hub_schema)
const TAYNINH = mongoose.model("tayninhs", distribution_hub_schema)
module.exports = { Users, Items, TPHCM, HANOI, HAIPHONG, NINHBINH, TAYNINH }