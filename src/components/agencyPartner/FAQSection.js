'use client';

import Link from 'next/link';
import React, { useState } from 'react';
// Tailwind-only component — no custom CSS needed

const faqData = [
    {
        question: 'What is the viaSocket Agency Partner Program?',
        answer: 'A program designed for consultants, agencies, and freelancers who build automations for clients. Partners get access to dedicated support, product resources, and agency-specific pricing built for scale.',
    },
    {
        question: 'How is the Agency Partner Program different from a regular viaSocket plan?',
        answer: (
            <>
                A regular plan is built for a single business, one tier, one task limit, one workspace. The Agency
                Partner Program is built differently:
                <ul>
                    <li>Pricing is based on volume across all your clients, not per user or per workspace</li>
                    <li>You can create and manage unlimited client workspaces under one partner account</li>
                    <li>
                        You own the client relationship entirely, charge whatever you want, viaSocket isn't involved
                    </li>
                    <li>You get direct partner support, not the standard queue</li>
                </ul>
            </>
        ),
    },
    {
        question: 'How can I become a viaSocket Agency Partner?',
        answer: (
            <>
                We're looking for automation professionals and agencies who are serious about building solutions for
                clients. To apply, you need:
                <ul>
                    <li>An active business website or a strong professional profile showing client work</li>
                </ul>
                <p>
                    Prior experience with viaSocket is not required, but as a partner you'll be expected to develop a
                    strong working knowledge of the platform.
                </p>
            </>
        ),
    },
    {
        question: 'How does the task pool work across client workspaces?',
        answer: 'Your tasks are shared across all your client workspaces, one combined pool you control. Use more for high-activity clients and less for quieter ones. There are no per-workspace limits, and no extra charges for creating new client workspaces.',
    },
    {
        question: 'How will viaSocket support me as a partner?',
        answer: (
            <>
                From the moment you join, here's what you get:
                <ul>
                    <li>Direct partner support, not a generic queue, but actual access to the team</li>
                    <li>Videos, documents, and resources to help you get the most out of viaSocket, from day one</li>
                    <li>Pricing that scales with your growth, we work with you as your client base expands</li>
                </ul>
            </>
        ),
    },
    {
        question: 'Can I work with viaSocket as a solo freelancer, not an agency?',
        answer: "Yes. If you're a solo consultant or freelancer building automation workflows for multiple clients, the program works the same way. What matters is that you're actively working with clients, not your business size.",
    },
];

function MinusIcon() {
    return (
        <svg width="16" height="2" viewBox="0 0 16 2" fill="none">
            <path d="M1 1H15" stroke="#A8200D" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
    );
}

function PlusIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 1V15M1 8H15" stroke="#A8200D" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
    );
}

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState(0);

    const toggle = (index) => {
        setOpenIndex((prev) => (prev === index ? -1 : index));
    };

    return (
        <section className="bg-white py-24 pb-28">
            <div className="container mx-auto px-5 md:px-8">
                <div className="text-center mb-16">
                    <span className="inline-block text-[11px] font-bold tracking-[0.18em] uppercase text-[#a8200d] mb-4">
                        FAQ
                    </span>
                    <h2 className="font-['Inter_Tight',sans-serif] text-[clamp(32px,4.5vw,64px)] font-black leading-[1.1] tracking-[-0.025em] text-[#111] mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-[clamp(16px,1.8vw,19px)] leading-[1.65] text-[#555] max-w-[600px] mx-auto">
                        Everything you need to know about the viaSocket Agency Partner Program.
                    </p>
                </div>

                <div className="mx-auto">
                    {faqData.map((item, index) => (
                        <div key={index} className="border-t border-[#e5e5e5] last:border-b last:border-[#e5e5e5]">
                            <button
                                className="w-full flex items-center justify-between gap-6 py-6 bg-transparent border-none cursor-pointer text-left"
                                onClick={() => toggle(index)}
                            >
                                <span className="font-['Inter_Tight',sans-serif] text-base font-semibold leading-[1.35] text-[#111]">
                                    {item.question}
                                </span>
                                <span className="shrink-0 w-6 h-6 flex items-center justify-center">
                                    {openIndex === index ? <MinusIcon /> : <PlusIcon />}
                                </span>
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}
                            >
                                <div className="pb-6 text-[15px] leading-[1.7] text-black/50 max-w-[720px] [&_ul]:mt-3 [&_ul]:list-none [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2 [&_ul]:pl-0 [&_li]:relative [&_li]:pl-4 [&_li]:before:content-[''] [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-[10px] [&_li]:before:w-[5px] [&_li]:before:h-[5px] [&_li]:before:rounded-full [&_li]:before:bg-[#a8200d] [&_p]:mt-3">
                                    {item.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex justify-center mt-12">
                <Link href="/signup" className="btn btn-accent">
                    Become a partner
                </Link>
            </div>
        </section>
    );
}
