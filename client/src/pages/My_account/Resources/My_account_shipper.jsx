/*
# RMIT University Vietnam 
# Course: COSC2769 - Full Stack Development 
# Semester: 2025B 
# Assessment: Assignment 02 
# Author: Vu Luong Minh Triet
# ID: s3974712
*/


import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Failed_to_connect from "../../Not_found_page/resources/Failed_to_connect"
import Failed_to_fetch_data from "../../Not_found_page/resources/Failed_to_fetch_data"

function My_account_shipper() {
    const navigate = useNavigate()
    // Avatar state (preview URL + uploaded file)
    const [avatarUrl, setAvatarUrl] = useState(
        "https://api.dicebear.com/9.x/initials/svg?seed=Shipper"
    );
    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarValidation, setAvatarValidation] = useState(["Profile Photo", "text-white"]);
    // Set error in case data fail to fetch
    const [error, set_error] = useState(null)
    // Set server error in case data fail to fetch
    const [server_error, set_server_error] = useState(null)
    // User info states
    const [username, set_username] = useState("undefined")
    const [distribution_hub, set_distribution_hub] = useState("undefined")
    const [type, set_type] = useState("guest")
    // Top heading message (changes on save/logout)
    const [announcement, set_announcement] = useState(["My account", "text-white"])
    // Ref to track avatar object URLs for cleanup
    const objectUrlRef = useRef(null);
    // Handle avatar upload + preview
    const onAvatarChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            setAvatarValidation(["Please choose an image file.", "text-red-400"]);
            return;
        }

        setAvatarFile(file);
        // Replace old preview if exists
        if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);

        const preview = URL.createObjectURL(file);
        objectUrlRef.current = preview;
        setAvatarUrl(preview);
        setAvatarValidation(["Profile Photo", "text-white"]);
    };
    // Fetch shipper account info on mount
    useEffect(() => {
        const get_user = async () => {
            try {
                const user_data = await axios.get("/api/my_account/get_user")
                if (user_data.data.status === "failed") {
                    set_server_error(true)
                    return
                }
                const { username, account_type, distribution_hub, avatar } = user_data.data
                setAvatarUrl(avatar)
                set_username(username)
                set_distribution_hub(distribution_hub)
                set_type(account_type)
            }
            catch (err) {
                console.error("Connection failed:", err)
                set_error(true)
            }
        }
        get_user()
        // Cleanup preview URL on unmount
        return () => {
            if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
        };
    }, []);
    // Save new avatar to backend
    const handleSaveAvatar = async () => {
        if (!avatarFile) return;
        const form = new FormData();
        form.append("avatar", avatarFile);
        try {
            const change_avatar = await axios.put("/api/my_account/change_avatar", form)
            if (change_avatar.data.status === "failed") {
                set_server_error(true)
                return
            }
            set_announcement(["Saving...", "text-green-400"])
            setTimeout(() => {
                navigate("/")
            }, 1000)
        }
        catch (err) {
            console.error("Connection failed:", err)
            set_error(true)
        }
    }
    // Log out and redirect home
    const log_out = async () => {
        try {
            const log_out = await axios.get("/api/my_account/log_out")
            if (log_out.data.status === "failed") {
                set_server_error(true)
                return
            }
            set_announcement(["Logging Out...", "text-red-400"])
            setTimeout(() => {
                navigate("/")
            }, 1000)
        }
        catch (err) {
            console.error("Connection failed:", err)
            set_error(true)
        }
    }

    if (error) return <Failed_to_connect />
    if (server_error) return <Failed_to_fetch_data />

    return (
        <div className="min-h-screen bg-black text-white antialiased">
            <div className="mx-auto max-w-3xl px-6 py-12">
                {/* Header message */}
                <header className="mb-8">
                    <h1 className={`text-3xl md:text-4xl font-extrabold tracking-tight text-center ${announcement[1]}`}>
                        {announcement[0]}
                    </h1>
                </header>
                {/* Profile card */}
                <section className="rounded-2xl border border-white bg-black/60">
                    {/* Avatar + actions */}
                    <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-4">
                            <div className="h-20 w-20 overflow-hidden rounded-full border border-white">
                                <img
                                    src={avatarUrl}
                                    alt="Profile"
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div>
                                <p className={`text-sm font-semibold ${avatarValidation[1]}`}>
                                    {avatarValidation[0]}
                                </p>
                                <p className="text-base font-semibold">{username}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <label
                                htmlFor="account-avatar-upload"
                                className="cursor-pointer rounded-full border border-white px-4 py-2 text-sm hover:bg-white hover:text-black transition"
                            >
                                Change photo
                            </label>
                            <input
                                id="account-avatar-upload"
                                type="file"
                                accept="image/*"
                                className="sr-only"
                                onChange={onAvatarChange}
                            />
                            <button
                                onClick={handleSaveAvatar}
                                disabled={!avatarFile}
                                className="rounded-full border border-green-400 px-4 py-2 text-sm text-green-400 disabled:opacity-50 hover:bg-green-400 hover:text-black transition"
                            >
                                Save photo
                            </button>
                        </div>
                    </div>

                    <div className="h-px w-full bg-white/20" />
                    {/* User details */}
                    <dl className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2">
                        <div className="rounded-xl border border-white bg-black/60 p-4">
                            <dt className="text-xs uppercase tracking-wide text-white/70">Account Type</dt>
                            <dd className="mt-1 text-base">{type}</dd>
                        </div>

                        <div className="rounded-xl border border-white bg-black/60 p-4">
                            <dt className="text-xs uppercase tracking-wide text-white/70">Username</dt>
                            <dd className="mt-1 text-base">{username}</dd>
                        </div>

                        <div className="rounded-xl border border-white bg-black/60 p-4 sm:col-span-2">
                            <dt className="text-xs uppercase tracking-wide text-white/70">Distrubtion hub</dt>
                            <dd className="mt-1 text-base">{distribution_hub}</dd>
                        </div>
                    </dl>
                </section>
                {/* Log out button */}
                <div className="mt-6 flex flex-wrap items-center gap-3">
                    <button className="rounded-full border border-red-400 px-4 py-2 text-sm text-red-400 hover:bg-red-400 hover:text-white transition" onClick={() => log_out()}>
                        Log out
                    </button>
                </div>
            </div>
        </div>
    );
}

export default My_account_shipper;

