/*
# RMIT University Vietnam 
# Course: COSC2769 - Full Stack Development 
# Semester: 2025B 
# Assessment: Assignment 02 
# Author: Vu Luong Minh Triet
# ID: s3974712
*/



import { Link } from "react-router-dom"

// Shown when a specific order cannot be found
function Order_not_found() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-black text-center px-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">
                ORDER NOT FOUND !
            </h2>
            {/* Button link to return to home page */}
            <Link className="px-6 py-3 rounded-xl text-lg font-medium border border-gray-400 text-gray-400 bg-transparent hover:bg-white transition hover:text-black" to="/">
                Return
            </Link>
        </main>
    )
}

export default Order_not_found