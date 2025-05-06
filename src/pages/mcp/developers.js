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
        <div className="cont pb-4 lg:gap-20 md:gap-16 gap-12">
            <MetaHeadComp metaData={metaData} page={'/mcp'} />
            <div className="sticky top-0 z-[100]">
                <Navbar navData={navData} utm={'/mcp'} />
            </div>
            <McpSwitchComp />
            <div className="container cont">
                <div className="w-full flex flex-col md:flex-row justify-center items-center gap-4 mb-12">
                    <div className="cont gap-4 justify-center w-full text-center">
                        <h1 className="h1">Ditch MCP, Embed Actions</h1>
                        <h2 className="sub__h1">
                            Simpler than MCP—Embed gives your AI agents native superpowers, minus the technical baggage
                        </h2>
                    </div>
                </div>

                <div className="container py-8">
                    <h2 className="text-3xl font-bold mb-6">Why choose Embed over MCP?</h2>
                    <ul className="space-y-4 text-xl list-disc  pl-6">
                        <li>Run your own MCP server for over 1,000 tools</li>
                        <li>Manage Servers for your users in your Agents</li>
                        <li>Secure Connection with Built-In Auth</li>
                        <li>No more context switching</li>
                        <li>Setup in Minutes without any complexity</li>
                    </ul>
                </div>

                <div className="container py-8">
                    <h2 className="text-3xl font-bold mb-6">Getting Started</h2>
                    <ul className="space-y-4 text-xl list-disc  pl-6">
                        <li>
                            <strong>Creating an MCP Client:</strong> Within your AI agent, you need to create a
                            component that acts as an MCP client
                        </li>
                        <li>
                            <strong>Embed MCP:</strong>In just a few lines of script, you can bring 1,000+ MCP servers
                            into your AI Agent platform
                        </li>
                        <li>
                            <strong>Your AI Starts Acting in the Real World:</strong> Read emails, schedule meetings,
                            update tickets, and automate business tasks—all via your agent
                        </li>
                    </ul>
                </div>

                <div className="container py-8">
                    <h2 className="text-3xl font-bold mb-6">Why viaSocket MCP?</h2>
                    <ul className="space-y-4 text-xl">
                        <li>✅ One link, thousands of integrations</li>
                        <li>✅ Zero custom backend development</li>
                        <li>✅ Secure, scalable, and easy to embed</li>
                        <li>✅ Supports built-in authentication flows</li>
                    </ul>
                </div>
            </div>

            <div className="container cont cont__py border border-black  justify-center items-center text-center gap-12 ">
                <div className="flex flex-col justify-center items-center">
                    <h2 className="h1  max-w-[1200px]">Ready to Embed?</h2>
                    <p className="sub__h1 max-w-[1000px]">
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
            blogData: blogData || [],
        },
    };
}
