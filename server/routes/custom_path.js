/*
# RMIT University Vietnam 
# Course: COSC2769 - Full Stack Development 
# Semester: 2025B 
# Assessment: Assignment 02 
# Author: Vu Luong Minh Triet
# ID: s3974712
*/



const express = require("express")
const router = express.Router()

// Route: GET /api/custom_path/get_account_type
// Purpose: Return the current user's account type from the session
router.get("/get_account_type", async (request, response) => {
    try {
        // Get the account type stored in the session (set in server.js middleware)
        const account_type = request.session.account_type
        // Send back JSON response with the account type
        // Example: { type: "guest" } or { type: "Vendor" }
        response.json({ type: account_type, status: true })
    }
    catch (err) {
        console.error("Fetch failed:", err)
        response.json({ status: "failed" })
    }
})
module.exports = router