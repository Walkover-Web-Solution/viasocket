import Navbar from '@/components/navbar/navbar';
import FAQSection from '@/components/faqSection/faqSection';
import { getFooterData, getNavbarData, getBlackFridaySaleData } from '@/utils/getData';
import { FOOTER_FIELDS, NAVBAR_FIELDS, BLACKFRIDAYSALE_FIELDS } from '@/const/fields';
import { getMetaData } from '@/utils/getMetaData';
import { getFaqData } from '@/utils/getFaqData';
import Footer from '@/components/footer/footer';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
// import { MdSearch } from 'react-icons/md';
import { handleRedirect } from '@/utils/handleRedirection';
import { useRouter } from 'next/router';
import { getAppCount } from '@/utils/axiosCalls';
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import { MdLock } from "react-icons/md";
import { GoArrowUpRight } from "react-icons/go";
import Countdown from 'react-countdown';
import Marquee from "react-fast-marquee";

export const runtime = 'experimental-edge';

const FallbackImage = ({ src, fallbackSrc, alt, ...props }) => {
    const [imgSrc, setImgSrc] = useState(src);
    return (
        <Image
            alt={alt}
            src={imgSrc}
            onError={() => setImgSrc(fallbackSrc)}
            {...props}
        />
    );
};

const Deals = ({ footerData, navbarData, blackFridaySaleData, metaData, faqData }) => {
    const router = useRouter();
    return (
        <>
            <MetaHeadComp metaData={metaData} page={'/black-friday-sale'} />
            <Navbar navbarData={navbarData} />
            <div className='global-top-space relative'>
                <div className="flex items-center dotted-background h-[400px] justify-center">
                    <div className='flex flex-col items-center justify-center border custom-border p-4 mx-8 md:mx-auto sm:p-8 md:p-16 bg-[#faf9f6] text-center'>
                        <h1 className="text-6xl uppercase">
                            Black Friday <span className="text-accent">2025</span>
                        </h1>
                        <h2 className="text-2xl max-w-[650px]">
                            The biggest SaaS deals of the year.
                        </h2>
                    </div>
                </div>

                <div className="dotted-background">
                    <div className="bg-black mb-4">
                        <Marquee
                            speed={40}
                            autoFill
                            pauseOnHover={true}
                        >
                            <div className="inline-flex gap-8 py-2 text-gray-400 uppercase font-semibold text-sm border-black">
                                <p className='ml-4'>Black Friday <span className="text-white">Sale</span></p>
                                <p>Black Friday <span className="text-white">Sale</span></p>
                                <img src={'/assets/icons/featstar.svg'} alt="featstar" width={16} />
                                <p>Black Friday <span className="text-white">Sale</span></p>
                                <p>Black Friday <span className="text-white">Sale</span></p>
                                <img src={'/assets/icons/featbolt.svg'} alt="featbolt" width={16} />
                                <p>Black Friday <span className="text-white">Sale</span></p>
                                <p>Black Friday <span className="text-white">Sale</span></p>
                                <p>Black Friday <span className="text-white">Sale</span></p>
                                <img src={'/assets/icons/featstar.svg'} alt="featstar" width={16} />
                                <p>Black Friday <span className="text-white">Sale</span></p>
                                <p>Black Friday <span className="text-white">Sale</span></p>
                                <p>Black Friday <span className="text-white">Sale</span></p>
                                <img src={'/assets/icons/featbolt.svg'} alt="featbolt" width={16} />
                            </div>
                        </Marquee>
                    </div>

                    <div className="bg-black">
                        <Marquee
                            direction="right"
                            speed={40}
                            autoFill
                            pauseOnHover={true}
                        >
                            <div className="inline-flex gap-8 py-2 text-gray-400 uppercase font-semibold text-sm">
                                <p className='ml-4'>Lifetime Free Deals</p>
                                <p>up to 90% off</p>
                                <p>Free for one year</p>
                                <img src={'/assets/icons/featbolt.svg'} alt="featbolt" width={16} />
                                <p>Lifetime Free Deals</p>
                                <p>up to 90% off</p>
                                <p>Free for one year</p>
                                <img src={'/assets/icons/featstar.svg'} alt="featstar" width={16} />
                                <p>Lifetime Free Deals</p>
                                <p>up to 90% off</p>
                                <p>Free for one year</p>
                                <img src={'/assets/icons/featbolt.svg'} alt="featbolt" width={16} />
                                <p>Lifetime Free Deals</p>
                                <p>up to 90% off</p>
                                <p>Free for one year</p>
                                <img src={'/assets/icons/featstar.svg'} alt="featstar" width={16} />
                            </div>
                        </Marquee>
                    </div>
                </div>


                <div className="container cont pb-4 lg:gap-20 md:gap-16 gap-12 global-top-space">
                    <p className="min-w-fit lg:absolute lg:top-[40px] lg:right-[40px] m-auto border custom-border p-4 bg-[#faf9f6]">
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

                    <div className="grid md:grid-cols-[2fr_3fr] grid-cols-1 md:gap-12 gap-6 bg-white border custom-border">
                        <div className='flex flex-col justify-center items-start gap-4 p-6 md:p-12'>
                            <div className="flex items-center gap-2">
                                <Image
                                    src={'https://stuff.thingsofbrand.com/viasocket.com/images/imga_red-viasocket.png'}
                                    alt={'viaSocket'}
                                    width={36}
                                    height={36}
                                    className="w-9 h-9"
                                />
                                <h3 className='h3'>viaSocket</h3>
                            </div>
                            <h3 className="h3">
                                Free For Lifetime
                            </h3>
                            <p>Secure lifetime access to a complete automation platform with unlimited workflows and task executions across 1600+ integrations.</p>
                            <button
                                className={`btn btn-accent w-full mt-auto`}
                                aria-label="sign up"
                                onClick={(e) => handleRedirect(e, '/signup?', router)}
                            >
                                Grab your offer now
                            </button>
                        </div>
                        <div className="cont md:gap-6 gap-4 border-l bg-white p-6 lg:p-12 flex items-center justify-center flex-col lg:flex-row">
                            <div className="cont gap-3">
                                <span className="px-3 py-1 text-xs font-semibold text-white bg-black rounded-full w-fit">
                                    🎁  <span className="ml-2">One Time Bonus</span>
                                </span>
                                <p className="h3 text-accent font-bold">$100 Bonus</p>
                                <p className="text-gray-700 text-md">Use this to take help from experts</p>
                            </div>
                            <div className="flex items-center md:justify-center lg:flex-1 overflow-hidden">
                                <div className="flex -space-x-5">
                                    <Image
                                        src="/review-image/1.svg"
                                        alt="Customer support expert avatar"
                                        width={100}
                                        height={100}
                                        className="w-32 h-32"
                                    />
                                    <Image
                                        src="/review-image/2.svg"
                                        alt="Technical support expert avatar"
                                        width={100}
                                        height={100}
                                        className="w-32 h-32"
                                    />
                                    <Image
                                        src="/review-image/3.svg"
                                        alt="Automation specialist expert avatar"
                                        width={100}
                                        height={100}
                                        className="w-32 h-32"
                                    />
                                    <Image
                                        src="/review-image/4.svg"
                                        alt="Integration expert avatar"
                                        width={100}
                                        height={100}
                                        className="w-32 h-32"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {blackFridaySaleData?.map((item, index) => (
                            <div className="flex flex-col gap-4 border custom-border p-6 md:p-12 bg-white" key={`blackFridaySaleData-${index}`}>
                                <div className="flex items-center gap-2">
                                    <FallbackImage
                                        src={`https://thingsofbrand.com/api/icon/${(item?.appdomain || '').replace(/^https?:\/\//, '').replace(/\/$/, '')}`}
                                        fallbackSrc={`https://stuff.thingsofbrand.com/viasocket.com/images/imga_red-viasocket.png`}
                                        alt={item?.appname || ''}
                                        width={36}
                                        height={36}
                                        className="w-9 h-9"
                                    />
                                    <h3 className='h3'>{item?.appname || ''}</h3>
                                </div>
                                <h3 className='h3'>{item?.offer_tagline || ''}</h3>
                                <p className='mb-2'>{item?.offer_description || ''}</p>
                                <Link href={item?.offerpricing_url + '?utm_source=viaSocket&utm_medium=listing&utm_campaign=blackfriday2025'} target='_blank' className='btn btn-accent w-full mx-auto mt-auto'>View offer</Link>
                            </div>
                        ))}
                    </div>

                    <div className="border bg-white w-full max-w-[700px] mx-auto">
                        <div className="bg-white w-full md:pt-12 pt-6 gap-8 flex flex-col items-center justify-center text-center">
                            <p className='flex md:gap-2 px-6'>
                                <MdLock className='text-accent shrink-0' size={34} />
                                <span className="text-accent text-3xl font-semibold">
                                    Unlock 100+ More SaaS App Deals
                                </span>
                            </p>

                            <div className="text-black">
                                <p className="text-lg font-medium">Deals Go Live On:</p>
                                <p className="sm:text-4xl text-2xl font-semibold mt-1">28<span className="sm:text-3xl text-xl font-light align-top">th</span> Nov 2025</p>
                            </div>

                            <Countdown
                                date={new Date('2025-11-28')}
                                renderer={({ days, hours, minutes, seconds }) => (
                                    <div className="flex justify-between text-center w-full mx-auto border-t">
                                        <div className="flex-1 p-3 border-r border-gray-200">
                                            <div className="sm:text-4xl text-2xl font-semibold text-gray-900 leading-none">{days}</div>
                                            <div className="text-xs uppercase text-gray-500 mt-1">DAYS</div>
                                        </div>

                                        <div className="flex-1 p-3 border-r border-gray-200">
                                            <div className="sm:text-4xl text-2xl font-semibold text-gray-900 leading-none">{hours}</div>
                                            <div className="text-xs uppercase text-gray-500 mt-1">HOURS</div>
                                        </div>

                                        <div className="flex-1 p-3 border-r border-gray-200">
                                            <div className="sm:text-4xl text-2xl font-semibold text-gray-900 leading-none">{minutes}</div>
                                            <div className="text-xs uppercase text-gray-500 mt-1">MINUTES</div>
                                        </div>

                                        <div className="flex-1 p-3">
                                            <div className="sm:text-4xl text-2xl font-semibold text-gray-900 leading-none">{seconds}</div>
                                            <div className="text-xs uppercase text-gray-500 mt-1">SECONDS</div>
                                        </div>
                                    </div>
                                )}
                            />
                        </div>
                    </div>

                    <div className="cont lg:gap-20 md:gap-16 gap-12">
                        <div className="cont">
                            {faqData && faqData.length > 0 && <FAQSection faqData={faqData} faqName={`/black-friday-sale`} />}
                            <Footer footerData={footerData} />
                        </div>
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

    const metaData = await getMetaData('/black-friday-sale', pageUrl);
    const footerData = await getFooterData(FOOTER_FIELDS, '', pageUrl);
    const navbarData = await getNavbarData(NAVBAR_FIELDS, '', pageUrl);
    const faqData = await getFaqData('/black-friday-sale', pageUrl);
    const appCount = await getAppCount(pageUrl);
    const blackFridaySaleData = await getBlackFridaySaleData(BLACKFRIDAYSALE_FIELDS, '', pageUrl);

    return {
        props: {
            footerData: footerData || [],
            navbarData: navbarData || [],
            metaData: metaData || {},
            appCount: appCount || 0,
            blackFridaySaleData: blackFridaySaleData || [],
            faqData: faqData || [],
        },
    };
}