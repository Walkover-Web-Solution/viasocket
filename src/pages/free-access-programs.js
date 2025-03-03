import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import Navbar from '@/components/navbar/navbar';
import Link from 'next/link';
import Footer from '@/components/footer/footer';
import { getFooterData, getMetaData, getNavData, getProgramsData } from '@/utils/getData';
import { FOOTER_FIELDS, METADATA_FIELDS, NAVIGATION_FIELDS, PROGRAMS_FIELDS } from '@/const/fields';

export const runtime = 'experimental-edge';

export default function Programs({ footerData, navData, metaData, programs }) {
    return (
        <>
            <MetaHeadComp metaData={metaData} page={'/free-access-programs'} />
            <div className=" container">
                <Navbar navData={navData} utm={'/free-access-programs'} />
            </div>
            <div className="container cont cont__py cont__gap ">
                <div className="cont gap-2">
                    <h1 className="h1 w-1/2 ">Free services for impactful organisations</h1>
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
                        })}
                </div>
            </div>
            <div className="container pt-16 pb-4">
                <Footer footerData={footerData} />
            </div>
        </>
    );
}

export async function getServerSideProps() {
    const navData = await getNavData(NAVIGATION_FIELDS);
    const footerData = await getFooterData(FOOTER_FIELDS);
    const metaData = await getMetaData(METADATA_FIELDS, `filter=name='/free-access-programs'`);
    const programs = await getProgramsData(PROGRAMS_FIELDS);
    return {
        props: {
            navData: navData || [],
            footerData: footerData || [],
            metaData: (metaData?.length > 0 && metaData[0]) || {},
            programs: programs || [],
        },
    };
}
