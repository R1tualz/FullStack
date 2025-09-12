/*
# RMIT University Vietnam 
# Course: COSC2769 - Full Stack Development 
# Semester: 2025B 
# Assessment: Assignment 02 
# Author: On Tuan Huy
# ID: s4028018
*/



import { Eye, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Main_screen() {
    const navigate = useNavigate() // Used to navigate between routes
    return (
        // Full screen container with centered content
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
            {/* Container holding the two action buttons side by side */}
            <div className="flex gap-6">
                {/* Button to view vendor's existing products */}
                <button className="flex flex-col items-center justify-center w-32 h-32 rounded-xl border border-gray-400 text-center transition hover:bg-white hover:text-black text-gray-400" onClick={() => navigate("/view_my_product")}>
                    <Eye className="w-8 h-8 mb-2" />
                    <span className="text-sm font-medium">View My Products</span>
                    {/* Button to add a new product */}
                </button>
                <button className="flex flex-col items-center justify-center w-32 h-32 rounded-xl border border-gray-400 text-center transition hover:bg-white hover:text-black text-gray-400" onClick={() => navigate("/add_new_product")}>
                    <Plus className="w-8 h-8 mb-2" />
                    <span className="text-sm font-medium">Add New Product</span>
                </button>
            </div>
        </div>
    )
}

export default Main_screen