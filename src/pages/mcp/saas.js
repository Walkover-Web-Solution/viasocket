import FAQSection from '@/components/faqSection/faqSection';
import React from 'react';
import Navbar from '@/components/navbar/navbar';
import Footer from '@/components/footer/footer';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import { getFaqData, getFooterData, getMetaData, getNavData } from '@/utils/getData';
import { FAQS_FIELDS, FOOTER_FIELDS, METADATA_FIELDS, NAVIGATION_FIELDS } from '@/const/fields';
import BlogGrid from '@/components/blogGrid/blogGrid';
import { getBlogData } from '@/utils/getBlogData';
import Link from 'next/link';
import McpSwitchComp from '@/components/mcpComps/mcpSwitchComp/McpSwitchComp';

export const runtime = 'experimental-edge';

export default function pricing({ navData, footerData, faqData, metaData, blogData }) {
    return (
        <div className="container cont pb-4 lg:gap-20 md:gap-16 gap-12">
            <MetaHeadComp metaData={metaData} page={'/mcp'} />
            <div className="container sticky top-0 z-[100]">
                <Navbar navData={navData} utm={'/mcp'} />
            </div>
            <div className="container py-8">
                <McpSwitchComp />

                <div className="w-full flex flex-col md:flex-row justify-center items-center gap-4 py-16">
                    <div className="cont gap-4 justify-center w-full text-center max-w-4xl">
                        <h1 className="h1 ">
                            {/* Connect Your AI with<span className="text-accent"> 1,000+</span> MCPs */}
                            Launch Your Own MCP Server with viaSocket
                        </h1>
                        <h2 className="sub__h1">
                            Enable your customers to trigger actions in your app from any LLM or AI agent — in seconds.
                        </h2>
                    </div>
                </div>

                <div className="container py-16">
                    <h2 className="text-3xl font-bold mb-6">Why Partner with viaSocket?</h2>
                    <p className="text-xl">
                        AI agents are becoming the new user interface. With viaSocket MCP, your app can become part of
                        that AI-powered future — with minimal engineering work. Join the integration layer that connects
                        AI to real-world tools.
                    </p>
                </div>

                <div className="container py-8">
                    <h2 className="text-3xl font-bold mb-6">What You Can Enable for Your Customers</h2>
                    <ul className="space-y-4 text-xl list-disc  pl-6">
                        {' '}
                        {/* Added list-disc and padding */}
                        <li>
                            Let users perform actions inside your app through their AI agents (e.g., "Send invoice",
                            "Create lead", "Update task").
                        </li>
                        <li>
                            Embed viaSocket MCP directly inside your product, so your users can:
                            <ul className="list-disc pl-6">
                                {' '}
                                {/* Added sublist with bullet points */}
                                <li>Generate an MCP endpoint for their account.</li>
                                <li>Connect your app to thousands of others.</li>
                                <li>Trigger workflows from OpenAI, Claude, or any LLM.</li>
                            </ul>
                        </li>
                    </ul>
                </div>

                <div className="container py-8">
                    <h2 className="text-3xl font-bold mb-6">How it Works</h2>
                    <ol className="space-y-4 text-xl list-decimal  pl-6">
                        <li>
                            <strong>You Provide APIs:</strong>viaSocket’s Plugin team will use your public APIs to
                            create MCP-compatible actions.
                        </li>
                        <li>
                            <strong>We Build the Plug:</strong> We handle triggers, actions, and authentication using
                            our Plugin Builder.
                        </li>
                        <li>
                            <strong>You Embed the MCP:</strong>Offer your users a prebuilt URL to generate their own
                            viaSocket MCP endpoint inside your product UI.
                        </li>
                        <li>
                            <strong>Your App is Now AI-Ready:</strong> Your customers can connect LLMs and agents that
                            act on your app using natural language commands.
                        </li>
                    </ol>
                </div>

                <div className="container py-8">
                    <h2 className="text-3xl font-bold mb-6">Examples</h2>
                    <ul className="space-y-4 text-xl list-disc  pl-6">
                        <li>
                            <strong>Project Management Tool:</strong>Let users create tasks, set deadlines, or update
                            projects using AI assistants.
                        </li>
                        <li>
                            <strong>Ecommerce Platform:</strong>Your merchants can automate inventory updates, order
                            confirmations, or shipping notices via their AI bots.
                        </li>
                        <li>
                            <strong>Support Tool:</strong> Tickets can be created or updated automatically when agents
                            detect issues in customer messages.
                        </li>
                    </ul>
                </div>

                <div className="container py-8">
                    <h2 className="text-3xl font-bold mb-6">Benefits</h2>
                    <ul className="space-y-4 text-xl">
                        <li>✅ Make your app compatible with AI interfaces</li>
                        <li>✅ Offer native MCP integration in your dashboard</li>
                        <li>✅ Get discovered inside viaSocket’s ecosystem</li>
                        <li>✅ No need to maintain integration logic</li>
                        <li>✅ Grow retention by offering automation through AI agents</li>
                    </ul>
                </div>
            </div>

            <div className="container cont cont__py border border-black  justify-center items-center text-center gap-12 ">
                <div className="flex flex-col justify-center items-center">
                    <h2 className="h1  max-w-[1200px]">Join the Ecosystem</h2>
                    <p className="sub__h1 max-w-[1000px]">
                        Let your app become part of the AI-first workflow revolution.viaSocket handles the automation
                        layer. You focus on your core product.
                    </p>
                </div>
                <div className="flex gap-4">
                    {' '}
                    {/* Added flex container for the buttons */}
                    <Link href="https://cal.id/team/viasocket/superheros">
                        <button className="btn btn-accent">Schedule a Meeting</button>
                    </Link>
                </div>
            </div>

            <BlogGrid posts={blogData} />
            <div>
                {faqData?.length > 0 && (
                    <div className="container border border-black p-20 border-b-0">
                        <FAQSection faqData={faqData} faqName={'/index'} />
                    </div>
                )}
                <Footer footerData={footerData} />
            </div>
        </div>
    );
}

export async function getServerSideProps() {
    const metaData = await getMetaData(METADATA_FIELDS, `filter=name='/mcp'`);
    const navData = await getNavData(NAVIGATION_FIELDS);
    const footerData = await getFooterData(FOOTER_FIELDS);
    const faqData = await getFaqData(FAQS_FIELDS, `filter=page='/mcp'`);
    const blogTags = 'mcp';
    const blogData = await getBlogData(blogTags);
    return {
        props: {
            metaData: (metaData?.length > 0 && metaData[0]) || {},
            navData: navData || [],
            footerData: footerData || [],
            faqData: faqData || [],
            blogTags: blogTags || [],
            blogData: blogData || [],
        },
    };
}
