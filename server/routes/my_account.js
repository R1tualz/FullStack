/*
# RMIT University Vietnam 
# Course: COSC2769 - Full Stack Development 
# Semester: 2025B 
# Assessment: Assignment 02 
# Author: Vu Luong Minh Triet
# ID: s3974712
*/



const express = require("express")
const { Users } = require("../data/data.js")
const multer = require("multer")
const { avatar_dir, image_dir } = require("../data/image_dir.js")
const path = require("path")
const fs = require("fs")
const router = express.Router()

// Multer config: store uploaded files in avatar_dir and only allow image formats
const upload = multer({
    dest: avatar_dir,
    fileFilter: (req, file, cb) => {
        const allowed = ["image/png", "image/jpeg", "image/jpg", "image/avif", "image/webp"];
        allowed.includes(file.mimetype)
            ? cb(null, true) // valid file → accept
            : cb(new Error("Only PNG, JPG, JPEG, AVIF allowed")); // invalid → reject
    }
})

// Get user info (depends on account type)
router.get("/get_user", async (request, response) => {
    const user = request.session.user // current logged-in user from session
    const user_data = await Users.findOne({ username: user }) // fetch from DB
    const avatar_filename = user_data.avatar
    const avatarUrl = `http://localhost:5000/user_avatar/${encodeURIComponent(avatar_filename)}`
    // Return different fields depending on account type
    if (request.session.account_type === "Customer") {
        response.status(200).json({ username: user_data.username, avatar: avatarUrl, name: user_data.name, address: user_data.address, account_type: user_data.account_type })
    }
    else if (request.session.account_type === "Shipper") {
        response.status(200).json({ username: user_data.username, avatar: avatarUrl, distribution_hub: user_data.distribution_hub, account_type: user_data.account_type })
    }
    else { // Vendor
        response.status(200).json({ username: user_data.username, avatar: avatarUrl, business_name: user_data.business_name, account_type: user_data.account_type, business_address: user_data.business_address })
    }
})

// Change avatar
router.put("/change_avatar", upload.single("avatar"), async (request, response) => {
    const user = request.session.user
    const user_data = await Users.findOne({ username: user })
    // Current avatar file
    const avatar_filename = user_data.avatar
    const avatar_address = path.join(avatar_dir, avatar_filename)
    // Update DB with new avatar filename
    await Users.updateOne({ username: user_data.username }, { $set: { avatar: request.file.filename } })
    // Delete old avatar file from storage
    fs.unlinkSync(avatar_address)
    response.status(200).json({ status: "success" })
})

// Log out user (reset session to guest)
router.get("/log_out", (request, response) => {
    request.session.user = "guest"
    request.session.account_type = "guest"
    response.status(200).json({ status: "success" })
})

module.exports = router