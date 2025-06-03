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

export default function pricing({ footerData, faqData, metaData, blogData }) {
    return (
        <div className="cont pb-4 lg:gap-12 md:gap-12 gap-12">
            <MetaHeadComp metaData={metaData} page={'/mcp'} />
            <Navbar footerData={footerData} utm={'/mcp'} />

            <div className="cont gap-8">
                <McpSwitchComp />
                <div className="container ">
                    <div className="w-full flex flex-col md:flex-row justify-center items-center gap-4 mb-12">
                        <div className="cont gap-4 w-full text-left">
                            <h1 className="h1">
                                Your App. <span className="text-accent"> Your MCP Server.</span> Zero Overhead
                            </h1>
                            <h2 className="sub__h1">
                                Get a dedicated MCP server URL inside your SaaS—fully managed, seamlessly integrated,
                                with built-in analytics and ready to scale
                            </h2>
                        </div>
                    </div>

                    <div className="py-8">
                        <h2 className="text-3xl font-bold mb-6">What You Can Enable for Your Customers</h2>
                        <ul className="space-y-4 text-xl list-disc  pl-6">
                            {' '}
                            {/* Added list-disc and padding */}
                            <li>
                                Let users perform actions inside your app through their AI agents (e.g., "Send invoice",
                                "Create lead", "Update task")
                            </li>
                            <li>Embed viaSocket MCP directly inside your product</li>
                            <li>Generate an MCP endpoint for their account</li>
                            <li>Trigger workflows from OpenAI, Claude, or any LLM</li>
                        </ul>
                    </div>
                </div>

                <div className="container py-8">
                    <h2 className="text-3xl font-bold mb-6">How It Works</h2>
                    <ul className="space-y-4 text-xl list-disc  pl-6">
                        <li>
                            <strong>You Provide APIs:</strong> viaSocket’s Plugin team will use your public APIs to
                            create MCP-compatible actions
                        </li>
                        <li>
                            <strong>We Build the Plug:</strong> We handle triggers, actions, and authentication using
                            our Plugin Builder
                        </li>
                        <li>
                            <strong>You Embed the MCP:</strong> Offer your users a prebuilt URL to generate their own
                            viaSocket MCP endpoint inside your product UI
                        </li>
                        <li>
                            <strong>Your App is Now AI-Ready:</strong> Your customers can connect LLMs and agents that
                            act on your app using natural language commands
                        </li>
                    </ul>
                </div>

                <div className="container py-8">
                    <h2 className="text-3xl font-bold mb-6">Benefits</h2>
                    <ul className="space-y-4 text-xl">
                        <li className="flex gap-2 items-center">
                            <div className="h-3 w-3 bg-accent" /> Make your app compatible with AI interfaces
                        </li>
                        <li className="flex gap-2 items-center">
                            <div className="h-3 w-3 bg-accent" /> Offer native MCP integration in your dashboard
                        </li>
                        <li className="flex gap-2 items-center">
                            <div className="h-3 w-3 bg-accent" /> Get discovered inside viaSocket’s ecosystem
                        </li>
                        <li className="flex gap-2 items-center">
                            <div className="h-3 w-3 bg-accent" />
                            No need to maintain integration logic
                        </li>
                        <li className="flex gap-2 items-center">
                            <div className="h-3 w-3 bg-accent" /> Grow retention by offering automation through AI
                            agents
                        </li>
                    </ul>
                </div>
            </div>

            <div className="container">
                <div className="cont gap-2 border custom-border p-12 bg-white">
                    <h2 className="h2 text-left">Build your app to be MCP-Ready</h2>
                    <p className="sub__h1">
                        List your app on the viaSocket Marketplace and connect it to AI assistants like Cursor, Claude,
                        Windsurf, and many others—enabling your users to perform actions within your app directly
                        through AI.
                    </p>
                    <Link href="https://viasocket.com/faq/developer-hub" target="_blank" rel="noopener noreferrer">
                        <button className="btn btn-accent">Quick start guide</button>
                    </Link>
                </div>
            </div>

            <div className="container">
                <div className="cont p-12 border custom-border justify-start items-start gap-4 bg-white">
                    <div className="cont gap-1 text-left">
                        <h2 className="h2">Join the Ecosystem</h2>
                        <p className="sub__h1">
                            Let your app become part of the AI-first workflow revolution.viaSocket handles the
                            automation layer. You focus on your core product.
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <Link href="https://cal.id/team/viasocket/superheros">
                            <button className="btn btn-accent">Schedule a Meeting</button>
                        </Link>
                    </div>
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
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const pageUrl = `${protocol}://${req.headers.host}${req.url}`;
    
    const metaData = await getMetaData(METADATA_FIELDS, `filter=name='/mcp'`, pageUrl);
    const footerData = await getFooterData(FOOTER_FIELDS, '', pageUrl);
    const faqData = await getFaqData(FAQS_FIELDS, `filter=page='/mcp'`, pageUrl);
    const blogTags1 = 'mcp';
    const blogTags2 = 'saas';
    const blogData = await getBlogData({ tag1: blogTags1, tag2: blogTags2 }, pageUrl);
    return {
        props: {
            metaData: (metaData?.length > 0 && metaData[0]) || {},
            footerData: footerData || [],
            faqData: faqData || [],
            blogData: blogData || [],
        },
    };
}
