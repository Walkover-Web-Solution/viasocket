import ErrorComp from '@/components/404/404Comp';
import Head from 'next/head';


const NoPage = () => {
    return (
        <>
            <Head>
                <title>{'404 - Page not found'}</title>
            </Head>
            <ErrorComp  />
        </>
    );
};
export default NoPage;

