import Navbar from '@/components/navbar/navbar';
import { getFooterData, getNavbarData, getBlackFridaySaleData } from '@/utils/getData';
import { FOOTER_FIELDS, NAVBAR_FIELDS, BLACKFRIDAYSALE_FIELDS } from '@/const/fields';
import { getMetaData } from '@/utils/getMetaData';
import Footer from '@/components/footer/footer';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
// import { MdSearch } from 'react-icons/md';
import { handleRedirect } from '@/utils/handleRedirection';
import { useRouter } from 'next/router';
import { GiCheckMark } from 'react-icons/gi';
import { getAppCount, getApps } from '@/utils/axiosCalls';
import Image from 'next/image';
import Link from 'next/link';
import { MdLock } from "react-icons/md";
import { GoArrowUpRight } from "react-icons/go";

export const runtime = 'experimental-edge';

const Deals = ({ footerData, navbarData, appCount, blackFridaySaleData, apps, metaData }) => {
    const router = useRouter();
    return (
        <>
            <MetaHeadComp metaData={metaData} page={'/deals'} />
            <Navbar navbarData={navbarData} />
            <div className="container cont pb-4 pt-12 lg:gap-20 md:gap-16 gap-12 global-top-space relative">
                <div className="flex flex-col items-center">
                    <h1 className="text-6xl uppercase">
                        Black Friday Sale
                    </h1>
                    <h2 className="text-2xl max-w-[650px]">
                        The biggest SaaS deals of the year.
                    </h2>
                </div>

                <p className="min-w-fit lg:absolute lg:top-[40px] lg:right-[40px] m-auto">
                    <span className="text-base">Want to list your app for sale?</span>
                    <Link
                        href="https://tally.so/r/D42g25"
                        target="_blank"
                        className="text-accent text-xs flex items-center gap-1"
                    >
                        Apply before 28th Nov 2025 <GoArrowUpRight />
                    </Link>
                </p>

                {/* <div className="flex flex-col items-center">
                    <label className="input border w-full sm:w-auto md:min-w-[460px] custom-border flex items-center gap-2 focus-within:outline-none bg-white">
                        <MdSearch fontSize={20} />
                        <input
                            placeholder='search'
                            type="text"
                        />
                    </label>
                </div> */}

                <div className="flex gap-12 justify-center items-center flex-wrap bg-black border custom-border text-white">
                    <div className='flex flex-col justify-center items-center gap-8 p-6 md:p-12'>
                        <h2 className="h2">
                            viaSocket is Free For Lifetime
                        </h2>
                        <div className='flex justify-center gap-8 items-center flex-wrap'>
                            <div className="flex items-center gap-2">
                                <GiCheckMark className="text-accent" />
                                <p className="sub__h1">Unlimited Automations</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <GiCheckMark className="text-accent" />
                                <p className="sub__h1">Unlimited Tasks</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <GiCheckMark className="text-accent" />
                                <p className="sub__h1">Connect to {+appCount + 300}+ apps</p>
                            </div>
                        </div>
                        <button
                            className={`flex text-center justify-center gap-1 btn bg-accent text-white hover:bg-white hover:text-black border-none`}
                            aria-label="sign up"
                            onClick={(e) => handleRedirect(e, '/signup?', router)}
                        >
                            Grab your offer now
                        </button>
                    </div>
                </div>

                <div className="flex flex-row gap-4 flex-wrap justify-center items-center">
                    {blackFridaySaleData?.map((item, index) => (
                        <div className="flex flex-col gap-4 border custom-border p-6 bg-white max-w-[500px]" key={`blackFridaySaleData-${index}`}>
                            <div className="flex items-center gap-2">
                                <Image
                                    src={`https://thingsofbrand.com/api/icon/${item?.appdomain}`}
                                    alt={item?.appname || ''}
                                    width={36}
                                    height={36}
                                    className="w-9 h-9"
                                />
                                <h3 className='h3'>{item?.appname || ''}</h3>
                            </div>
                            <h3 className='h3'>{item?.offer_tagline || ''}</h3>
                            <p>{item?.offer_description || ''}</p>
                            <Link href={item?.offerpricing_url || ''} target='_blank' className='btn btn-accent w-full'>View offer</Link>
                        </div>
                    ))}
                </div>

                <div className='flex flex-col gap-4 justify-center items-center p-6 lg:p-12 bg-white border custom-border w-fit m-auto'>
                    <h2 className="h2 flex items-center gap-2">
                        <MdLock className='text-accent shrink-0 !text-[44px]' />
                        <span>Unlock 100+ more SaaS app deals on</span>
                    </h2>
                    <h2 className="h2"> 28th Nov 2025</h2>
                </div>

                <div className="cont lg:gap-20 md:gap-16 gap-12">
                    <div className="cont">
                        <Footer footerData={footerData} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Deals;

export async function getServerSideProps(context) {
    const { req } = context;
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const pageUrl = `${protocol}://${req.headers.host}${req.url}`;

    const metaData = await getMetaData('/deals', pageUrl);
    const footerData = await getFooterData(FOOTER_FIELDS, '', pageUrl);
    const navbarData = await getNavbarData(NAVBAR_FIELDS, '', pageUrl);
    const appCount = await getAppCount(pageUrl);
    const blackFridaySaleData = await getBlackFridaySaleData(BLACKFRIDAYSALE_FIELDS, '', pageUrl);
    const apps = await getApps('', pageUrl);

    console.log(apps, 'apps');

    return {
        props: {
            footerData: footerData || [],
            navbarData: navbarData || [],
            metaData: metaData || {},
            appCount: appCount || 0,
            blackFridaySaleData: blackFridaySaleData || [],
            apps: apps || [],
        },
    };
}