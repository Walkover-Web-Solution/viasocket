import BlogGrid from '@/components/blogGrid/blogGrid';
import FAQSection from '@/components/faqSection/faqSection';
import Footer from '@/components/footer/footer';
import GetStarted from '@/components/getStarted/getStarted';
import Navbar from '@/components/navbar/navbar';
import {
    EMBED_FIELDS,
    FAQS_FIELDS,
    FOOTER_FIELDS,
    GETSTARTED_FIELDS,
    METADATA_FIELDS,
    NAVIGATION_FIELDS,
} from '@/const/fields';
import { getBlogData } from '@/utils/getBlogData';
import { getEmbedData, getFaqData, getFooterData, getGetStartedData, getMetaData, getNavData } from '@/utils/getData';
import Image from 'next/image';
import React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';

export const runtime = 'experimental-edge';

const Embed = ({
    navData,
    blogData,
    footerData,
    faqData,
    getStartedData,
    embedData,
    tableData,
    howItWorksData,
    metaData,
}) => {
    const [selectedImage, setSelectedImage] = useState(embedData[0]?.image?.[0]);

    return (
        <>
            <MetaHeadComp metaData={metaData} page={'/embed'} />
            <div className="sticky top-0 z-[100] border-b transparent-border-black">
                <Navbar navData={navData} utm={'/embed'} />
            </div>
            <div className="cont lg:gap-36 md:gap-24 gap-12">
                <div className="w-full min-h-fit lg:h-dvh  border-b transparent-border-black">
                    <div className="container h-full flex flex-col bg-white">
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
                                        <button className="btn btn-accent ">How To Start</button>
                                    </Link>
                                    <p className="text-gray-500 text-center">Or</p>
                                    <Link href="login?utm_source=/embed">
                                        <button className="btn btn-outline">Self Embed</button>
                                    </Link>
                                </div>
                            </div>
                            <div className="flex justify-center items-center relative w-full md:w-1/3 h-full min-h-[400px] mx-auto">
                                <Image src="/assets/img/embedheroimage.svg" layout="fill" alt="Selected Embed Image" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container w-full min-h-fit lg:h-dvh flex justify-center items-center gap-12 bg-white">
                    <div className="w-full h-full flex flex-col-reverse lg:flex-row justify-center items-center gap-6 lg:gap-24">
                        <div className="block w-full h-full  max-h-[600px] aspect-square min-h-[400px] bg-[#FFF5F5] md:p-6 p-2 border">
                            <div className="flex justify-center items-center h-full w-full overflow-hidden">
                                <Image
                                    src={selectedImage || 'https://placehold.co/40x40'}
                                    // layout="fill"
                                    width={1080}
                                    height={1080}
                                    alt="Connector Image"
                                    className="max-w-full h-fit "
                                />
                            </div>
                        </div>
                        <div className="w-full h-fit flex flex-col justify-center items-center ">
                            {embedData.map((item, index) => (
                                <div
                                    key={index}
                                    className={`px-4 py-8 group w-full ${selectedImage === item?.image[0] ? 'bg-black text-white' : 'hover-bg-white-text-black'}`}
                                    onMouseEnter={() => setSelectedImage(item?.image[0])}
                                >
                                    <div
                                        className={`text-lg cursor-pointer ${selectedImage === item?.image[0] ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <div
                                                className={`text-xl font-bold sm:whitespace-nowrap ${selectedImage === item?.image[0] ? 'text-white' : 'text-black group-hover:text-white'}`}
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

                <div className="container border transparent-border-black bg-white">
                    <Table data={tableData} />
                </div>

                <div className="container cont cont__py gap-12 px-24  h-fit border bg-[#F5FBFF]">
                    <div className="flex flex-col gap-2 w-full">
                        <h2 className="h2">How it works</h2>
                        <p className="sub__h1">
                            Follow these steps, and your product will be seamlessly integrated with the viaSocket embed
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

                <div className="container cont cont__py border transparent-border-black gap-12 px-12 bg-white">
                    <div className="flex flex-col justify-start">
                        <h2 className="h2 text-left">Upgrade your Product Today with viaSocket</h2>
                        <p className="sub__h1 text-left">
                            Start using viaSocket embed and bring seamless automation within your product, so your
                            customers can stick to your product while automating their day-to-day repetitive tasks.
                        </p>
                    </div>
                    <div className="flex justify-start">
                        <Link href="login?utm_source=/embed">
                            <button className="btn btn-accent">Get Started</button>
                        </Link>
                    </div>
                </div>

                <div className="container min-h-fit bg-white border transparent-border-black px-12">
                    <div className="flex flex-col lg:flex-row h-full gap-12 items-center">
                        <div className="h-full w-full lg:w-3/5 flex flex-col gap-8 px-4 lg:px-0 justify-center">
                            <div>
                                <h2 className="h2">Give Your Chatbot the Power of 5,000+ Integrations</h2>
                                <p className="sub__h1">
                                    You can connect your chatbot to over 5000 apps on viaSocket. Automate tasks,
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

                <div className="container cont cont__py border transparent-border-black justify-center items-center text-center gap-8 bg-white">
                    <div className="flex flex-col gap-8">
                        <h2 className="h2">Embed Pricing</h2>
                        <p className="h2">Start from : $500/month + $0.0005/invocation</p>
                    </div>
                    <div>
                        <h3 className="text-2xl md:text-3xl text-nowrap font-medium text-accent">Pay as You Grow!</h3>
                        <p className="sub__h1 max-w-[700px]">
                            Starts after 2 year or once your customer count exceeds 1,000,whichever comes later
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-8">
                        <Link href="/signup">
                            <button className="btn btn-accent text-nowrap">START GROWING NOW</button>
                        </Link>
                        <Link href="/support">
                            <button className="btn btn-outline text-nowrap">Contact Sales</button>
                        </Link>
                    </div>
                </div>

                <div className="container cont cont__py bg-black text-white text-left gap-12 px-12">
                    <div className="flex flex-col gap-2">
                        <h2 className="h2 text-white">Start Showing Automation Use Cases on Your Platform</h2>
                        <p className="sub__h1">
                            Simply add the provided embed code to your blog or website, and instantly display real-world
                            automation examples that highlight how your app connects with others.
                        </p>
                    </div>
                    <Link href="https://viasocket.com/faq/viasocket-embed/Discover-the-Power-of-Automation-with-viasocket-Integration-Script">
                        <button className="btn bg-accent text-white hover:bg-white hover:text-black border-none">
                            Get your free embed code
                        </button>
                    </Link>
                </div>

                {blogData?.length > 0 && (
                    <div className="container">
                        <BlogGrid posts={blogData} />
                    </div>
                )}
                <div className="pb-4">
                    {faqData?.length > 0 && (
                        <div className="container border transparent-border-black p-20 border-b-0 bg-white">
                            <FAQSection faqData={faqData} faqName={'/embed'} />
                        </div>
                    )}
                    {getStartedData && (
                        <div className="container border transparent-border-black p-20 border-b-0 bg-white">
                            <GetStarted data={getStartedData} isHero={'false'} />
                        </div>
                    )}
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
        <div className="w-full h-full cont gap-12 p-2 sm:p-20">
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

export async function getServerSideProps() {
    const metaData = await getMetaData(METADATA_FIELDS, `filter=name='/embed'`);
    const navData = await getNavData(NAVIGATION_FIELDS);
    const footerData = await getFooterData(FOOTER_FIELDS);
    const faqData = await getFaqData(FAQS_FIELDS, `filter=page='/embed'`);
    const getStarted = await getGetStartedData(GETSTARTED_FIELDS);
    const embedData = await getEmbedData(EMBED_FIELDS);
    const blogTags = 'embed';
    const blogData = await getBlogData({ tag1: blogTags });
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
            navData: navData || [],
            footerData: footerData || [],
            blogData: blogData || [],
            faqData: faqData || [],
            getStartedData: getStarted || [],
            embedData: embedData || [],
            tableData: tableData,
            howItWorksData: howItWorksData,
            metaData: (metaData?.length > 0 && metaData[0]) || {},
        },
    };
}
