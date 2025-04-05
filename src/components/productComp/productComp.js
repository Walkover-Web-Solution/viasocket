import Image from 'next/image';
import Link from 'next/link';
import TrustedBy from '../trustedBy/trustedBy';
import TemplateSection from '../templateSection/templateSection';
import GetStarted from '../getStarted/getStarted';
import { FeaturesGrid } from '../featureGrid/featureGrid';

export default function ProductComp(props) {
    let pageData = props?.productData.find((page) => page?.name?.toLowerCase() === props?.page);

    const openChatWidget = () => {
        window.chatWidget.open();
    };

    return (
        <>
            <div className="mx-auto grid gap-24 w-full pt-20 ">
                <div className="grid gap-14 container">
                    <div className="grid gap-4 md:gap-10">
                        {pageData?.h3 && <h3 className="text-2xl">{pageData?.h3}</h3>}
                        <div className="grid gap-2 md:w-5/6 w=1/1">
                            {pageData?.h1 && <h1 className="md:text-6xl text-4xl font-medium ">{pageData?.h1}</h1>}
                            {pageData?.h2 && <h3 className="text-2xl">{pageData?.h2}</h3>}
                        </div>
                    </div>

                    <div className="flex flex-col gap-6 mb-4">
                        <div className="flex flex-col gap-6 mb-4">
                            <Link href="/experts" target="_blank" aria-label="hire a no-code builder">
                                <button className=" text-lg btn btn-accent w-fit " aria-label="hire a no-code builder">
                                    Hire a no-code builder
                                </button>
                            </Link>
                            <button
                                onClick={openChatWidget}
                                className="underline  w-fit font-normal text-lg"
                                aria-label="Click for our 24/7 AI & Team Support"
                            >
                                Click for our 24/7 AI & Team Support
                            </button>
                        </div>
                    </div>
                    {pageData?.hero_img[0] && (
                        <Image
                            className="w-full h-auto"
                            src={pageData?.hero_img[0] || 'https://placehold.co/40x40'}
                            width={1300}
                            height={800}
                            alt="Flow"
                        />
                    )}

                    <TrustedBy data={props?.trustedBy} />
                </div>
                {props?.features && <FeaturesGrid features={props?.features} page={props?.page} />}
                {props?.templatedata && <TemplateSection data={templates} />}
                {props?.tablevsspreadsheet && (
                    <div className="grid gap-10 container">
                        <h2 className="text-3xl font-semibold">Why use Tables instead of a spreadsheet?</h2>
                        <div className="grid md:grid-cols-2 grid-cols-1 gap-10">
                            {tablevsspreadsheet.map((reason, index) => {
                                return (
                                    <div className="grid gap-2" key={index}>
                                        <h3 className="font-semibold text-xl">{reason?.name}</h3>
                                        <p className="">{reason?.des}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
                {/* <div className="container">
                    <GetStarted data={props?.getStartedData} />
                </div> */}
            </div>
        </>
    );
}
