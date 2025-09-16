/*
# RMIT University Vietnam 
# Course: COSC2769 - Full Stack Development 
# Semester: 2025B 
# Assessment: Assignment 02 
# Author: Vu Luong Minh Triet
# ID: s3974712
*/


import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Failed_to_connect from "../Not_found_page/resources/Failed_to_connect";
import Failed_to_fetch_data from "../Not_found_page/resources/Failed_to_fetch_data";
import axios from "axios";

function Register_as_customer_page() {
    const navigate = useNavigate()
    // Avatar preview URL (default is initials avatar from Dicebear)
    const [avatarUrl, setAvatarUrl] = useState("https://api.dicebear.com/9.x/initials/svg?seed=Customer");
    const [avatarFile, setAvatarFile] = useState(null);
    // Set error in case data fail to fetch
    const [error, set_error] = useState(null)
    // Set server error in case data fail to fetch
    const [server_error, set_server_error] = useState(null)
    // Validation states for inputs
    const [avatar_validation, set_avatar_validation] = useState(["Profile Photo", "text-white"]);
    const [username_validation, set_username_validation] = useState(["", "text-white"]);
    const [password_validation, set_password_validation] = useState(["", "text-white"]);
    const [name_validation, set_name_validation] = useState(["", "text-white"]);
    const [address_validation, set_address_validation] = useState(["", "text-white"]);
    // Announcement at the top (changes to success message if registration passes)
    const [announcement, set_announcement] = useState(["Register as Customer", "text-white"]);
    // Ref to manage object URL memory cleanup
    const objectUrlRef = useRef(null);
    // Handle avatar upload & preview
    const onAvatarChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        // Only allow image files
        if (!file.type.startsWith("image/")) {
            set_avatar_validation(["Please choose an image file.", "text-red-400"]);
            return;
        }
        // Generate temporary preview URL
        setAvatarFile(file);
        if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
        const preview = URL.createObjectURL(file);
        objectUrlRef.current = preview;
        setAvatarUrl(preview);
        set_avatar_validation(["Profile Photo", "text-white"]);
    };
    // Cleanup temporary object URLs when component unmounts
    useEffect(() => {
        return () => {
            if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
        };
    }, []);
    // Form submission handler
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            // Grab values from form
            const username = document.getElementById("username").value.trim();
            const password = document.getElementById("password").value;
            const name = document.getElementById("name").value.trim();
            const address = document.getElementById("address").value.trim();
            // Check if username already exists
            const username_exist = await axios.post("/api/register/get_user", { username: username })
            if (username_exist.data.status === "failed") {
                set_server_error(true)
                return
            }
            let status = true; // tracks overall form validity
            // Validate avatar
            if (!avatarFile) {
                set_avatar_validation(["No avatar found !", "text-red-400"]);
                status = false;
            } else {
                set_avatar_validation(["Profile Photo", "text-white"]);
            }
            // Validate username
            if (username.length < 8 || username.length > 15) {
                set_username_validation(["Your username should has a length from 8 to 15 characters", "text-red-400"]);
                status = false;
            } else if (!/^[A-Za-z0-9]+$/.test(username)) {
                set_username_validation(["Your username should only contain letters and digits", "text-red-400"]);
                status = false;
            }
            else if (username_exist.data.status) {
                set_username_validation(["This username already exists", "text-red-400"]);
                status = false;
            }
            else {
                set_username_validation(["", "text-white"]);
            }
            // Validate password (length, uppercase, lowercase, digit, special char)
            if (password.length < 8 || password.length > 20) {
                set_password_validation(["Your password should has a length from 8 to 20 characters", "text-red-400"]);
                status = false;
            } else if (!/[A-Z]/.test(password)) {
                set_password_validation(["Your password should contain atleast 1 uppercase", "text-red-400"]);
                status = false;
            } else if (!/[a-z]/.test(password)) {
                set_password_validation(["Your password should contain atleast 1 lowercase", "text-red-400"]);
                status = false;
            } else if (!/[0-9]/.test(password)) {
                set_password_validation(["Your password should contain atleast 1 digit", "text-red-400"]);
                status = false;
            } else if (!/[!@#$%^&*]/.test(password)) {
                set_password_validation(["Your password should contain atleast one special letter in the set !@#$%^&*", "text-red-400"]);
                status = false;
            } else if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]+$/.test(password)) {
                set_password_validation(["Your password should only letters, digits and special characters in the set !@#$%^&*", "text-red-400"]);
                status = false;
            } else {
                set_password_validation(["", "text-white"]);
            }
            // Validate name
            if (name.length < 5) {
                set_name_validation(["Your name should contains atleast 5 characters", "text-red-400"]);
                status = false;
            } else {
                set_name_validation(["", "text-white"]);
            }
            // Validate address
            if (address.length < 5) {
                set_address_validation(["Your address should contains atleast 5 characters", "text-red-400"]);
                status = false;
            } else {
                set_address_validation(["", "text-white"]);
            }
            // Stop if validation failed
            if (!status) {
                return;
            }
            // Show success announcement
            set_announcement(["Registration Successful !", "text-green-300"]);
            // Build form data to send (with avatar file)
            const form = new FormData();
            form.append("avatar", avatarFile);
            form.append("username", username);
            form.append("password", password);
            form.append("name", name);
            form.append("address", address);
            form.append("type", "Customer")
            // Send request to backend to create user
            const create_user = await axios.post("/api/register/create_user", form)
            if (create_user.data.status === "failed") {
                set_server_error(true)
                return
            }
            // Redirect to login after short delay
            setTimeout(() => {
                navigate("/login")
            }, 1000);
        }
        catch (err) {
            console.error("Connection failed:", err)
            set_error(true)
        }
    };

    if (error) return <Failed_to_connect />
    if (server_error) return <Failed_to_fetch_data />

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
            <div className="w-full max-w-md px-4 py-6">
                {/* Announcement heading (changes on success) */}
                <h1 className={`text-2xl font-bold text-center mb-6 ${announcement[1]}`}>{announcement[0]}</h1>
                {/* Registration form card */}
                <section className="rounded-xl border border-gray-500 bg-black/60">
                    {/* Avatar preview + upload button */}
                    <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-3">
                            <div className="h-16 w-16 overflow-hidden rounded-full border border-white">
                                <img src={avatarUrl} alt="Profile" className="h-full w-full object-cover" />
                            </div>
                            <p className={`text-sm font-semibold ${avatar_validation[1]}`}>{avatar_validation[0]}</p>
                        </div>
                        <div>
                            <label
                                htmlFor="avatar-upload"
                                className="cursor-pointer rounded-full border border-gray-700 px-3 py-1 text-xs text-gray-300 hover:bg-white hover:text-black transition"
                            >
                                Change photo
                            </label>
                            <input
                                id="avatar-upload"
                                type="file"
                                accept="image/*"
                                className="sr-only"
                                onChange={onAvatarChange}
                            />
                        </div>
                    </div>

                    <div className="h-px w-full bg-white/20" />
                    {/* Input fields */}
                    <form className="space-y-3 p-4" onSubmit={handleSubmit}>
                        {/* Username */}
                        <div>
                            <label htmlFor="username" className={`block text-sm font-medium ${username_validation[1]} mb-1`}>
                                Username: {username_validation[0]}
                            </label>
                            <input id="username" type="text" className="w-full px-3 py-2 rounded-lg bg-transparent border border-gray-400 outline-none" placeholder="Enter your username" />
                        </div>
                        {/* Password */}
                        <div>
                            <label htmlFor="password" className={`block text-sm font-medium ${password_validation[1]} mb-1`}>
                                Password: {password_validation[0]}
                            </label>
                            <input id="password" type="password" className="w-full px-3 py-2 rounded-lg bg-transparent border border-gray-400 outline-none" placeholder="Enter your password" />
                        </div>
                        {/* Name */}
                        <div>
                            <label htmlFor="name" className={`block text-sm font-medium ${name_validation[1]} mb-1`}>
                                Name: {name_validation[0]}
                            </label>
                            <input id="name" type="text" className="w-full px-3 py-2 rounded-lg bg-transparent border border-gray-400 outline-none" placeholder="Enter your name" />
                        </div>
                        {/* Address */}
                        <div>
                            <label htmlFor="address" className={`block text-sm font-medium ${address_validation[1]} mb-1`}>
                                Address: {address_validation[0]}
                            </label>
                            <input id="address" type="text" className="w-full px-3 py-2 rounded-lg bg-transparent border border-gray-400 outline-none" placeholder="Enter your address" />
                        </div>
                        {/* Submit button */}
                        <button
                            type="submit"
                            className="w-full py-2 rounded-lg border border-green-400 text-green-400 hover:bg-green-400 hover:text-white"
                        >
                            Create Account
                        </button>
                    </form>
                </section>
            </div>
        </div>
    );
}

export default Register_as_customer_page;

