import Image from 'next/image';
import Link from 'next/link';
import { Headphones, ExternalLink, Send, Zap, User, ShieldCheck } from 'lucide-react';

export default function GetStarted() {
    return (
        <div className="flex flex-col gap-6">
            <div className="bg-white border border-custom-border px-8 py-5 md:px-12 md:py-7 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div className="flex flex-col gap-4 flex-1 min-w-[260px]">
                    <div className="flex flex-col gap-5">
                        <h2 className="h2">Need help building your <span className="text-accent">workflow?</span></h2>
                        <p className="sub__h1">
                            Get help instantly from AI or reach out to our support team.
                        </p>
                    </div>
                    <div className="flex lg:gap-4 gap-2 flex-wrap items-center">
                        <Link href="https://viasocket.com/help" target="_blank">
                            <button className="btn btn-accent">
                                Browse help centre
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
                                </svg>
                            </button>
                        </Link>
                        <Link href="https://cal.id/forms/55f3930f-0e5e-4204-b3d5-f4858dcf202f" target="_blank">
                            <button className="btn btn-outline">Book a demo</button>
                        </Link>
                    </div>
                </div>

                <div className="border border-custom-border bg-white overflow-hidden w-full max-w-sm lg:ml-auto">
                    <div className="border-b border-custom-border px-4 py-3 flex items-center gap-3">
                        <div className="flex-1">
                            <p className="text-sm font-semibold text-black">viaSocket Support</p>
                            <p className="text-xs text-gray-500">We&apos;re here to help</p>
                        </div>
                        <span className="inline-flex items-center gap-1.5 text-xs text-gray-600">
                            <span className="w-2 h-2 rounded-full bg-green-500" />
                            Online
                        </span>
                    </div>

                    <div className="p-4 flex flex-col gap-3">
                        <div className="flex items-start gap-2 max-w-[85%]">
                            <div className="w-7 h-7 rounded-full border border-custom-border p-1 flex-shrink-0 flex items-center justify-center">
                                <Image src="/assets/brand/socketIcon.svg" alt="viaSocket" width={16} height={16} />
                            </div>
                            <div className="bg-gray-100 text-gray-900 text-sm px-4 py-2 rounded-2xl rounded-tl-sm">
                                What can I help you with?
                            </div>
                        </div>

                        <div className="flex flex-col items-end gap-1 ml-auto max-w-[85%]">
                            <div className="bg-accent text-white text-sm px-4 py-2 rounded-2xl rounded-tr-sm">
                                How can I set trigger?
                            </div>
                            <span className="text-xs text-gray-400">10:30 AM ✓</span>
                        </div>
                    </div>

                    <div className="px-4 py-3 border-t border-custom-border flex items-center gap-2">
                        <input
                            type="text"
                            placeholder="Type your message..."
                            className="flex-1 bg-transparent text-sm text-gray-700 placeholder:text-gray-400 outline-none"
                            readOnly
                        />
                        <button className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center">
                            <Send size={14} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="border border-custom-border bg-white p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#FDECE9] text-accent flex items-center justify-center shrink-0">
                        <Zap size={20} />
                    </div>
                    <div className="flex flex-col">
                        <p className="font-semibold text-gray-900">Instant answers</p>
                        <p className="text-sm text-gray-500">AI assistant available 24/7</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 md:border-l md:border-gray-200 md:pl-6">
                    <div className="w-12 h-12 rounded-full bg-[#FDECE9] text-accent flex items-center justify-center shrink-0">
                        <User size={20} />
                    </div>
                    <div className="flex flex-col">
                        <p className="font-semibold text-gray-900">Expert support</p>
                        <p className="text-sm text-gray-500">Connect with our specialists</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 md:border-l md:border-gray-200 md:pl-6">
                    <div className="w-12 h-12 rounded-full bg-[#FDECE9] text-accent flex items-center justify-center shrink-0">
                        <ShieldCheck size={20} />
                    </div>
                    <div className="flex flex-col">
                        <p className="font-semibold text-gray-900">Trusted &amp; secure</p>
                        <p className="text-sm text-gray-500">Your data is safe with us</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
