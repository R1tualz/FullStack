/*
# RMIT University Vietnam 
# Course: COSC2769 - Full Stack Development 
# Semester: 2025B 
# Assessment: Assignment 02 
# Author: Vu Luong Minh Triet
# ID: s3974712
*/



function Footer_about() {
    return (
        // Full-width "About" section inside the footer
        <section className="bg-black text-white w-full flex justify-center">
            <div className="max-w-4xl px-6 py-24 w-full">
                {/* Section title */}
                <h2 className="text-center text-3xl md:text-4xl font-extrabold tracking-tight">
                    About
                </h2>
                {/* Accordion-style collapsible sections for about content */}
                <div className="mt-8 space-y-4">
                    {/* Mission statement */}
                    <details className="group border border-white rounded-xl bg-black/60">
                        <summary className="flex items-center justify-between px-4 py-3 cursor-pointer select-none">
                            <span className="text-lg font-semibold">Our Mission</span>
                            {/* Arrow rotates when expanded */}
                            <span className="transition-transform group-open:rotate-180">⌄</span>
                        </summary>
                        <div className="px-4 pb-4 pt-0 border-t border-white overflow-hidden transition-[max-height] duration-300 max-h-0 group-open:max-h-[999px]">
                            <p className="mt-3 text-white">
                                At FullStack, our mission is simple: to make everyday deliveries seamless, reliable, and accessible for everyone. We believe logistics should empower local businesses, support hardworking shippers, and bring convenience to customers.
                            </p>
                        </div>
                    </details>
                    {/* What we do */}
                    <details className="group border border-white rounded-xl bg-black/60">
                        <summary className="flex items-center justify-between px-4 py-3 cursor-pointer select-none">
                            <span className="text-lg font-semibold">What We Do</span>
                            <span className="transition-transform group-open:rotate-180">⌄</span>
                        </summary>
                        <div className="px-4 pb-4 pt-0 border-t border-white overflow-hidden transition-[max-height] duration-300 max-h-0 group-open:max-h-[999px]">
                            <p className="mt-3 text-white">
                                We connect customers, vendors, and shippers in a single, easy-to-use platform. Customers can shop with confidence, vendors can reach more people and grow their businesses, and shippers can deliver with transparency and trust.
                            </p>
                        </div>
                    </details>
                    {/* Info for Customers */}
                    <details className="group border border-white rounded-xl bg-black/60">
                        <summary className="flex items-center justify-between px-4 py-3 cursor-pointer select-none">
                            <span className="text-lg font-semibold">For Customers</span>
                            <span className="transition-transform group-open:rotate-180">⌄</span>
                        </summary>
                        <div className="px-4 pb-4 pt-0 border-t border-white overflow-hidden transition-[max-height] duration-300 max-h-0 group-open:max-h-[999px]">
                            <p className="mt-3 text-white">
                                We help customers discover the products they need, track their orders with ease, and enjoy peace of mind knowing deliveries are handled quickly and reliably.
                            </p>
                        </div>
                    </details>
                    {/* Info for Shippers */}
                    <details className="group border border-white rounded-xl bg-black/60">
                        <summary className="flex items-center justify-between px-4 py-3 cursor-pointer select-none">
                            <span className="text-lg font-semibold">For Shippers</span>
                            <span className="transition-transform group-open:rotate-180">⌄</span>
                        </summary>
                        <div className="px-4 pb-4 pt-0 border-t border-white overflow-hidden transition-[max-height] duration-300 max-h-0 group-open:max-h-[999px]">
                            <p className="mt-3 text-white">
                                We support shippers with flexible opportunities and tools that make every delivery smoother, more efficient, and rewarding.
                            </p>
                        </div>
                    </details>
                    {/* Info for Vendors */}
                    <details className="group border border-white rounded-xl bg-black/60">
                        <summary className="flex items-center justify-between px-4 py-3 cursor-pointer select-none">
                            <span className="text-lg font-semibold">For Vendors</span>
                            <span className="transition-transform group-open:rotate-180">⌄</span>
                        </summary>
                        <div className="px-4 pb-4 pt-0 border-t border-white overflow-hidden transition-[max-height] duration-300 max-h-0 group-open:max-h-[999px]">
                            <p className="mt-3 text-white">
                                We provide a fair and transparent marketplace for vendors to showcase their products, expand their reach, and focus on what they do best—serving their customers.
                            </p>
                        </div>
                    </details>
                    {/* Our Values */}
                    <details className="group border border-white rounded-xl bg-black/60">
                        <summary className="flex items-center justify-between px-4 py-3 cursor-pointer select-none">
                            <span className="text-lg font-semibold">Our Values</span>
                            <span className="transition-transform group-open:rotate-180">⌄</span>
                        </summary>
                        <div className="px-4 pb-4 pt-0 border-t border-white overflow-hidden transition-[max-height] duration-300 max-h-0 group-open:max-h-[999px]">
                            <ul className="mt-3 list-disc list-inside space-y-1 text-white">
                                <li>Transparency : Clear pricing, fair policies, and honest communication.</li>
                                <li>Community : Empowering local businesses and supporting sustainable growth.</li>
                                <li>Reliability : Every delivery, big or small, matters to us.</li>
                                <li>Innovation : Continuously improving to create a simpler, smarter logistics experience.</li>
                            </ul>
                        </div>
                    </details>
                </div>
            </div>
        </section>
    )
}

export default Footer_about