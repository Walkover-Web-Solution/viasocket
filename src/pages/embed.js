import BlogGrid from '@/components/blogGrid/blogGrid';
import FAQSection from '@/components/faqSection/faqSection';
import Footer from '@/components/footer/footer';
import GetStarted from '@/components/getStarted/getStarted';
import Navbar from '@/components/navbar/navbar';
import { EMBED_FIELDS, FOOTER_FIELDS } from '@/const/fields';
import { getBlogData } from '@/utils/getBlogData';
import { getEmbedData, getFooterData } from '@/utils/getData';
import Image from 'next/image';
import React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import Cta from '@/components/CTA/Cta';
import { getMetaData } from '@/utils/getMetaData';
import { getFaqData } from '@/utils/getFaqData';

export const runtime = 'experimental-edge';

const Embed = ({ blogData, footerData, faqData, embedData, tableData, howItWorksData, metaData }) => {
    const [selectedImage, setSelectedImage] = useState(embedData[0]?.image?.[0]);

    return (
        <>
            <MetaHeadComp metaData={metaData} page={'/embed'} />
            <Navbar footerData={footerData} utm={'/embed'} />

            <div className="cont lg:gap-20 md:gap-16 gap-12">
                <div className="w-full min-h-fit lg:h-dvh  border-b custom-border">
                    <div className="container h-full flex flex-col">
                        <div className="flex flex-col lg:flex-row h-full">
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
                                    <Link href="https://viasocket.com/faq/viasocket-embed">
                                        <button className="btn btn-accent">How To Start</button>
                                    </Link>
                                    <p className="text-gray-500 text-center">Or</p>
                                    <Link href="login?utm_source=/embed">
                                        <button className="btn btn-outline bg-white">Self Embed</button>
                                    </Link>
                                </div>
                            </div>
                            <div className="flex justify-center items-center relative w-full md:w-1/3 h-full min-h-[400px] mx-auto">
                                <Image src="/assets/img/embedheroimage.svg" layout="fill" alt="Selected Embed Image" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container w-full min-h-fit lg:h-dvh">
                    <div className="w-full h-full flex flex-col-reverse lg:flex-row justify-center items-center gap-6">
                        <div className="block w-full h-full  max-h-[600px] aspect-square min-h-[400px] bg-[#FFF5F5] md:p-6 p-2 border">
                            <div className="flex relative justify-center items-center h-full w-full overflow-hidden">
                                <Image
                                    src={selectedImage || 'https://placehold.co/40x40'}
                                    layout="fill"
                                    // width={1080}
                                    // height={1080}
                                    alt="Connector Image"
                                    className="object-contain"
                                />
                            </div>
                        </div>
                        <div className="w-full h-fit flex flex-col justify-center items-center">
                            {embedData.map((item, index) => (
                                <div
                                    key={index}
                                    className={`px-4 py-8 group w-full ${selectedImage === item?.image[0] ? 'bg-gray-100 text-black' : 'hover-bg-grey-100-text-black'}`}
                                    onMouseEnter={() => setSelectedImage(item?.image[0])}
                                >
                                    <div
                                        className={`text-lg cursor-pointer ${selectedImage === item?.image[0] ? 'text-black' : 'text-gray-700 group-hover:text-black'}`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <div
                                                className={`text-xl font-bold sm:whitespace-nowrap ${selectedImage === item?.image[0] ? 'text-black' : 'text-black group-hover:text-black'}`}
                                            >
                                                {item?.name}
                                            </div>
                                        </div>
                                        {item?.description}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="container">
                    <Table data={tableData} />
                </div>

                <div className="container">
                    <div className="cont cont__py gap-12 px-24  h-fit border bg-[#F5FBFF]">
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

                <div className="container">
                    <div className=" min-h-fit bg-white border custom-border p-12">
                        <div className="flex flex-col lg:flex-row h-full gap-4 items-center">
                            <div className="h-full w-full lg:w-3/5 cont gap-4 px-4 lg:px-0 justify-center">
                                <div>
                                    <h2 className="h2">Give Your Chatbot the Power of 1500+ Integrations</h2>
                                    <p className="sub__h1">
                                        You can connect your chatbot to over 1500 apps on viaSocket. Automate tasks,
                                        streamline workflows and enhance your chatbot's capabilities—all in just a few
                                        clicks. Explore the possibilities and watch your chatbot evolve.
                                    </p>
                                </div>
                                <Link href="https://viasocket.com/blog/give-power-to-your-llm-or-chatbot-of-5-000-apps-via-tool-call/">
                                    <button className="btn btn-accent">Read More</button>
                                </Link>
                            </div>
                            <div className="flex justify-center items-center relative w-full md:w-1/2 h-[600px]">
                                <Image src="/assets/img/readmore.svg" layout="fill" alt="Selected Embed Image" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="cont border custom-border p-12 gap-6 bg-white">
                        <div className="flex flex-col gap-1">
                            <h2 className="h2">Embed Pricing</h2>
                            <p className="h3">Get Started for Free</p>
                            <p>
                                viaSocket Embed is available at no base cost for the first 2 years or until your
                                customer count exceeds 1,000 — whichever comes first
                            </p>
                            <p>
                                You get full access to core features during this period to help you build and scale
                                without upfront commitments
                            </p>
                        </div>

                        <div>
                            <h3 className="h3">Pricing After the Free Period</h3>
                            <p>Once the free usage period ends, pricing starts at $500/month, which includes:</p>

                            <ul
                                style={{ listStyleType: 'disc', listStylePosition: 'inside' }}
                                className="flex flex-col gap-1"
                            >
                                <li>
                                    Full access to all apps available in our{' '}
                                    <a
                                        href="https://viasocket.com/integrations"
                                        className="text-accent hover:underline"
                                    >
                                        marketplace
                                    </a>
                                </li>
                                <li>Instant upgrades as new apps from our pipeline go live</li>
                                <li>
                                    Need an app we haven’t planned for yet? You can request it. Most popular apps are
                                    already in our roadmap, but if it’s outside our pipeline, custom development charges
                                    may apply
                                </li>
                                <li>
                                    Comes with 2,00,000 free{' '}
                                    <a
                                        href="https://viasocket.com/faq/pricing/invocations"
                                        className="text-accent hover:underline"
                                    >
                                        invocations
                                    </a>{' '}
                                    every month
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="h3">Beyond the included quota:</h3>
                            <p>$0.0005 per invocation — simple, usage-based pricing with no hidden fees.</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 mt-8">
                            <Link href="/signup?utm_source=/embed">
                                <button className="btn btn-accent text-nowrap">START GROWING NOW</button>
                            </Link>
                            <Link href="/support">
                                <button className="btn btn-outline text-nowrap">Contact Sales</button>
                            </Link>
                        </div>
                    </div>
                </div>

                <Cta
                    title="Start Showing Automation Use Cases on Your Platform"
                    description="Simply add the provided embed code to your blog or website, and instantly display real-world automation examples that highlight how your app connects with others."
                    buttonLabel="Get your free embed code"
                    buttonLink="https://viasocket.com/faq/viasocket-embed/Discover-the-Power-of-Automation-with-viasocket-Integration-Script"
                    theme="dark"
                />

                {blogData?.length > 0 && (
                    <div className="container">
                        <BlogGrid posts={blogData} />
                    </div>
                )}
                <div className="pb-4">
                    {faqData?.length > 0 && (
                        <div className="container">
                            <FAQSection faqData={faqData} faqName={'/embed'} />
                        </div>
                    )}

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
};

const Table = ({ data }) => {
    return (
        <div className="w-full h-full cont gap-12 p-2 sm:p-20 border custom-border bg-white">
            <div className="flex flex-col gap-0">
                <h2 className="h2">viaSocket Embed vs Custom Development:</h2>
                <h2 className="h2">A Quick Overview</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full border border-gray-200">
                    <thead className="p-4">
                        <tr>
                            <th className="p-4 text-left text-xl w-1/3">Feature</th>
                            <th className="p-4 text-left text-xl border-l w-1/3">viaSocket Embed</th>
                            <th className="p-4 text-left text-xl border-l w-1/3">Custom Automation Development</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((user, index) => (
                            <tr key={index} className="border border-gray-200 hover:bg-gray-100">
                                <td className="p-4 text-lg border-l">{user.Feature}</td>
                                <td className="p-4 text-lg font-semibold border-l">{user.embed}</td>
                                <td className="p-4 text-lg border-l">{user.development}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Embed;

export async function getServerSideProps(context) {
    const { req } = context;
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const pageUrl = `${protocol}://${req.headers.host}${req.url}`;

    const metaData = await getMetaData('/embed', pageUrl);
    const footerData = await getFooterData(FOOTER_FIELDS, '', pageUrl);
    const faqData = await getFaqData('/embed', pageUrl);
    const embedData = await getEmbedData(EMBED_FIELDS, '', pageUrl);
    const blogTags = 'embed';
    const blogData = await getBlogData({ tag1: blogTags }, pageUrl);
    const tableData = [
        { Feature: 'Time to Implement', embed: 'Minutes', development: 'Weeks/Months' },
        { Feature: 'Developer Resources', embed: 'No Requirements', development: 'Required Development Team' },
        { Feature: 'Maintenance & Updates', embed: 'Managed by viaSocket', development: 'Ongoing Maintenance Needed' },
        { Feature: 'Pre-Made Templates', embed: 'Available', development: 'Requires Manual Setup' },
        { Feature: 'Scalability', embed: 'Easy to scale', development: 'Complex to scale' },
    ];

    const howItWorksData = [
        {
            title: 'Configure the Display',
            description:
                "You have full control over the integration's appearance and functionality. Customize the display style, button type, and filter available services to suit your needs.",
        },
        {
            title: 'Generate JWT Token',
            description:
                'To generate the JWT token, gather the org_id, user_id, project_id, and access key to ensure each user only sees their relevant flows.',
        },
        {
            title: 'Embed SDK',
            description: "Once you've got your token, grab the SDK code snippet and paste it into your app's code.",
        },
    ];

    return {
        props: {
            footerData: footerData || [],
            blogData: blogData || [],
            faqData: faqData || [],
            embedData: embedData || [],
            tableData: tableData,
            howItWorksData: howItWorksData,
            metaData: metaData || {},
        },
    };
}
