/*
# RMIT University Vietnam 
# Course: COSC2769 - Full Stack Development 
# Semester: 2025B 
# Assessment: Assignment 02 
# Author: Nguyen Thanh Dat
# ID: s4060872
*/



const express = require("express")
const cors = require("cors")
const main = express()
const mongoose = require("mongoose")
const session = require("express-session")
// Route modules (split by feature area)
const register_route = require("./routes/register.js")
const login_route = require("./routes/login.js")
const custom_path_route = require("./routes/custom_path.js")
const my_account_route = require("./routes/my_account.js")
const vendor_features_route = require("./routes/vendor_features.js")
const customer_features_route = require("./routes/customer_features.js")
const shipper_features_route = require("./routes/shipper_features.js")
// Static asset directories (avatars & product images)
const { avatar_dir, item_image_dir } = require("./data/image_dir.js")
// --- Database connection (MongoDB Atlas) ---
mongoose.connect("mongodb+srv://Yuriana:dat15082005@mycluster.5ilcfie.mongodb.net/?retryWrites=true&w=majority&appName=MyCluster", { dbName: "Data" })

// --- Global middleware ---
// Serve static files (profile photos and product images)
main.use("/user_avatar", express.static(avatar_dir))
main.use("/product_image", express.static(item_image_dir))
// Parse incoming JSON bodies
main.use(express.json())
// CORS so the Vite/React app on localhost:5173 can call this server with cookies
main.use(cors({ origin: "http://localhost:5173", credentials: true, }))
// Session middleware (stores login state on server with a cookie on client)
// - rolling: refreshes expiration on each request
// - maxAge: 1 day
main.use(session({
    secret: "Yuriana", // used to sign the session ID cookie
    saveUninitialized: false, // don't create empty sessions
    resave: false, // don't save if unmodified
    rolling: true, // refresh cookie on every response
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
    }
}))
// Initialize default session for first-time visitors
// Set them as 'guest' so client routes can gate access consistently
main.use((req, _res, next) => {
    if (!req.session.account_type) {
        req.session.account_type = "guest"
        req.session.user = "guest"
    }
    next();
});
// --- Feature routes (mounted under /api/...) ---
// Order of these doesn't matter because paths don't overlap
main.use("/api/custom_path", custom_path_route)
main.use("/api/register", register_route)
main.use("/api/login", login_route)
main.use("/api/my_account", my_account_route)
main.use("/api/vendor_features", vendor_features_route)
main.use("/api/customer_features", customer_features_route)
main.use("/api/shipper_features", shipper_features_route)
// Catch-all for any other path → 404 text response
main.all("*", (request, response) => {
    response.status(404).send("Page not found !")
})
// Start HTTP server on port 5000
main.listen(5000, () => { console.log("Server is running !") })
