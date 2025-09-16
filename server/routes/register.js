/*
# RMIT University Vietnam 
# Course: COSC2769 - Full Stack Development 
# Semester: 2025B 
# Assessment: Assignment 02 
# Author: Vu Luong Minh Triet
# ID: s3974712
*/



const express = require("express")
const multer = require("multer")
const bcrypt = require("bcrypt")
const { Users } = require("../data/data.js")
const { avatar_dir } = require("../data/image_dir.js")
const router = express.Router()

// Configure multer for avatar uploads
const upload = multer({
    dest: avatar_dir, // where uploaded files are stored
    fileFilter: (req, file, cb) => {
        // Only allow specific image types
        const allowed = ["image/png", "image/jpeg", "image/jpg", "image/avif", "image/webp"];
        allowed.includes(file.mimetype)
            ? cb(null, true)
            : cb(new Error("Only PNG, JPG, JPEG, AVIF allowed"));
    }
});

// Check if a username already exists
router.post("/get_user", async (request, response) => {
    try {
        const { username } = request.body
        const user = await Users.findOne({ username: username });
        // true if found, false otherwise
        if (user) {
            response.json({ status: true })
        }
        else {
            response.json({ status: false })
        }
    }
    // if there is error in fetching data, return status failed
    catch (err) {
        console.error("Fetch failed:", err)
        response.json({ status: "failed" })
    }
});

// Check if a business address already exists
router.post("/get_business_address", async (request, response) => {
    try {
        const { business_address } = request.body
        const user = await Users.findOne({ business_address: business_address });
        if (user) {
            response.json({ status: true })
        }
        else {
            response.json({ status: false })
        }
    }
    // if there is error in fetching data, return status failed
    catch (err) {
        console.error("Fetch failed:", err)
        response.json({ status: "failed" })
    }
})

// Check if a business name already exists
router.post("/get_business_name", async (request, response) => {
    try {
        const { business_name } = request.body
        const user = await Users.findOne({ business_name: business_name });
        if (user) {
            response.json({ status: true })
        }
        else {
            response.json({ status: false })
        }
    }
    // if there is error in fetching data, return status failed
    catch (err) {
        console.error("Fetch failed:", err)
        response.json({ status: "failed" })
    }
})

// Create a new user (Customer, Vendor, or Shipper)
router.post("/create_user", upload.single("avatar"), async (request, response) => {
    try {
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(request.body.password, 10)
        // Store avatar filename (multer saves it in avatar_dir with a generated name)
        const avatarStoredPath = request.file.filename
        // Create user depending on account type
        if (request.body.type === "Customer") {
            await Users.create({
                username: request.body.username,
                password: hashedPassword,
                name: request.body.name,
                address: request.body.address,
                account_type: request.body.type,
                avatar: avatarStoredPath,
                storage: {},
                distribution_hub: "",
                business_address: "",
                business_name: ""
            });
        }

        if (request.body.type === "Vendor") {
            await Users.create({
                username: request.body.username,
                password: hashedPassword,
                name: "",
                account_type: request.body.type,
                avatar: avatarStoredPath,
                storage: {},
                distribution_hub: "",
                business_address: request.body.business_address,
                business_name: request.body.business_name
            })
        }

        if (request.body.type === "Shipper") {
            await Users.create({
                username: request.body.username,
                password: hashedPassword,
                name: "",
                account_type: request.body.type,
                avatar: avatarStoredPath,
                storage: {},
                distribution_hub: request.body.distribution_hub,
                business_address: "",
                business_name: ""
            })
        }
        // Respond success after creating account
        response.json({ status: "success" });
    }
    // if there is error in fetching data, return status failed
    catch (err) {
        console.error("Fetch failed:", err)
        response.json({ status: "failed" })
    }
});

module.exports = router;