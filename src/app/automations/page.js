import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import NavbarServer from '../components/navbar/NavbarServer';
import { getAutomationsPageData } from '../lib/data';
import AutomationsClient from '../components/automations/AutomationsClient';

export const runtime = 'edge';

export default async function AutomationsPage() {
    const pageData = await getAutomationsPageData();

    return (
        <>
            <MetaHeadComp metaData={pageData.metaData} page={'/automations'} />
            <NavbarServer navbarData={pageData.navbarData} utm={'/automations'} />
            <AutomationsClient pageData={pageData} />
        </>
    );
}
