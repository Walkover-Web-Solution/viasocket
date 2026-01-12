import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import NavbarOptimized from '../components/navbar/NavbarOptimized';
import { getAutomationsPageData } from '../lib/data';
import AutomationsClient from '../components/automations/AutomationsClient';

export const runtime = 'edge';

export default async function AutomationsPage() {
    const pageData = await getAutomationsPageData();

    return (
        <>
            <MetaHeadComp metaData={pageData.metaData} page={'/automations'} />
            <NavbarOptimized navbarData={pageData.navbarData} utm={'/automations'} />
            <AutomationsClient pageData={pageData} />
        </>
    );
}
