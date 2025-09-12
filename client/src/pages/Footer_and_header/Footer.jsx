/*
# RMIT University Vietnam 
# Course: COSC2769 - Full Stack Development 
# Semester: 2025B 
# Assessment: Assignment 02 
# Author: Vu Luong Minh Triet
# ID: s3974712
*/



import { Link } from "react-router-dom"

// Footer component displayed at the bottom of all pages
// Provides quick navigation links to informational pages
function Footer() {
    return (
        <footer className="bg-black text-white py-8">
            <div className="max-w-6xl mx-auto px-4 flex justify-center">
                <nav className="flex flex-wrap justify-center gap-6 text-gray-400">
                    <Link to="/about" className="hover:text-white transition">
                        About
                    </Link>
                    <Link to="/copyright" className="hover:text-white transition">
                        Copyright
                    </Link>
                    <Link to="/privacy" className="hover:text-white transition">
                        Privacy
                    </Link>
                    <Link to="/help" className="hover:text-white transition">
                        Help
                    </Link>
                </nav>
            </div>
            {/* Divider line + copyright notice */}
            <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-500 text-sm">
                © 2025 FullStack. All rights reserved.
            </div>
        </footer>
    )
}

export default Footer