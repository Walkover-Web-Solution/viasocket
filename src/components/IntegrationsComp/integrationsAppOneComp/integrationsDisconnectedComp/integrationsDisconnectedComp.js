import Image from 'next/image';
import Link from 'next/link';
import { MdAdd, MdArrowOutward, MdChevronRight, MdOpenInNew } from 'react-icons/md';
import FAQSection from '@/components/faqSection/faqSection';
import Footer from '@/components/footer/footer';
import BlogGrid from '@/components/blogGrid/blogGrid';
import { LinkText } from '@/components/uiComponents/buttons';
import createURL from '@/utils/createURL';
import IntegrationsHeadComp from '../../integrationsHeadComp/integrationsHeadComp';
import IntegrationsEventsComp from '../../integrationsEventsComp/integrationsEventsComp';
import Navbar from '@/components/navbar/navbar';
import ExternalLink from '@/utils/ExternalLink';

export default function IntegrationsDisconnectedComp({
    appOneDetails,
    pageInfo,
    integrationsInfo,
    faqData,
    footerData,
    blogsData,
    metaData,
    getDoFollowUrlStatusArray
}) {
    return (
        <div
            style={{
                borderLeftColor: appOneDetails?.brandcolor,
                borderLeftWidth: '10px',
            }}
            className="cont gap-12 md:gap-16 lg:gap-20"
        >
            <Navbar footerData={footerData} utm={'/integrations/appone'} />
            <IntegrationsHeadComp
                metaData={metaData}
                page={'/integrations/AppOne'}
                plugins={[appOneDetails]}
                type={'appOne'}
                pageInfo={pageInfo}
                integrationsInfo={integrationsInfo}
            />

            <div className="container cont cont__gap  ">
                <div className="flex items-center gap-2 text-lg">
                    <Link href={createURL(`/integrations`)} className="flex items-center gap-0 underline">
                        Integrations{' '}
                    </Link>
                    <MdChevronRight fontSize={22} />
                    <Link
                        href={createURL(`/integrations/${appOneDetails?.appslugname}`)}
                        className="flex items-center gap-0 underline"
                    >
                        {appOneDetails?.name}
                    </Link>
                </div>
                <div className="cont gap-4">
                    <div className="cont">
                        <h1 className="h1  ">{`Your ${appOneDetails?.name} Access is Disconnected`}</h1>
                        <div>
                            <span class="sub__h1">
                                Your {appOneDetails?.name} access has been disconnected, which may disrupt your
                                workflows. Reconnect now to restore seamless access.
                                {appOneDetails?.name === 'QuickBooks' ? (
                                    <a
                                        target="_blank"
                                        href="https://viasocket.com/faq/integration-guides/How-to-Reconnect-QuickBooks-with-viaSocket-"
                                        class="text-blue-500 underline"
                                    >
                                        {' '}
                                        How to Reconnect?
                                    </a>
                                ) : (
                                    ''
                                )}
                            </span>
                        </div>
                        {}
                    </div>
                    <Link
                        target="_blank"
                        href={`${process.env.NEXT_PUBLIC_FLOW_URL}/connect/${appOneDetails?.rowid}`}
                        rel="nofollow"
                    >
                        <button className="btn btn-primary">
                            Reconnect {appOneDetails?.name} <MdOpenInNew />{' '}
                        </button>
                    </Link>
                </div>
            </div>

            {appOneDetails?.events && appOneDetails?.events?.length > 0 && (
                <div className="container cont gap-4">
                    <h2 className="h2">Actions and Triggers</h2>
                    <IntegrationsEventsComp appOneDetails={appOneDetails} />
                </div>
            )}
            {blogsData?.length > 0 && (
                <div className="container ">
                    {' '}
                    <BlogGrid posts={blogsData} />
                </div>
            )}

            <div className="container pb-4 cont">
                {faqData && <FAQSection faqData={faqData} />}
                <div className="flex flex-col md:flex-row border border-x-0 border-b-0 custom-border bg-white">
                    <div className="cont gap-4 p-12 border-x border-b md:border-b-0 custom-border w-full ">
                        <div>
                            <Image
                                className="h-10 w-fit"
                                src={appOneDetails?.iconurl || 'https://placehold.co/36x36'}
                                width={36}
                                height={36}
                                alt={appOneDetails?.name}
                            />
                            <h3>About {appOneDetails?.name}</h3>
                        </div>
                        <p>{appOneDetails?.description}</p>
                        <ExternalLink
                            href={
                                appOneDetails?.domain.startsWith('http')
                                    ? appOneDetails?.domain
                                    : 'http://' + appOneDetails?.domain
                            }
                            appSlugName={appOneDetails?.appslugname}
                            doFollowArray={getDoFollowUrlStatusArray}
                        >
                            <LinkText children={'Learn More'} />
                        </ExternalLink>
                    </div>
                    <div className="w-full border-r border-l md:border-l-0 custom-border cont gap-4 p-12">
                        <div>
                            <Image
                                className="h-10 w-fit"
                                src={'/assets/brand/fav_ico.svg'}
                                width={36}
                                height={36}
                                alt="viaSocket"
                            />
                            <h3>About viaSocket</h3>
                        </div>
                        <p>
                            viasocket is an innovative and versatile workflow automation platform designed to streamline
                            and simplify the integration of your favorite applications and to
                        </p>
                        <Link href={'/'}>
                            <LinkText children={'Learn More'} />
                        </Link>
                    </div>
                </div>

                <Footer footerData={footerData} />
            </div>
        </div>
    );
}
