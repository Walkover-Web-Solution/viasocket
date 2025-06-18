import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import Navbar from '@/components/navbar/navbar';
import Link from 'next/link';
import Footer from '@/components/footer/footer';
import { getFooterData, getProgramsData } from '@/utils/getData';
import { FOOTER_FIELDS, PROGRAMS_FIELDS } from '@/const/fields';
import { getMetaData } from '@/utils/getMetaData';

export const runtime = 'experimental-edge';

export default function Programs({ footerData, metaData, programs }) {
    return (
        <>
            <MetaHeadComp metaData={metaData} page={'/free-access-programs'} />
            <Navbar footerData={footerData} utm={'/free-access-programs'} />

            <div className="container cont cont__py cont__gap">
                <div className="cont gap-2">
                    <h1 className="h1 ">
                        <span className="text-accent"> Free services </span> for impactful organisations
                    </h1>
                    <h2 className="sub__h1">
                        So, you can focus on meaningful work, driving innovation and creating lasting impact.
                    </h2>
                </div>
                {/* <button className="btn btn-rg btn-primary">Click here</button> */}
            </div>
            <div className="container">
                <div
                    className={`feature_grid grid grid-cols-2 md:grid-rows-4 grid-rows-5   xl:h-[1100px] md:h-[820px] h-[800px] bg-gray-500 `}
                >
                    {programs?.length > 0 &&
                        programs?.map((item, index) => {
                            // For exactly 6 items scenario
                            if (programs.length === 6) {
                                if (index === 0) {
                                    return (
                                        <Link
                                            key={index}
                                            href={`/signup?utm_source=programs`}
                                            className={`md:col-span-1 col-span-2 row-span-1 flex flex-col gap-1 items-center justify-center p-5 text-center grid-block`}
                                        >
                                            <h2 className="text-white h2">{item?.name}</h2>
                                            <p className="text-white sub__h2">{item?.tagine}</p>
                                        </Link>
                                    );
                                } else if (index === 1) {
                                    return (
                                        <Link
                                            key={index}
                                            href={`/signup?utm_source=programs`}
                                            className={`md:col-span-1 col-span-2 md:row-span-2 row-span-1 flex flex-col gap-1 items-center justify-center p-5 text-center grid-block`}
                                        >
                                            <h2 className="text-white h2">{item?.name}</h2>
                                            <p className="text-white sub__h2">{item?.tagine}</p>
                                        </Link>
                                    );
                                } else if (index === 2) {
                                    return (
                                        <Link
                                            key={index}
                                            href={`/signup?utm_source=programs`}
                                            className={`md:col-span-1 col-span-2 md:row-span-2 row-span-1 flex flex-col gap-1 items-center justify-center p-5 text-center grid-block`}
                                        >
                                            <h2 className="text-white h2">{item?.name}</h2>
                                            <p className="text-white sub__h2">{item?.tagine}</p>
                                        </Link>
                                    );
                                } else if (index === 3) {
                                    return (
                                        <Link
                                            key={index}
                                            href={`/signup?utm_source=programs`}
                                            className={`md:col-span-1 col-span-2 row-span-1 flex flex-col gap-1 items-center justify-center p-5 text-center grid-block`}
                                        >
                                            <h2 className="text-white h2">{item?.name}</h2>
                                            <p className="text-white sub__h2">{item?.tagine}</p>
                                        </Link>
                                    );
                                } else if (index === 4) {
                                    // Make 5th item smaller (1/3)
                                    return (
                                        <Link
                                            key={index}
                                            href={`/signup?utm_source=programs`}
                                            className={`col-span-1 flex flex-col gap-1 items-center justify-center p-5 text-center grid-block`}
                                        >
                                            <h2 className="text-white h2">{item?.name}</h2>
                                            <p className="text-white sub__h2">{item?.tagine}</p>
                                        </Link>
                                    );
                                } else {
                                    // Make 6th item larger (2/3)
                                    return (
                                        <Link
                                            key={index}
                                            href={`/signup?utm_source=programs`}
                                            className={`col-span-1 flex flex-col gap-1 items-center justify-center p-5 text-center grid-block`}
                                        >
                                            <h2 className="text-white h2">{item?.name}</h2>
                                            <p className="text-white sub__h2">{item?.tagine}</p>
                                        </Link>
                                    );
                                }
                            } else {
                                // Original code for other numbers of items
                                return (
                                    <Link
                                        key={index}
                                        href={`/signup?utm_source=programs`}
                                        className={`${index % 5 === 0 ? 'md:col-span-1 col-span-2 row-span-1' : index % 5 === 1 ? 'md:col-span-1 col-span-2 md:row-span-2 row-span-1' : index % 5 === 2 ? 'md:col-span-1 col-span-2 md:row-span-2 row-sapn-1' : index % 5 === 3 ? 'md:col-span-1 col-span-2 row-span-1' : 'col-span-2 row-span-1'} flex flex-col gap-1 items-center justify-center p-5 text-center grid-block`}
                                    >
                                        <h2 className="text-white h2">{item?.name}</h2>
                                        <p className="text-white sub__h2">{item?.tagine}</p>
                                    </Link>
                                );
                            }
                        })}
                </div>
            </div>
            <div className="container pt-16 pb-4">
                <Footer footerData={footerData} />
            </div>
        </>
    );
}
export async function getServerSideProps(context) {
    const { req } = context;
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const pageUrl = `${protocol}://${req.headers.host}${req.url}`;

    const footerData = await getFooterData(FOOTER_FIELDS, '', pageUrl);
    const metaData = await getMetaData('/free-access-programs', pageUrl);
    const programs = await getProgramsData(PROGRAMS_FIELDS, '', pageUrl);
    return {
        props: {
            footerData: footerData || [],
            metaData: metaData || {},
            programs: programs || [],
        },
    };
}
