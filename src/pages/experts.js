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
    const agencies = await getAgencies(AGENCIES_FIELDS, '', pageUrl);
    const expertsBlog = await getExpertBlogs(EXPERTBLOGS_FIELDS, '', pageUrl);
    return {
        props: {
            agencies: agencies || [],
            pageData: (pageData?.length > 0 && pageData[0]) || {},
            metaData: metaData || {},
            expertsHelp: expertsBlog || [],
            footerData: footerData || [],
        },
    };
}
export const runtime = 'experimental-edge';

const Experts = ({ agencies, pageData, pathArray, metaData, expertsHelp, footerData }) => {
    let verifiedArr = [];
    let nonVerifiedArr = [];

    // Iterate through the objects and categorize them
    if (agencies.length > 0) {
        agencies.forEach((obj) => {
            switch (obj.verified) {
                case true:
                    verifiedArr.push(obj);
                    break;

                default:
                    nonVerifiedArr.push(obj);
                    break;
            }
        });
    }
    return (
        <>
            <MetaHeadComp metaData={metaData} page={'/experts'} pathArray={pathArray} />
            <Navbar footerData={footerData} utm={'/experts'} />

            <div className="">
                <div className=" py-container container">
                    <div className="flex flex-col">
                        {pageData?.h3 && <h3 className="h6 text-accent">{pageData?.h3}</h3>}
                        {pageData?.h1 && <h1 className="h1">{pageData?.h1}</h1>}
                        {pageData?.h2 && <h3 className="sub__h1">{pageData?.h2}</h3>}
                    </div>
                </div>

                <div className="flex flex-col gap-9 py-container container">
                    <h2 className="h2 ">Verified automation agencies by viaSocket</h2>
                    {verifiedArr.length > 0 && <AgencyList agencies={verifiedArr} type={'verified'} />}
                </div>
                <div className="flex flex-col gap-9 py-container container">
                    <h2 className="h2">Non-verified automation agencies</h2>
                    {nonVerifiedArr.length > 0 && <AgencyList agencies={nonVerifiedArr} type={'nonverified'} />}
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
                                    <Link target="_blank" href="https://cal.id/team/viasocket/superheros">
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
                                                href={expertsHelpBlog?.link}
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
