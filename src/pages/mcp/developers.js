import FAQSection from '@/components/faqSection/faqSection';
import { useEffect, useState } from 'react';
import React from 'react';
import Navbar from '@/components/navbar/navbar';
import Footer from '@/components/footer/footer';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import { getFaqData, getFooterData, getMetaData, getNavData, getPricingBetterChoice } from '@/utils/getData';
import getPricingData from '@/utils/getPricingData';
import {
    FAQS_FIELDS,
    FOOTER_FIELDS,
    METADATA_FIELDS,
    NAVIGATION_FIELDS,
    PRICINGBETTERCHOICE_FIELDS,
} from '@/const/fields';
import getCountries from '@/utils/getCountries';
import BlogGrid from '@/components/blogGrid/blogGrid';
import { getBlogData } from '@/utils/getBlogData';
import { CustomAutocomplete } from '@/components/CustomAutocomplete/CustomAutocomplete';
import { getCountryName } from '@/utils/getCountryName';
import Link from 'next/link';
import { useRouter } from 'next/router';


export const runtime = 'experimental-edge';

export default function pricing({ navData, footerData, faqData, metaData, countries, blogData, betterChoiceData }) {
    const [isToggled, setIsToggled] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState();
    const [inputValue, setInputValue] = useState('');
    const [userCountry, setUserCountry] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [pricingData, setPricingData] = useState({
        isDevelopment: false,
        currencySymbol: '$',
        starterPlan: '30',
        teamPlan: '60',
    });
    const [selectedIndex, setSelectedIndex] = useState('0');

    useEffect(() => {
        const fetchInitialData = async () => {
            setIsLoading(true);
            try {
                const countryResponse = await getCountryName();
                const fullCountryDetails = countries.find(
                    (country) => country?.country?.toLowerCase() === countryResponse?.toLowerCase()
                );
                setUserCountry(fullCountryDetails);
                setSelectedCountry(fullCountryDetails);
            } catch (error) {
                console.error('Error initializing country data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchInitialData();
    }, []);
{
    const router = useRouter(); // Get current route
    const currentRoute = router.pathname;

    console.log('Current route:', currentRoute);
    return (
        <>
            <MetaHeadComp metaData={metaData} page={'/mcp'} />

            <div className="container sticky top-0 z-[100]">
                <Navbar navData={navData} utm={'/mcp'} />
            </div>
            <div className="container cont pb-4 lg:gap-8 gap-6">


            <div className="container cont py-8">
                    <div className="w-full flex justify-center items-center">
                        <div className="flex flex-row text-center max-w-4xl flex-wrap items-center justify-center category-btn">
                            <Link href="/mcp">
                                <button
                                    className={`btn btn-accent ${currentRoute === '/mcp'  ? 'bg-black text-white' : ''}`}
                                >
                                    Users
                                </button>
                            </Link>
                            <Link href="/mcp/developers">
                                <button
                                    className={`btn btn-accent ${currentRoute === '/mcp/developers'  ? 'bg-black text-white' : ''}`}
                                >
                                    Developers
                                </button>
                            </Link>
                            <Link href="/mcp/saas">
                                <button
                                    className={`btn btn-accent ${currentRoute === 'mcp/saas' ? 'bg-black text-white' : ''}`}
                                >
                                    SaaS
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="container cont">
                    <div className="w-full flex flex-col md:flex-row justify-center items-center gap-4">
                        <div className="cont gap-4 justify-center w-full text-center max-w-4xl">
                            <h1 className="h1 ">
                                {/* Connect Your AI with<span className="text-accent"> 1,000+</span> MCPs */}
                                Empower Your AI Agents with viaSocket MCP
                            </h1>
                            <h2 className="sub__h1">
                                Connect your AI tools to thousands of apps — instantly, securely, and at scale.
                            </h2>

                        </div>
                    </div>

                    <div className="container py-16">
                        <h2 className="text-3xl font-bold mb-6">Who is this for?</h2>
                        <ul className="space-y-4 text-xl list-disc pl-6"> {/* Added list-disc and padding */}
                            <li><strong>LLM Builders:</strong> Add plug-and-play app connectivity to your language models.</li>
                            <li><strong>AI Agent Developers:</strong> Let users trigger workflows, fetch data, or act in real-world apps.</li>
                            <li><strong>AI Tool Creators:</strong> Provide seamless integrations to your end-users, with zero extra development.</li>
                        </ul>
                    </div>

                    <div className="container py-8">
                        <h2 className="text-3xl font-bold mb-6">What is viaSocket MCP?</h2>
                        <p className="text-lg">
                            viaSocket MCP is an open standard that allows your AI models or platforms to interact with 1000+ apps using a single secure endpoint. All you need to do is embed the URL.
                        </p>
                    </div>

                    <div className="container py-8">
                        <h2 className="text-3xl font-bold mb-6">How it Works</h2>
                        <ul className="space-y-4 text-xl list-disc  pl-6"> {/* Added list-disc and padding */}
                            <li><strong>Create Your Agent:</strong> Build your AI agent or LLM-powered assistant like you normally would.</li>
                            <li><strong>Embed viaSocket MCP URL:</strong> Provide your users with a unique viaSocket MCP link directly inside your platform.</li>
                            <li><strong>Let Users Connect Apps:</strong> They click the link and instantly connect your AI to CRMs, email tools, databases, calendars, and more</li>
                            <li><strong>Your AI Starts Acting in the Real World:</strong> Read emails, schedule meetings, update tickets, and automate business tasks—all via your agent.</li>
                        </ul>
                    </div>

                    <div className="container py-8">
                        <h2 className="text-3xl font-bold mb-6">Example Use Cases</h2>
                        <ul className="space-y-4 text-xl list-disc  pl-6">
                            <li><strong>AI Customer Assistant:</strong> Reads support tickets and replies using Gmail + updates status in Zendesk</li>
                            <li><strong>AI Meeting Coordinator:</strong> Checks Google Calendar, books slots, and sends reminders via Slack.</li>
                            <li><strong>AI Sales Bot:</strong> Fetches lead data from CRM, updates spreadsheets, and sends follow-ups via WhatsApp.</li>
                        </ul>
                    </div>

                    <div className="container py-8">
                        <h2 className="text-3xl font-bold mb-6">Why viaSocket MCP?</h2>
                        <ul className="space-y-4 text-xl">
                            <li>✅ One link, thousands of integrations</li>
                            <li>✅ Zero custom backend development</li>
                            <li>✅ Works with OpenAI, Claude, or any custom agent</li>
                            <li>✅ Secure, scalable, and easy to embed</li>
                            <li>✅ Supports built-in authentication flows</li>
                        </ul>
                    </div>
                </div>

                <div className="container cont cont__py border border-black  justify-center items-center text-center gap-12 ">
                    <div className="flex flex-col justify-center items-center">
                        <h2 className="h1  max-w-[1200px]">Ready to Embed?</h2>
                        <p className="sub__h1 max-w-[1000px]">
                            Start integrating viaSocket MCP today and give your users the power to connect their agents with the tools they already use — no extra coding required.
                        </p>
                    </div>
                    <div className="flex gap-4"> {/* Added flex container for the buttons */}
                        <Link href="https://viasocket.com/faq/viaSocket-MCP">
                            <button className="btn btn-accent">View MCP Docs</button>
                        </Link>
                        <Link href="https://cal.id/team/viasocket/superheros">
                            <button className="btn btn-accent">Schedule a Demo</button>
                        </Link>
                    </div>
                </div>

                <div className="cont lg:gap-36 md:gap-24 gap-12">
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

            </div>
        </>
    );
}
}

export async function getServerSideProps() {
    const metaData = await getMetaData(METADATA_FIELDS, `filter=name='/mcp'`);
    const navData = await getNavData(NAVIGATION_FIELDS);
    const footerData = await getFooterData(FOOTER_FIELDS);
    const faqData = await getFaqData(FAQS_FIELDS, `filter=page='/mcp'`);
    const countries = await getCountries();
    const blogTags = 'mcp';
    const blogData = await getBlogData(blogTags);
    const betterChoiceData = await getPricingBetterChoice(PRICINGBETTERCHOICE_FIELDS);
    return {
        props: {
            metaData: (metaData?.length > 0 && metaData[0]) || {},
            navData: navData || [],
            footerData: footerData || [],
            faqData: faqData || [],
            countries: countries || [],
            blogTags: blogTags || [],
            blogData: blogData || [],
            betterChoiceData: betterChoiceData || [],
        },
    };
}
