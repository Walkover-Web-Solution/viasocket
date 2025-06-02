import FAQSection from '@/components/faqSection/faqSection';
import React from 'react';
import Navbar from '@/components/navbar/navbar';
import Footer from '@/components/footer/footer';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import { getFaqData, getFooterData, getMetaData } from '@/utils/getData';
import { FAQS_FIELDS, FOOTER_FIELDS, METADATA_FIELDS } from '@/const/fields';
import BlogGrid from '@/components/blogGrid/blogGrid';
import { getBlogData } from '@/utils/getBlogData';
import Link from 'next/link';
import McpSwitchComp from '@/components/mcpComps/mcpSwitchComp/McpSwitchComp';

export const runtime = 'experimental-edge';

export default function aiagent({ footerData, faqData, metaData, blogData }) {
    return (
        <div className="cont pb-4 lg:gap-12 md:gap-12 gap-12">
            <MetaHeadComp metaData={metaData} page={'/mcp'} />
            <Navbar footerData={footerData} utm={'/mcp'} />

            <div className="cont gap-8">
                <McpSwitchComp />
                <div className="container cont">
                    <div className="w-full flex flex-col md:flex-row justify-center items-center gap-4 mb-12">
                        <div className="cont gap-4 w-full text-left">
                            <h1 className="h1">
                                <span className="text-accent"> Ditch MCP,</span> Embed Actions
                            </h1>
                            <h2 className="sub__h1">
                                Simpler than MCP—Embed gives your AI agents native superpowers, minus the technical
                                baggage
                            </h2>
                        </div>
                    </div>

                    <div className=" py-8">
                        <h2 className="text-3xl font-bold mb-6">Why choose Embed over MCP?</h2>
                        <ul className="space-y-4 text-xl list-disc  pl-6">
                            <li>Run your own MCP server for over 1,000 tools</li>
                            <li>Manage Servers for your users in your Agents</li>
                            <li>Secure Connection with Built-In Auth</li>
                            <li>No more context switching</li>
                            <li>Setup in Minutes without any complexity</li>
                        </ul>
                    </div>

                    <div className=" py-8">
                        <h2 className="text-3xl font-bold mb-6">Getting Started</h2>
                        <ul className="space-y-4 text-xl list-disc  pl-6">
                            <li>
                                <strong>Creating an MCP Client:</strong> Within your AI agent, you need to create a
                                component that acts as an MCP client
                            </li>
                            <li>
                                <strong>Embed MCP:</strong> In just a few lines of script, you can bring 1,000+ MCP
                                servers into your AI Agent platform
                            </li>
                            <li>
                                <strong>Your AI Starts Acting in the Real World:</strong> Read emails, schedule
                                meetings, update tickets, and automate business tasks—all via your agent
                            </li>
                        </ul>
                    </div>

                    <div className=" py-8">
                        <h2 className="text-3xl font-bold mb-6">Why viaSocket MCP?</h2>
                        <ul className="space-y-4 text-xl">
                            <li className="flex gap-2 items-center">
                                <div className="h-3 w-3 bg-accent" /> One link, thousands of integrations
                            </li>
                            <li className="flex gap-2 items-center">
                                <div className="h-3 w-3 bg-accent" /> Zero custom backend development
                            </li>
                            <li className="flex gap-2 items-center">
                                <div className="h-3 w-3 bg-accent" /> Secure, scalable, and easy to embed
                            </li>
                            <li className="flex gap-2 items-center">
                                <div className="h-3 w-3 bg-accent" /> Supports built-in authentication flows
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="container cont p-12 border custom-border justify-start items-start gap-4 bg-white">
                <div className="cont items-start gap-1">
                    <h2 className="h2 text-left">Ready to Embed?</h2>
                    <p className="sub__h1 text-left">
                        Start integrating viaSocket MCP today and give your users the power to connect their agents with
                        the tools they already use — no extra coding required.
                    </p>
                </div>
                <div className="flex gap-4">
                    <Link href="https://viasocket.com/faq/viaSocket-MCP">
                        <button className="btn btn-accent">View MCP Docs</button>
                    </Link>
                    <Link href="https://cal.id/team/viasocket/superheros">
                        <button className="btn btn-accent">Schedule a Demo</button>
                    </Link>
                </div>
            </div>

            <div className="container">
                <BlogGrid posts={blogData} />
            </div>
            <div>
                {faqData?.length > 0 && (
                    <div className="container">
                        <FAQSection faqData={faqData} faqName={'/index'} />
                    </div>
                )}
                <div className="container">
                    <Footer footerData={footerData} />
                </div>
            </div>
        </div>
    );
}

export async function getServerSideProps(context) {
    const { req } = context;
    const metaData = await getMetaData(METADATA_FIELDS, `filter=name='/mcp'`, req);
    const footerData = await getFooterData(FOOTER_FIELDS, '', req);
    const faqData = await getFaqData(FAQS_FIELDS, `filter=page='/mcp'`, req);
    const blogTags = 'mcp';
    const blogData = await getBlogData({ tag1: blogTags }, req);
    return {
        props: {
            metaData: (metaData?.length > 0 && metaData[0]) || {},
            footerData: footerData || [],
            faqData: faqData || [],
            blogData: blogData || [],
        },
    };
}