import ErrorComp from '@/components/404/404Comp';
import { getDbdashData } from './api';
import Head from 'next/head';
import { getFooterData, getNavData } from '@/utils/getData';
import { FOOTER_FIELDS, NAVIGATION_FIELDS } from '@/const/fields';

const NoPage = ({ pathArray, navData, footerData }) => {
    return (
        <>
            <Head>
                <title>{'404 - Page not found'}</title>
            </Head>
            <ErrorComp pathArray={pathArray} navData={navData} footerData={footerData} />
        </>
    );
};
export default NoPage;
export async function getStaticProps() {
    const navData = await getNavData(NAVIGATION_FIELDS);
    const footerData = await getFooterData(FOOTER_FIELDS);

    return {
        props: {
            navData: navData || [],
            footerData: footerData || [],
        },
    };
}
