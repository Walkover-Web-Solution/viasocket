import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import Footer from '@/components/footer/footer';
import NavbarServer from '../components/navbar/NavbarServer';
import ConditionalNavbar from '@/components/ConditionalLayout/ConditionalNavbar';
import ConditionalFooter from '@/components/ConditionalLayout/ConditionalFooter';
import { getFooterData, getNavbarData } from '@/utils/getData';
import { FOOTER_FIELDS, NAVBAR_FIELDS } from '@/const/fields';
import { getMetaData } from '@/utils/getMetaData';
import HireExpertClient from './HireExpertClient';

export const runtime = 'edge';

export async function generateMetadata() {
    const metaData = await getMetaData('/hire-an-expert', '/hire-an-expert').catch(() => null);
    return {
        title: metaData?.title || 'Hire an Expert · viaSocket',
        description:
            metaData?.description ||
            'Hire a vetted viaSocket automation expert. Describe your workflow, get an AI-powered scope, pick add-ons, and book a kickoff call in minutes.',
        keywords: metaData?.keywords || 'hire automation expert, viaSocket consultant, workflow automation, integration expert',
        openGraph: {
            title: metaData?.title || 'Hire an Expert · viaSocket',
            description:
                metaData?.description ||
                'Hire a vetted viaSocket automation expert. AI-scoped, fixed-price, delivered fast.',
            images: metaData?.image ? [{ url: metaData.image }] : undefined,
        },
    };
}

export default async function HireAnExpertPage() {
    const [footerData, navbarData] = await Promise.all([
        getFooterData(FOOTER_FIELDS, '', '/hire-an-expert').catch(() => null),
        getNavbarData(NAVBAR_FIELDS, '', '/hire-an-expert').catch(() => null),
    ]);

    const metaData = await getMetaData('/hire-an-expert', '/hire-an-expert').catch(() => null);

    return (
        <>
            <MetaHeadComp metaData={metaData} page={'/hire-an-expert'} />
            <ConditionalNavbar>
                <NavbarServer navbarData={navbarData} utm={'/hire-an-expert'} />
            </ConditionalNavbar>

            <div className="global-top-space bg-[#faf9f4]">
                <HireExpertClient />
            </div>

            <div className="container pb-4">
                <ConditionalFooter>
                    <Footer footerData={footerData} />
                </ConditionalFooter>
            </div>
        </>
    );
}
