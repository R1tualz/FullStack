/*
# RMIT University Vietnam 
# Course: COSC2769 - Full Stack Development 
# Semester: 2025B 
# Assessment: Assignment 02 
# Author: Vu Luong Minh Triet
# ID: s3974712
*/

function Footer_help() {
    return (
        <section className="bg-black text-white w-full flex justify-center">
            <div className="max-w-4xl px-6 py-24 w-full">
                <h2 className="text-center text-3xl md:text-4xl font-extrabold tracking-tight">
                    Help
                </h2>

                <div className="mt-8 space-y-4">
                    <details className="group border border-white rounded-xl bg-black/60">
                        <summary className="flex items-center justify-between px-4 py-3 cursor-pointer select-none">
                            <span className="text-lg font-semibold">Getting Started</span>
                            <span className="transition-transform group-open:rotate-180">⌄</span>
                        </summary>

                        {/* raise the max height and smooth the transition */}
                        <div className="px-4 pb-4 pt-0 border-t border-white overflow-hidden transition-[max-height] duration-300 max-h-0 group-open:max-h-[999px]">
                            <p className="mt-3 text-white">
                                To use our services, you’ll need an account. Simply sign up as a Customer, Vendor, or Shipper. Each role has its own tools, so choose the one that matches how you want to use the platform.
                            </p>
                            <ul className="mt-3 list-disc list-outside pl-5 space-y-2 leading-relaxed text-white">
                                <li><span className="break-words">Customers shop for products and place orders.</span></li>
                                <li><span className="break-words">Vendors showcase and sell their products</span></li>
                                <li><span className="break-words">Shippers handle deliveries from our hubs to customers.</span></li>
                            </ul>
                        </div>
                    </details>
                    <details className="group border border-white rounded-xl bg-black/60">
                        <summary className="flex items-center justify-between px-4 py-3 cursor-pointer select-none">
                            <span className="text-lg font-semibold">Customers : Shopping And Orders</span>
                            <span className="transition-transform group-open:rotate-180">⌄</span>
                        </summary>

                        {/* raise the max height and smooth the transition */}
                        <div className="px-4 pb-4 pt-0 border-t border-white overflow-hidden transition-[max-height] duration-300 max-h-0 group-open:max-h-[999px]">
                            <ul className="mt-3 list-disc list-outside pl-5 space-y-2 leading-relaxed text-white">
                                <li><span className="break-words">Browse Products : Explore items offered by different vendors. Use filters or search by name to find exactly what you need.</span></li>
                                <li><span className="break-words">Cart & Checkout : Add products to your cart and place your order when ready.</span></li>
                                <li><span className="break-words">Track Orders : Once your order is placed, it is sent to one of our delivery hubs (e.g., Ho Chi Minh, Hai Phong, or Hanoi). From there, a shipper will handle your delivery.</span></li>
                                <li><span className="break-words">Order Status : You’ll see if your order is delivered or canceled.</span></li>
                            </ul>
                        </div>
                    </details>
                    <details className="group border border-white rounded-xl bg-black/60">
                        <summary className="flex items-center justify-between px-4 py-3 cursor-pointer select-none">
                            <span className="text-lg font-semibold">Vendors : Selling Made Simple</span>
                            <span className="transition-transform group-open:rotate-180">⌄</span>
                        </summary>

                        {/* raise the max height and smooth the transition */}
                        <div className="px-4 pb-4 pt-0 border-t border-white overflow-hidden transition-[max-height] duration-300 max-h-0 group-open:max-h-[999px]">
                            <ul className="mt-3 list-disc list-outside pl-5 space-y-2 leading-relaxed text-white">
                                <li><span className="break-words">Add Products : List your items with a name, price, description, and photo.</span></li>
                                <li><span className="break-words">Grow Your Reach : Every product you add becomes visible to all customers browsing the site.</span></li>
                            </ul>
                        </div>
                    </details>
                    <details className="group border border-white rounded-xl bg-black/60">
                        <summary className="flex items-center justify-between px-4 py-3 cursor-pointer select-none">
                            <span className="text-lg font-semibold">Shippers : Deliver with Ease</span>
                            <span className="transition-transform group-open:rotate-180">⌄</span>
                        </summary>

                        {/* raise the max height and smooth the transition */}
                        <div className="px-4 pb-4 pt-0 border-t border-white overflow-hidden transition-[max-height] duration-300 max-h-0 group-open:max-h-[999px]">
                            <ul className="mt-3 list-disc list-outside pl-5 space-y-2 leading-relaxed text-white">
                                <li><span className="break-words">Assigned Hubs : Each shipper is linked to a hub where orders arrive.</span></li>
                                <li><span className="break-words">View Orders : Log in to see all active deliveries at your hub.</span></li>
                                <li><span className="break-words">Complete Deliveries : Once a package is dropped off, mark it as “Delivered.” If there’s an issue, mark it as “Canceled.”</span></li>
                            </ul>
                        </div>
                    </details>
                    <details className="group border border-white rounded-xl bg-black/60">
                        <summary className="flex items-center justify-between px-4 py-3 cursor-pointer select-none">
                            <span className="text-lg font-semibold">Account And Profile</span>
                            <span className="transition-transform group-open:rotate-180">⌄</span>
                        </summary>

                        {/* raise the max height and smooth the transition */}
                        <div className="px-4 pb-4 pt-0 border-t border-white overflow-hidden transition-[max-height] duration-300 max-h-0 group-open:max-h-[999px]">
                            <ul className="mt-3 list-disc list-outside pl-5 space-y-2 leading-relaxed text-white">
                                <li><span className="break-words">Update Details : Change your profile info or upload a new photo anytime in “My Account.”</span></li>
                                <li><span className="break-words">One Role per Account : Each account type is unique — for example, if you want to be both a customer and a vendor, you’ll need two accounts.</span></li>
                            </ul>
                        </div>
                    </details>
                    <details className="group border border-white rounded-xl bg-black/60">
                        <summary className="flex items-center justify-between px-4 py-3 cursor-pointer select-none">
                            <span className="text-lg font-semibold">Device And Accessability</span>
                            <span className="transition-transform group-open:rotate-180">⌄</span>
                        </summary>

                        {/* raise the max height and smooth the transition */}
                        <div className="px-4 pb-4 pt-0 border-t border-white overflow-hidden transition-[max-height] duration-300 max-h-0 group-open:max-h-[999px]">
                            <p className="mt-3 text-white">
                                Our platform works smoothly on any device:
                            </p>
                            <ul className="mt-3 list-disc list-outside pl-5 space-y-2 leading-relaxed text-white">
                                <li><span className="break-words">Desktop : Best for full browsing and management.</span></li>
                                <li><span className="break-words">Tablet : A convenient, portable option.</span></li>
                                <li><span className="break-words">Mobile : Optimized so you can shop, deliver, or sell on the go.</span></li>
                            </ul>
                        </div>
                    </details>
                    <details className="group border border-white rounded-xl bg-black/60">
                        <summary className="flex items-center justify-between px-4 py-3 cursor-pointer select-none">
                            <span className="text-lg font-semibold">Common Questions</span>
                            <span className="transition-transform group-open:rotate-180">⌄</span>
                        </summary>

                        {/* raise the max height and smooth the transition */}
                        <div className="px-4 pb-4 pt-0 border-t border-white overflow-hidden transition-[max-height] duration-300 max-h-0 group-open:max-h-[999px]">
                            <ul className="mt-3 list-disc list-outside pl-5 space-y-2 leading-relaxed text-white">
                                <li><span className="break-words"><b>Can I track deliveries in real-time ?</b> Orders are processed instantly once shippers update their status.</span></li>
                                <li><span className="break-words"><b>Do I need a special ID to sign up ?</b> No — just your basic details and a unique username.</span></li>
                                <li><span className="break-words"><b>How do I know which hub my order goes to ?</b> You can manually assign hubs in cart page.</span></li>
                            </ul>
                        </div>
                    </details>
                    <details className="group border border-white rounded-xl bg-black/60">
                        <summary className="flex items-center justify-between px-4 py-3 cursor-pointer select-none">
                            <span className="text-lg font-semibold">Need More Help ?</span>
                            <span className="transition-transform group-open:rotate-180">⌄</span>
                        </summary>

                        {/* raise the max height and smooth the transition */}
                        <div className="px-4 pb-4 pt-0 border-t border-white overflow-hidden transition-[max-height] duration-300 max-h-0 group-open:max-h-[999px]">
                            <p className="mt-3 text-white">
                                If you run into an issue that isn’t covered here :
                            </p>
                            <ul className="mt-3 list-disc list-outside pl-5 space-y-2 leading-relaxed text-white">
                                <li><span className="break-words">Email us at s4060872@rmit.edu.vn.</span></li>
                                <li><span className="break-words">Send feedback at nguyenthanhdattbtn@gmail.com.</span></li>
                            </ul>
                        </div>
                    </details>
                </div>
            </div>
        </section>
    )
}

export default Footer_help