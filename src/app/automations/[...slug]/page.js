import Footer from '@/components/footer/footer';
import NavbarOptimized from '../../components/navbar/NavbarOptimized';
import { getAutomationSlugPageData } from '../../lib/data';
import AutomationSlugClient from '@/app/components/automations/AutomationSlugClient';

export const runtime = 'experimental-edge';

export default async function AutomationSlugPage({ params }) {
    const pageData = await getAutomationSlugPageData(params.slug || []);

    return (
        <div className="dotted-background global-top-space">
            <NavbarOptimized navbarData={pageData.navbarData} utm={'/automations'} />
            <AutomationSlugClient pageData={pageData} />
            <div className="pt-20 pb-4 container">
                <Footer footerData={pageData.footerData} />
            </div>
        </div>
    );
}
