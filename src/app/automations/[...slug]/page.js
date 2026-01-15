import Footer from '@/components/footer/footer';
import NavbarServer from '../../components/navbar/NavbarServer';
import { getAutomationSlugPageData } from '../../lib/data';
import AutomationSlugClient from '@/app/components/automations/AutomationSlugClient';
import FaqSection from '@/components/faqSection/faqSection';

export const runtime = 'edge';

export default async function AutomationSlugPage({ params }) {
    const paramsData = await params;
    const pageData = await getAutomationSlugPageData(paramsData.slug || []);

    return (
        <div className="dotted-background global-top-space">
            <NavbarServer navbarData={pageData.navbarData} utm={'/automations'} />
            <AutomationSlugClient pageData={pageData} />
            <div className="pt-20 pb-4">
                {pageData.faqData?.length > 0 && (
                    <FaqSection faqData={pageData.faqData} faqName={'/automation'} />
                )}
                <div className="container">
                    <Footer footerData={pageData.footerData} />
                </div>
            </div>
        </div>
    );
}
