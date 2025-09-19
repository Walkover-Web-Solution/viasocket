import AgencyList from '@/components/agencyList/agnecyList';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import { MdArticle, MdChevronRight, MdOutlineArticle } from 'react-icons/md';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/components/footer/footer';
import Navbar from '@/components/navbar/navbar';
import { getAgencies, getExpertBlogs, getFooterData, getPageData } from '@/utils/getData';
import { AGENCIES_FIELDS, EXPERTBLOGS_FIELDS, FOOTER_FIELDS, PAGEDATA_FIELDS } from '@/const/fields';
import { getMetaData } from '@/utils/getMetaData';

export async function getServerSideProps(context) {
    const { req } = context;
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const pageUrl = `${protocol}://${req.headers.host}${req.url}`;

    const metaData = await getMetaData('/experts', pageUrl);
    const footerData = await getFooterData(FOOTER_FIELDS, '', pageUrl);
    const pageData = await getPageData(PAGEDATA_FIELDS, '', pageUrl);
    const verifiedAgencies = await getAgencies(AGENCIES_FIELDS, 'filter=verified=true', pageUrl);
    const notVerifiesAgencies = await getAgencies(AGENCIES_FIELDS, 'filter=verified IS NULL', pageUrl);
    const expertsBlog = await getExpertBlogs(EXPERTBLOGS_FIELDS, '', pageUrl);
    return {
        props: {
            verifiedAgencies: verifiedAgencies || [],
            notVerifiesAgencies: notVerifiesAgencies || [],
            pageData: (pageData?.length > 0 && pageData[0]) || {},
            metaData: metaData || {},
            expertsHelp: expertsBlog || [],
            footerData: footerData || [],
        },
    };
}
export const runtime = 'experimental-edge';

const Experts = ({ verifiedAgencies, notVerifiesAgencies, pageData, pathArray, metaData, expertsHelp, footerData }) => {
    return (
        <>
            <MetaHeadComp metaData={metaData} page={'/experts'} pathArray={pathArray} />
            <Navbar footerData={footerData} utm={'/experts'} />

            <div className="">
                <div className="pt-12 container">
                    <div className="flex flex-col">
                        {pageData?.h1 && (
                            <h1 className="h1">
                                Connect with <span className="text-accent">Automation Experts</span> for Your Business
                            </h1>
                        )}
                        {pageData?.h2 && (
                            <h3 className="sub__h1">
                                Find and work with experts to simplify your workflows and make the most of viaSocket.
                            </h3>
                        )}
                    </div>
                </div>

                <div className="flex flex-col gap-9 py-container container">
                    <h2 className="h2 ">Verified automation agencies by viaSocket</h2>
                    {verifiedAgencies.length > 0 && <AgencyList agencies={verifiedAgencies} type={'verified'} />}
                </div>
                <div className="flex flex-col gap-9 py-container container">
                    <h2 className="h2">Non-verified automation agencies</h2>
                    {notVerifiesAgencies.length > 0 && (
                        <AgencyList agencies={notVerifiesAgencies} type={'nonverified'} />
                    )}
                </div>

                <div className="container">
                    <div className=" bg-white border custom-border p-12">
                        <div className="cont gap-8">
                            <div className="grid md:grid-cols-2 grid-cols-1 gap-12 justify-between items-center">
                                <div className="flex flex-col gap-9  h-full justify-center">
                                    <h2 className="h2">
                                        Register your agency as our verified <br />
                                        Experts for automations.
                                    </h2>
                                    <ul className="list-disc flex flex-col gap-3 ps-4">
                                        <li>
                                            Lifetime free access To viasocket’s Team Plan with all advanced features
                                        </li>
                                        <li>Assistance in creating and troubleshooting complex workflows</li>
                                        <li>
                                            Customized Training sessions tailored to your specific needs and skill level
                                        </li>
                                        <li>Free access to our comprehensive educational resources</li>
                                        <li>Get your requested plugin live within 48 hours</li>
                                        <li>
                                            Showcase your expertise to a global audience by being featured on our
                                            dedicated Expert page
                                        </li>
                                        <li>
                                            Leverage our extensive network and client base to receive valuable referrals
                                        </li>
                                        <li>Enjoy a full year of free onboarding with our exclusive coupon code.</li>
                                    </ul>
                                    <Link target="_blank" href="https://tally.so/r/3NaYMp">
                                        <button className="btn btn-md btn-accent w-fit">Be an Expert</button>
                                    </Link>
                                </div>
                                <Image
                                    src={'/assets/img/expertpage.png'}
                                    className=""
                                    width={1080}
                                    height={1080}
                                    alt="be an expert image"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-9 py-container container">
                    <h2 className="h2">How experts can help?</h2>
                    <div className="mt-6 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 justify-center md:justify-start gap-6">
                        {expertsHelp &&
                            expertsHelp.map((expertsHelpBlog, index) => {
                                return (
                                    <div key={index} className="flex flex-col gap-4 bg-white p-6 border custom-border">
                                        <MdOutlineArticle color="#8F9396" fontSize={36} />
                                        <p className="text-xl ">{expertsHelpBlog?.description}</p>
                                        {expertsHelpBlog?.link && (
                                            <Link
                                                target="_blank"
                                                href="https://viasocket.com/faq/partners/experts-partner-program"
                                                className="flex items-center mt-auto text-[#4485F2]"
                                            >
                                                Learn More <MdChevronRight fontSize={22} />
                                            </Link>
                                        )}
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
            <div className="container pb-4">
                <Footer footerData={footerData} />
            </div>
        </>
    );
};
export default Experts;
