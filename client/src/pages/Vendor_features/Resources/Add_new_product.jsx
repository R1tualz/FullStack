/*
# RMIT University Vietnam 
# Course: COSC2769 - Full Stack Development 
# Semester: 2025B 
# Assessment: Assignment 02 
# Author: On Tuan Huy
# ID: s4028018
*/



import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Add_new_product() {
    const navigate = useNavigate();
    // State for handling product image (preview + file)
    const [imageUrl, setImageUrl] = useState("https://api.dicebear.com/9.x/shapes/svg?seed=Product");
    const [imageFile, setImageFile] = useState(null);
    // State for form announcements + field validations
    const [announcement, setAnnouncement] = useState(["Add New Product", "text-white"]);
    const [product_name, set_product_name] = useState(["Product Name", "text-white"])
    const [price, set_price] = useState(["Price", "text-white"])
    const [description, set_description] = useState(["Description", "text-white"])
    const [image, set_image] = useState(["Product Image", "text-white"])
    // Ref to track preview object URL so it can be cleaned up later
    const objectUrlRef = useRef(null);
    // Handle image upload & preview
    const onImageChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setImageFile(file);
        // Revoke old preview if exists
        if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
        // Create new preview
        const preview = URL.createObjectURL(file);
        objectUrlRef.current = preview;
        setImageUrl(preview);
    };
    // Cleanup preview URL when component unmounts
    useEffect(() => {
        return () => {
            if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
        };
    }, []);
    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Grab field values
        const name = document.getElementById("product_name").value.trim()
        const price = document.getElementById("price").value.trim()
        const description = document.getElementById("description").value.trim()
        let status = true
        // Check if product name already exists (API call)
        const { data } = await axios.post("/api/vendor_features/check_product", { product_name: name })
        // Image validation
        if (!imageFile) {
            set_image(["Image not found !", "text-red-400"])
            status = false
        }
        else {
            set_image(["Product Image", "text-white"])
        }
        // Product name validation (10–20 chars, unique)
        if (name.length < 10 || name.length > 20) {
            set_product_name(["Your product name should has a length from 10 to 20", "text-red-400"])
            status = false
        }
        else if (!data.status) {
            set_product_name(["Your products can't have same name", "text-red-400"])
            status = false
        }
        else {
            set_product_name(["Product Name", "text-white"])
        }
        // Price validation (must be positive number)
        if (!/^\d+(\.\d+)?$/.test(price)) {
            set_price(["It's not a number", "text-red-400"])
            status = false
        }
        else if (price <= 0) {
            set_price(["Product price should be atleast larger than 0", "text-red-400"])
            status = false
        }
        else {
            set_price(["Price", "text-white"])
        }
        // Description validation (10–500 chars)
        if (description.length > 500) {
            set_description(["Your maximum description length is 500", "text-red-400"])
            status = false
        }
        else if (description.length < 10) {
            set_description(["Your minimum description length is 10", "text-red-400"])
            status = false
        }
        else {
            set_description(["Description", "text-white"])
        }
        // If any validation fails, stop here
        if (status) {
            // Prepare form data for API
            const form = new FormData();
            form.append("image", imageFile);
            form.append("name", name);
            form.append("price", Number(price));
            form.append("description", description);
            // Submit product to backend
            await axios.post("/api/vendor_features/add_product", form)
            // Show success message
            setAnnouncement(["Product Created!", "text-green-300"]);
            // Redirect back to homepage after short delay
            setTimeout(() => navigate("/"), 1000)
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
            <div className="w-full max-w-md px-4 py-6">
                {/* Page heading */}
                <h1 className={`text-2xl font-bold text-center mb-6 ${announcement[1]}`}>
                    {announcement[0]}
                </h1>

                <section className="rounded-xl border border-gray-500 bg-black/60">
                    {/* Product image upload + preview */}
                    <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-3">
                            <div className="h-16 w-16 overflow-hidden rounded-lg border border-white">
                                <img src={imageUrl} alt="Product" className="h-full w-full object-cover" />
                            </div>
                            <p className={`text-sm font-semibold ${image[1]}`}>{image[0]}</p>
                        </div>
                        <div>
                            <label
                                htmlFor="product-image-upload"
                                className="cursor-pointer rounded-full border border-gray-700 px-3 py-1 text-xs text-gray-300 hover:bg-white hover:text-black transition"
                            >
                                Change image
                            </label>
                            <input
                                id="product-image-upload"
                                type="file"
                                accept="image/*"
                                className="sr-only"
                                onChange={onImageChange}
                            />
                        </div>
                    </div>

                    <div className="h-px w-full bg-white/20" />
                    {/* Product form */}
                    <form className="space-y-3 p-4" onSubmit={handleSubmit}>
                        {/* Product name */}
                        <div>
                            <label htmlFor="product_name" className={`block text-sm font-medium mb-1 ${product_name[1]}`}>
                                {product_name[0]}
                            </label>
                            <input
                                id="product_name"
                                type="text"
                                placeholder="10–20 characters"
                                className="w-full px-3 py-2 rounded-lg bg-transparent border border-gray-400 outline-none"
                            />
                        </div>

                        <div>
                            {/* Price */}
                            <label htmlFor="price" className={`block text-sm font-medium mb-1 ${price[1]}`}>
                                {price[0]}
                            </label>
                            <input
                                id="price"
                                type="text"
                                placeholder="Positive number"
                                className="w-full px-3 py-2 rounded-lg bg-transparent border border-gray-400 outline-none"
                            />
                        </div>

                        <div>
                            {/* Description */}
                            <label htmlFor="description" className={`block text-sm font-medium mb-1 ${description[1]}`}>
                                {description[0]}
                            </label>
                            <textarea
                                id="description"
                                rows={5}
                                placeholder="At most 500 characters"
                                className="w-full px-3 py-2 rounded-lg bg-transparent border border-gray-400 outline-none"
                            />
                        </div>

                        <div className="flex justify-center gap-4 pt-2">
                            {/* Submit button */}
                            <button
                                type="submit"
                                className="px-6 py-2 rounded-lg border border-green-400 text-green-400 hover:bg-green-400 hover:text-white transition"
                            >
                                Create
                            </button>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    );
}

export default Add_new_product;
