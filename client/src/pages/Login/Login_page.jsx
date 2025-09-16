/*
# RMIT University Vietnam 
# Course: COSC2769 - Full Stack Development 
# Semester: 2025B 
# Assessment: Assignment 02 
# Author: Vu Luong Minh Triet
# ID: s3974712
*/



import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Failed_to_connect from "../Not_found_page/resources/Failed_to_connect";
import Failed_to_fetch_data from "../Not_found_page/resources/Failed_to_fetch_data";
import axios from "axios";

function Login_page() {
    const navigate = useNavigate()
    // State for showing feedback to the user
    const [notification, set_notification] = useState("") // error text (e.g. "wrong password")
    const [announcement, set_announcement] = useState(["Login", "text-white"])
    // announcement[0] → heading text
    // announcement[1] → heading color class
    // Set error in case data fail to fetch
    const [error, set_error] = useState(null)
    // Set server error in case data fail to fetch
    const [server_error, set_server_error] = useState(null)
    // Handle login attempt
    const validation = async (e) => {
        e.preventDefault()
        // Grab form input values
        const username = document.getElementById("username").value
        const password = document.getElementById("password").value
        try {
            const get_user = await axios.post("/api/login", { username: username, password: password })
            if (get_user.data.status === "failed") {
                set_server_error(true)
                return
            }
            if (get_user.data.status) {
                set_announcement(["Login successful !", "text-green-300"]) // show success
                set_notification("") // clear error if have
                setTimeout(() => navigate("/"), 1000) // redirect to home page
            }
            else {
                set_announcement(["Login", "text-white"])
                set_notification("Username or password incorrect !")
                // announcement[0] → text (e.g. "Login successful !")
                // announcement[1] → CSS class to change heading color
            }
        }
        catch (err) {
            console.error("Connection failed:", err)
            set_error(true)
        }
    }

    if (error) return <Failed_to_connect />
    if (server_error) return <Failed_to_fetch_data />

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
            <div className="w-full max-w-sm px-6">
                {/* Heading (changes to green if login successful) */}
                <h1 className={`text-3xl font-bold text-center mb-8 ${announcement[1]}`}>{announcement[0]}</h1>

                <form className="space-y-4">
                    <p className="text-red-400">{notification || "\u00A0"}</p>
                    {/* Username input */}
                    <input
                        placeholder="Username"
                        type="text"
                        id="username"
                        className="w-full px-4 py-2 rounded-lg
                                   bg-transparent text-white placeholder-white
                                   border border-gray-400 outline-none"
                    />
                    {/* Password input */}
                    <input
                        placeholder="Password"
                        type="password"
                        id="password"
                        className="w-full px-4 py-2 rounded-lg
                                   bg-transparent text-white placeholder-white
                                   border border-gray-400 outline-none"
                    />
                    {/* Submit button (triggers validation) */}
                    <button
                        type="submit"
                        className="w-full py-2 rounded-lg border border-green-400 text-green-400 bg-transparent
                                   font-semibold tracking-wide transition duration-300
                                   hover:bg-green-400 hover:text-white" onClick={(e) => validation(e)}
                    >
                        Login
                    </button>
                </form>
                {/* Navigation to register pages */}
                <div className="mt-6 space-y-2">
                    <button className="w-full py-2 rounded-lg border border-gray-700 text-gray-500 bg-transparent transition duration-300 hover:bg-white hover:text-black" onClick={() => navigate("/register/as_vendor")}>
                        Register as Vendor
                    </button>
                    <button className="w-full py-2 rounded-lg border border-gray-700 text-gray-500 bg-transparent transition duration-300 hover:bg-white hover:text-black" onClick={() => navigate("/register/as_customer")}>
                        Register as Customer
                    </button>
                    <button className="w-full py-2 rounded-lg border border-gray-700 text-gray-500 bg-transparent transition duration-300 hover:bg-white hover:text-black" onClick={() => navigate("/register/as_shipper")}>
                        Register as Shipper
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login_page
