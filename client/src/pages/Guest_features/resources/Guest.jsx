/*
# RMIT University Vietnam 
# Course: COSC2769 - Full Stack Development 
# Semester: 2025B 
# Assessment: Assignment 02 
# Author: Vu Luong Minh Triet
# ID: s3974712
*/



import { Link } from "react-router-dom"

// This component is shown only when the user is NOT logged in (guest user)
// It encourages the guest to log in to access the services
function Guest() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-black text-center px-6">
            {/* Heading text */}
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">
                LOG IN TO TRY OUR SERVICES
            </h2>
            {/* Link that redirects guest users to the login page */}
            <Link className="px-6 py-3 rounded-xl text-lg font-medium border border-gray-400 text-gray-400 bg-transparent hover:bg-white transition hover:text-black" to="/login">
                Log In
            </Link>
        </main>
    )
}

export default Guest