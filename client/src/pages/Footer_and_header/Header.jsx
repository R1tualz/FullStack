/*
# RMIT University Vietnam 
# Course: COSC2769 - Full Stack Development 
# Semester: 2025B 
# Assessment: Assignment 02 
# Author: Vu Luong Minh Triet
# ID: s3974712
*/



import { Link } from "react-router-dom"

function Header() {
    // Header component displayed at the top of all pages
    // Contains branding (logo + app name) and main navigation links
    return (
        <header className="bg-black text-white">
            <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo + app name (links back to homepage) */}
                <Link to="/" className="flex items-center gap-2 text-xl font-bold">
                    <div className="h-8 w-8 rounded-full flex items-center justify-center text-lg">
                        🐳
                    </div>
                    FullStack
                </Link>
                {/* Navigation bar on the right side */}
                <nav className="flex gap-6 text-gray-400">
                    <Link to="/my_account" className="hover:text-white transition">
                        My Account
                    </Link>
                </nav>
            </div>
        </header>
    )
}

export default Header