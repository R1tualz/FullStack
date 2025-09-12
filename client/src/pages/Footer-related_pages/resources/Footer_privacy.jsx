/*
# RMIT University Vietnam 
# Course: COSC2769 - Full Stack Development 
# Semester: 2025B 
# Assessment: Assignment 02 
# Author: Vu Luong Minh Triet
# ID: s3974712
*/


function Footer_privacy() {
    return (
        // Main container for Privacy page
        <section className="bg-black text-white w-full flex justify-center">
            <div className="max-w-4xl px-6 py-24 w-full">
                {/* Page heading */}
                <h2 className="text-center text-3xl md:text-4xl font-extrabold tracking-tight">
                    Privacy
                </h2>
                {/* Expandable sections (accordion style) */}
                <div className="mt-8 space-y-4">
                    {/* Section: Information We Collect */}
                    <details className="group border border-white rounded-xl bg-black/60">
                        <summary className="flex items-center justify-between px-4 py-3 cursor-pointer select-none">
                            <span className="text-lg font-semibold">Information We Collect</span>
                            <span className="transition-transform group-open:rotate-180">⌄</span>
                        </summary>
                        {/* Content expands when opened */}
                        <div className="px-4 pb-4 pt-0 border-t border-white overflow-hidden transition-[max-height] duration-300 max-h-0 group-open:max-h-[999px]">
                            <ul className="mt-3 list-disc list-inside space-y-1 text-white">
                                <li>Personal details such as your name, address, and contact information.</li>
                                <li>Account information including login credentials and profile preferences.</li>
                                <li>Order and delivery details like items purchased, shipping addresses, and transaction history.</li>
                                <li>Usage data such as how you interact with our platform.</li>
                            </ul>
                        </div>
                    </details>
                    {/* Section: How We Use Your Information */}
                    <details className="group border border-white rounded-xl bg-black/60">
                        <summary className="flex items-center justify-between px-4 py-3 cursor-pointer select-none">
                            <span className="text-lg font-semibold">How We Use Your Information</span>
                            <span className="transition-transform group-open:rotate-180">⌄</span>
                        </summary>
                        <div className="px-4 pb-4 pt-0 border-t border-white overflow-hidden transition-[max-height] duration-300 max-h-0 group-open:max-h-[999px]">
                            <ul className="mt-3 list-disc list-inside space-y-1 text-white">
                                <li>To provide and improve our services.</li>
                                <li>To process orders and deliveries.</li>
                                <li>To keep you informed about your account and purchases.</li>
                                <li>To ensure safety, prevent fraud, and comply with legal requirements.</li>
                            </ul>
                        </div>
                    </details>
                    {/* Section: Sharing Your Information */}
                    <details className="group border border-white rounded-xl bg-black/60">
                        <summary className="flex items-center justify-between px-4 py-3 cursor-pointer select-none">
                            <span className="text-lg font-semibold">Sharing your information</span>
                            <span className="transition-transform group-open:rotate-180">⌄</span>
                        </summary>
                        <div className="px-4 pb-4 pt-0 border-t border-white overflow-hidden transition-[max-height] duration-300 max-h-0 group-open:max-h-[999px]">
                            <p className="mt-3 text-white">
                                We do not sell your personal data. We only share information with :
                            </p>
                            <ul className="mt-3 list-disc list-inside space-y-1 text-white">
                                <li>Trusted shippers and vendors to complete your orders.</li>
                                <li>Service providers who support our operations (e.g., payment or hosting services).</li>
                                <li>Authorities when required by law.</li>
                            </ul>
                        </div>
                    </details>
                    {/* Section: Data Security */}
                    <details className="group border border-white rounded-xl bg-black/60">
                        <summary className="flex items-center justify-between px-4 py-3 cursor-pointer select-none">
                            <span className="text-lg font-semibold">Data Security</span>
                            <span className="transition-transform group-open:rotate-180">⌄</span>
                        </summary>
                        <div className="px-4 pb-4 pt-0 border-t border-white overflow-hidden transition-[max-height] duration-300 max-h-0 group-open:max-h-[999px]">
                            <p className="mt-3 text-white">
                                We take security seriously. Your information is protected through encryption, secure storage, and strict access controls.
                            </p>
                        </div>
                    </details>
                    {/* Section: User Rights */}
                    <details className="group border border-white rounded-xl bg-black/60">
                        <summary className="flex items-center justify-between px-4 py-3 cursor-pointer select-none">
                            <span className="text-lg font-semibold">Your Rights</span>
                            <span className="transition-transform group-open:rotate-180">⌄</span>
                        </summary>
                        <div className="px-4 pb-4 pt-0 border-t border-white overflow-hidden transition-[max-height] duration-300 max-h-0 group-open:max-h-[999px]">
                            <p className="mt-3 text-white">
                                You have the rights to :
                            </p>
                            <ul className="mt-3 list-disc list-inside space-y-1 text-white">
                                <li>Access and update your personal information.</li>
                                <li>Request deletion of your account.</li>
                                <li>Opt out of marketing communications.</li>
                            </ul>
                        </div>
                    </details>
                    {/* Section: Policy Updates */}
                    <details className="group border border-white rounded-xl bg-black/60">
                        <summary className="flex items-center justify-between px-4 py-3 cursor-pointer select-none">
                            <span className="text-lg font-semibold">Changes To This Policy</span>
                            <span className="transition-transform group-open:rotate-180">⌄</span>
                        </summary>
                        <div className="px-4 pb-4 pt-0 border-t border-white overflow-hidden transition-[max-height] duration-300 max-h-0 group-open:max-h-[999px]">
                            <p className="mt-3 text-white">
                                We may update this policy from time to time. Significant changes will always be communicated clearly on our website.
                            </p>
                        </div>
                    </details>
                    {/* Section: Contact Information */}
                    <details className="group border border-white rounded-xl bg-black/60">
                        <summary className="flex items-center justify-between px-4 py-3 cursor-pointer select-none">
                            <span className="text-lg font-semibold">Contact Us</span>
                            <span className="transition-transform group-open:rotate-180">⌄</span>
                        </summary>
                        <div className="px-4 pb-4 pt-0 border-t border-white overflow-hidden transition-[max-height] duration-300 max-h-0 group-open:max-h-[999px]">
                            <p className="mt-3 text-white">
                                If you have questions or concerns about your privacy, please contact our support team through the Help page.
                            </p>
                        </div>
                    </details>
                </div>
            </div>
        </section>
    )
}

export default Footer_privacy