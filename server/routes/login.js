/*
# RMIT University Vietnam 
# Course: COSC2769 - Full Stack Development 
# Semester: 2025B 
# Assessment: Assignment 02 
# Author: Vu Luong Minh Triet
# ID: s3974712
*/


const express = require("express")
const bcrypt = require("bcrypt")
const { Users } = require("../data/data.js")
const router = express.Router()

// Login route
router.post("/", async (request, response) => {
    try {
        // Extract username and password from the request body
        const { username, password } = request.body
        // Look up the user in the database by username
        const user = await Users.findOne({ username: username })
        if (!user) {
            // If user not found, return "status: false"
            response.status(200).json({ status: false })
            return
        }
        // Compare the provided password with the hashed password in the DB
        const is_match = await bcrypt.compare(password, user.password)
        if (!is_match) {
            // If password does not match, return "status: false"
            response.status(200).json({ status: false })
            return
        }
        // If login is successful, store account type and username in session
        request.session.account_type = user.account_type
        request.session.user = user.username
        // Send back success response
        response.status(200).json({ status: true })
    }
    catch (err) {
        console.error("Fetch failed:", err)
        response.json({ status: "failed" })
    }
})

module.exports = router