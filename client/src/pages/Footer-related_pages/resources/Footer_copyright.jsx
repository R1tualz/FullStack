/*
# RMIT University Vietnam 
# Course: COSC2769 - Full Stack Development 
# Semester: 2025B 
# Assessment: Assignment 02 
# Author: Vu Luong Minh Triet
# ID: s3974712
*/



function Footer_copyright() {
    return (
        // Main container for copyright page
        <section className="bg-black text-white w-full flex justify-center">
            <div className="max-w-4xl px-6 py-24 w-full">
                {/* Page heading */}
                <h2 className="text-center text-3xl md:text-4xl font-extrabold tracking-tight">
                    Copyright
                </h2>

                <div className="mt-8 space-y-4">
                    {/* Section: Ownership of content */}
                    <details className="group border border-white rounded-xl bg-black/60">
                        <summary className="flex items-center justify-between px-4 py-3 cursor-pointer select-none">
                            <span className="text-lg font-semibold">Ownership Of Content</span>
                            <span className="transition-transform group-open:rotate-180">⌄</span>
                        </summary>
                        <div className="px-4 pb-4 pt-0 border-t border-white overflow-hidden transition-[max-height] duration-300 max-h-0 group-open:max-h-[999px]">
                            <p className="mt-3 text-white">
                                All content on this platform—including text, images, logos, and design—is the property of FullStack unless otherwise stated.
                            </p>
                        </div>
                    </details>
                    {/* Section: Use of materials */}
                    <details className="group border border-white rounded-xl bg-black/60">
                        <summary className="flex items-center justify-between px-4 py-3 cursor-pointer select-none">
                            <span className="text-lg font-semibold">Use Of Materials</span>
                            <span className="transition-transform group-open:rotate-180">⌄</span>
                        </summary>
                        <div className="px-4 pb-4 pt-0 border-t border-white overflow-hidden transition-[max-height] duration-300 max-h-0 group-open:max-h-[999px]">
                            <p className="mt-3 text-white">
                                You may browse and use the website for personal, non-commercial purposes only. Any reproduction, distribution, or modification of our content without written permission is prohibited.
                            </p>
                        </div>
                    </details>
                    {/* Section: Trademarks */}
                    <details className="group border border-white rounded-xl bg-black/60">
                        <summary className="flex items-center justify-between px-4 py-3 cursor-pointer select-none">
                            <span className="text-lg font-semibold">Trademarks</span>
                            <span className="transition-transform group-open:rotate-180">⌄</span>
                        </summary>
                        <div className="px-4 pb-4 pt-0 border-t border-white overflow-hidden transition-[max-height] duration-300 max-h-0 group-open:max-h-[999px]">
                            <p className="mt-3 text-white">
                                Our name, logo, and brand identity are protected marks. They may not be used in connection with any product or service that is not provided by FullStack.
                            </p>
                        </div>
                    </details>
                    {/* Section: Third-party content */}
                    <details className="group border border-white rounded-xl bg-black/60">
                        <summary className="flex items-center justify-between px-4 py-3 cursor-pointer select-none">
                            <span className="text-lg font-semibold">Third-Party Content</span>
                            <span className="transition-transform group-open:rotate-180">⌄</span>
                        </summary>
                        <div className="px-4 pb-4 pt-0 border-t border-white overflow-hidden transition-[max-height] duration-300 max-h-0 group-open:max-h-[999px]">
                            <p className="mt-3 text-white">
                                Some images, icons, or resources may be licensed from third parties. Their rights remain with the original creators.
                            </p>
                        </div>
                    </details>
                    {/* Section: User-generated content */}
                    <details className="group border border-white rounded-xl bg-black/60">
                        <summary className="flex items-center justify-between px-4 py-3 cursor-pointer select-none">
                            <span className="text-lg font-semibold">User-Generated Content</span>
                            <span className="transition-transform group-open:rotate-180">⌄</span>
                        </summary>
                        <div className="px-4 pb-4 pt-0 border-t border-white overflow-hidden transition-[max-height] duration-300 max-h-0 group-open:max-h-[999px]">
                            <p className="mt-3 text-white">
                                By submitting content (such as reviews or feedback) to our platform, you grant Thembululqua a non-exclusive, royalty-free license to use, display, and distribute that content in connection with our services.
                            </p>
                        </div>
                    </details>
                    {/* Section: Copyright complaints */}
                    <details className="group border border-white rounded-xl bg-black/60">
                        <summary className="flex items-center justify-between px-4 py-3 cursor-pointer select-none">
                            <span className="text-lg font-semibold">Copyright Complaints</span>
                            <span className="transition-transform group-open:rotate-180">⌄</span>
                        </summary>
                        <div className="px-4 pb-4 pt-0 border-t border-white overflow-hidden transition-[max-height] duration-300 max-h-0 group-open:max-h-[999px]">
                            <p className="mt-3 text-white">
                                If you believe your copyrighted work has been used on our platform without permission, please contact us. We will promptly review and, if necessary, remove the material in question.
                            </p>
                        </div>
                    </details>
                    {/* Section: Updates */}
                    <details className="group border border-white rounded-xl bg-black/60">
                        <summary className="flex items-center justify-between px-4 py-3 cursor-pointer select-none">
                            <span className="text-lg font-semibold">Updates</span>
                            <span className="transition-transform group-open:rotate-180">⌄</span>
                        </summary>
                        <div className="px-4 pb-4 pt-0 border-t border-white overflow-hidden transition-[max-height] duration-300 max-h-0 group-open:max-h-[999px]">
                            <p className="mt-3 text-white">
                                We may update this Copyright Notice from time to time. Please check back regularly to stay informed.
                            </p>
                        </div>
                    </details>
                </div>
            </div>
        </section>
    )
}

export default Footer_copyright