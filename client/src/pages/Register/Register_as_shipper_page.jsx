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
import axios from "axios";

function Register_as_shipper_page() {
    const navigate = useNavigate();

    // Avatar preview and uploaded file
    const [avatarUrl, setAvatarUrl] = useState("https://api.dicebear.com/9.x/initials/svg?seed=Shipper");
    const [avatarFile, setAvatarFile] = useState(null);
    // Validation states
    const [avatar_validation, set_avatar_validation] = useState(["Profile Photo", "text-white"]);
    const [username_validation, set_username_validation] = useState(["", "text-white"]);
    const [password_validation, set_password_validation] = useState(["", "text-white"]);
    const [hub_validation, set_hub_validation] = useState(["", "text-white"]);
    // Announcement message (top heading)
    const [announcement, set_announcement] = useState(["Register as Shipper", "text-white"]);
    // Ref to cleanup object URLs created for avatar preview
    const objectUrlRef = useRef(null);
    // Handle avatar selection and preview
    const onAvatarChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            set_avatar_validation(["Please choose an image file.", "text-red-400"]);
            return;
        }

        setAvatarFile(file);
        // Replace old preview if exists
        if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
        const preview = URL.createObjectURL(file);
        objectUrlRef.current = preview;
        setAvatarUrl(preview);
        set_avatar_validation(["Profile Photo", "text-white"]);
    };
    // Cleanup temporary preview URLs when component unmounts
    useEffect(() => {
        return () => {
            if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
        };
    }, []);
    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Read form values
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value;
        const distribution_hub = document.getElementById("distribution_hub").value;
        // Check if username already exists
        const username_exist = await axios.post("api/register/get_user", { username: username })
        let status = true; // overall form validity
        // Avatar validation
        if (!avatarFile) {
            set_avatar_validation(["No avatar found !", "text-red-400"]);
            status = false;
        } else {
            set_avatar_validation(["Profile Photo", "text-white"]);
        }
        // Username validation
        if (username.length < 8 || username.length > 15) {
            set_username_validation(["Your username should has a length from 8 to 15 characters", "text-red-400"]);
            status = false;
        } else if (!/^[A-Za-z0-9]+$/.test(username)) {
            set_username_validation(["Your username should only contain letters and digits", "text-red-400"]);
            status = false;
        } else if (username_exist.data.status) {
            set_username_validation(["This username already exists", "text-red-400"]);
            status = false;
        } else {
            set_username_validation(["", "text-white"]);
        }
        // Password validation (length + character requirements)
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
        // Distribution hub validation
        if (!distribution_hub) {
            set_hub_validation(["Please select a distribution hub", "text-red-400"]);
            status = false;
        } else {
            set_hub_validation(["", "text-white"]);
        }
        // Stop if validation fails
        if (!status) {
            return;
        }
        // Registration success
        set_announcement(["Registration Successful !", "text-green-300"]);
        // Build form with avatar + inputs
        const form = new FormData();
        form.append("avatar", avatarFile);
        form.append("username", username);
        form.append("password", password);
        form.append("distribution_hub", distribution_hub);
        form.append("type", "Shipper");
        // Send registration request
        await axios.post("/api/register/create_user", form);
        // Redirect to login page
        setTimeout(() => {
            navigate("/login");
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
            <div className="w-full max-w-md px-4 py-6">
                {/* Announcement heading (changes color/text when successful) */}
                <h1 className={`text-2xl font-bold text-center mb-6 ${announcement[1]}`}>{announcement[0]}</h1>
                {/* Form container */}
                <section className="rounded-xl border border-gray-500 bg-black/60">
                    {/* Avatar section */}
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
                            <input
                                id="username"
                                type="text"
                                placeholder="Enter your username"
                                className="w-full px-3 py-2 rounded-lg bg-transparent border border-gray-400 outline-none"
                            />
                        </div>
                        {/* Password */}
                        <div>
                            <label htmlFor="password" className={`block text-sm font-medium ${password_validation[1]} mb-1`}>
                                Password: {password_validation[0]}
                            </label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                className="w-full px-3 py-2 rounded-lg bg-transparent border border-gray-400 outline-none"
                            />
                        </div>
                        {/* Distribution hub */}
                        <div>
                            <label htmlFor="distribution_hub" className={`block text-sm font-medium ${hub_validation[1]} mb-1`}>
                                Distribution Hub : {hub_validation[0]}
                            </label>
                            <select
                                id="distribution_hub"
                                defaultValue=""
                                className="w-full px-3 py-2 rounded-lg bg-transparent text-white border border-gray-400 outline-none appearance-none"
                            >
                                <option value="" disabled className="bg-black text-white/70">
                                    Select Distribution Hub
                                </option>
                                <option value="TPHCM" className="bg-black text-white">TPHCM</option>
                                <option value="HANOI" className="bg-black text-white">HA NOI</option>
                                <option value="HAIPHONG" className="bg-black text-white">HAI PHONG</option>
                                <option value="NINHBINH" className="bg-black text-white">NINH BINH</option>
                                <option value="TAYNINH" className="bg-black text-white">TAY NINH</option>
                            </select>
                        </div>
                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full py-2 rounded-lg border border-green-400 text-green-400 bg-transparent font-semibold tracking-wide transition duration-300 hover:bg-green-400 hover:text-white"
                        >
                            Create Account
                        </button>
                    </form>
                </section>
            </div>
        </div>
    );
}

export default Register_as_shipper_page;

