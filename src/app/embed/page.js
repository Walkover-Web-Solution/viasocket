import BlogGrid from '../components/blog/BlogGrid';
import FAQSection from '@/components/faqSection/faqSection';
import Footer from '@/components/footer/footer';
import GetStarted from '../components/common/GetStarted';
import NavbarOptimized from '../components/navbar/NavbarOptimized';
import Image from 'next/image';
import Link from 'next/link';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import Cta from '@/components/CTA/Cta';
import { getEmbedPageData } from '../lib/data';
import Table from '../components/embed/Table';
import EmbedImageSelector from '../components/embed/EmbedImageSelector';

export const runtime = 'edge';

export async function generateMetadata() {
    const { metaData } = await getEmbedPageData();

    return {
        title: metaData?.title || 'Embed - viaSocket',
        description: metaData?.description || 'Embed third party apps with your SaaS/AI product - viaSocket',
        keywords: metaData?.keywords || '',
        openGraph: {
            title: metaData?.title || 'Embed - viaSocket',
            description: metaData?.description || 'Embed third party apps with your SaaS/AI product - viaSocket',
            images: metaData?.image ? [{ url: metaData.image }] : undefined,
        },
        twitter: {
            card: 'summary_large_image',
            title: metaData?.title,
            description: metaData?.description,
            images: metaData?.image ? [metaData.image] : undefined,
        },
    };
}

export default async function EmbedPage() {
    const { blogData, footerData, navbarData, faqData, embedData, tableData, howItWorksData, metaData, appCount } =
        await getEmbedPageData();

    return (
        <>
            <MetaHeadComp metaData={metaData} page={'/embed'} />
            <NavbarOptimized navbarData={navbarData} utm={'/embed'} />

            <div className="cont lg:gap-20 md:gap-16 gap-12 global-top-space">
                <div className="w-full min-h-fit py-12">
                    <div className="container h-full flex flex-col">
                        <div className="flex flex-col lg:flex-row h-full justify-center items-center">
                            <div className="h-full w-full lg:w-2/3 flex flex-col justify-center gap-8 px-4 lg:px-0 py-8 lg:py-0 ">
                                <div className="cont">
                                    <h1 className="h1  ">
                                        <span className="text-accent">Embed </span>
                                        third party apps with your SaaS/AI product
                                    </h1>
                                    <h2 className="sub__h1 w-full lg:w-4/5">
                                        Let your customers easily discover, connect and manage workflows right within
                                        your product.
                                    </h2>
                                </div>
                                <div className="flex flex-row  flex-wrap gap-4 items-center">
                                    <Link href="https://viasocket.com/help/viasocket-embed">
                                        <button className="btn btn-accent">How To Start</button>
                                    </Link>
                                    <p className="text-gray-500 text-center">Or</p>
                                    <Link href="login?utm_source=/embed">
                                        <button className="btn btn-outline">Self Embed</button>
                                    </Link>
                                </div>
                            </div>
                            <div className="flex justify-center items-center relative w-full md:w-1/3 h-full min-h-[400px] mx-auto">
                                <Image src="/assets/img/embedheroimage.svg" fill alt="Selected Embed Image" />
                            </div>
                        </div>
                    </div>
                </div>

                <EmbedImageSelector embedData={embedData} />

                <div className="container">
                    <Table data={tableData} />
                </div>

                <div className="container">
                    <div className="cont cont__py gap-12 md:px-24 px-6  h-fit border bg-[#F5FBFF]">
                        <div className="flex flex-col gap-2 w-full">
                            <h2 className="h2">How it works</h2>
                            <p className="sub__h1">
                                Follow these steps, and your product will be seamlessly integrated with the viaSocket
                                embed
                            </p>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 justify-items-center">
                            {howItWorksData.map((step, index) => (
                                <div
                                    key={index}
                                    className="max-w-[400px] lg:py-20 py-8 px-8 border-2 border-gray-200 bg-white flex flex-col gap-2 transition-transform transform hover:scale-110"
                                >
                                    <h3 className="h3 font-bold">{step.title}</h3>
                                    <p className="sub__h1">{step.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <Cta
                    title="Upgrade your Product Today with viaSocket"
                    description="Start using viaSocket embed and bring seamless automation within your product, so your customers can stick to your product while automating their day-to-day repetitive tasks."
                    buttonLabel="Get Started"
                    buttonLink="/signup?utm_source=/embed"
                />

                <div className="container" id="ai_agent">
                    <div className=" min-h-fit bg-white border custom-border md:p-12 p-6">
                        <div className="flex flex-col lg:flex-row gap-8 justify-center items-center">
                            <div className="w-full lg:w-1/2 flex flex-col gap-6">
                                <div className="flex flex-col gap-2">
                                    <h2 className="h2">
                                        Give Your Chatbot the Power of {+appCount + 300}+ Integrations
                                    </h2>
                                    <p className="sub__h1">
                                        You can connect your chatbot to over 1500 apps on viaSocket. Automate tasks,
                                        streamline workflows and enhance your chatbot's capabilities—all in just a few
                                        clicks. Explore the possibilities and watch your chatbot evolve.
                                    </p>
                                </div>
                                <Link href="https://viasocket.com/blog/give-power-to-your-llm-or-chatbot-of-5-000-apps-via-tool-call">
                                    <button className="btn btn-accent">Read More</button>
                                </Link>
                            </div>
                            <div className="flex justify-center items-center relative w-full md:w-1/2 md:h-[600px] h-[400px]">
                                <Image src="/assets/img/readmore.svg" fill alt="Selected Embed Image" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container" id="pricing">
                    <div className="cont border custom-border md:p-12 p-6 gap-6 bg-white">
                        <div className="flex flex-col gap-8">
                            <h2 className="h2">Embed Pricing</h2>

                            <div className="flex flex-col gap-3">
                                <p className="h3">Find the right plan for your SaaS</p>
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                                    <div className="flex flex-col border p-6 custom-border shadow-lg justify-between">
                                        <h3 className="text-xl font-semibold mb-2">Starter Plan</h3>
                                        <p className="text-gray-500 mb-4">Free forever</p>
                                        <p className="text-2xl font-bold mb-4">$0</p>
                                        <ul className="mb-6 text-gray-700">
                                            <li className="mb-2">Ideal for startups</li>
                                            <li className="mb-2">Includes 5 apps</li>
                                            <li className="mb-2">200K invocations/month</li>
                                            <li className="mb-2">100 active users</li>
                                        </ul>
                                        <Link href="/signup?utm_source=/embed" className="btn btn-outline w-full">
                                            Get Started
                                        </Link>
                                    </div>

                                    <div className="flex flex-col border p-6 custom-border shadow-lg justify-between">
                                        <h3 className="text-xl font-semibold mb-2">Pro Plan</h3>
                                        <p className="text-gray-500 mb-4">For established SaaS</p>
                                        <p className="text-2xl font-bold mb-4">$499/month</p>
                                        <ul className="mb-6 text-gray-700">
                                            <li className="mb-2">Includes 50 apps</li>
                                            <li className="mb-2"> 500K invocations/month</li>
                                            <li className="mb-2">100 active users</li>
                                            <li className="mb-2">Free support</li>
                                        </ul>
                                        <Link href="/signup?utm_source=/embed" className="btn btn-outline w-full">
                                            Get Started
                                        </Link>
                                    </div>

                                    <div className="flex flex-col border p-6 custom-border shadow-lg justify-between">
                                        <h3 className="text-xl font-semibold mb-2">Enterprise Plan</h3>
                                        <p className="text-gray-500 mb-4">For enterprise SaaS</p>
                                        <p className="text-2xl font-bold mb-4">$1999/month</p>
                                        <ul className="mb-6 text-gray-700">
                                            <li className="mb-2"> Includes unlimited apps,</li>
                                            <li className="mb-2">2M invocations/month</li>
                                            <li className="mb-2">10K active users</li>
                                            <li className="mb-2">Free priority support</li>
                                        </ul>
                                        <Link href="/signup?utm_source=/embed" className="btn btn-outline w-full">
                                            Get Started
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between gap-4 border custom-border p-6 flex-wrap">
                                <div className="1">
                                    <h3 className="text-3xl font-semibold">One-Time Setup Fee</h3>
                                    <p>
                                        Each plan comes with a one-time setup fee of $499, which applies to all plans,
                                        including the Free Plan, ensuring a seamless start for everyone.
                                    </p>
                                </div>
                                <span className="text-[56px] font-semibold">$499</span>
                            </div>

                            <div className="flex flex-col border custom-border p-6">
                                <h3 className="text-3xl font-semibold">Keep Going Beyond Limits</h3>

                                <div className="flex text-lg flex-col">
                                    <p>• $0.0004 per extra invocation over the monthly limit</p>
                                    <p>• $1/user for any additional active users beyond tier</p>
                                </div>
                            </div>

                            <div className="flex flex-col border custom-border p-6">
                                <h3 className="text-3xl font-semibold">Need Something Extra? We've Got You!</h3>
                                <p>
                                    If the app you need isn't in our directory, our team can add it for you. Pricing
                                    ranges from $79 to $399 one-time, based on complexity.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                                    <Link href="/signup?utm_source=/embed" className="btn btn-accent text-nowrap">
                                        Start Growing Now
                                    </Link>
                                    <a
                                        href="https://cal.id/team/viasocket/embed"
                                        target="_blank"
                                        className="btn btn-outline text-nowrap"
                                    >
                                        Book a Demo
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Cta
                    title="Start Showing Automation Use Cases on Your Platform"
                    description="Simply add the provided embed code to your blog or website, and instantly display real-world automation examples that highlight how your app connects with others."
                    buttonLabel="Get your free embed code"
                    buttonLink="https://viasocket.com/help/viasocket-embed/Discover-the-Power-of-Automation-with-viasocket-Integration-Script"
                    theme="dark"
                />

                {blogData?.length > 0 && (
                    <div className="container">
                        <BlogGrid posts={blogData} />
                    </div>
                )}
                <div className="pb-4">
                    {faqData?.length > 0 && <FAQSection faqData={faqData} faqName={'/embed'} />}

                    <div className="container">
                        <GetStarted />
                    </div>

                    <div className="container">
                        <Footer footerData={footerData} />
                    </div>
                </div>
            </div>
        </>
    );
}
