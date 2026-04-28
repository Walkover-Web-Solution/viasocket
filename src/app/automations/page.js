import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import NavbarServer from '../components/navbar/NavbarServer';
import ConditionalNavbar from '@/components/ConditionalLayout/ConditionalNavbar';
import { getAutomationsPageData } from '../lib/automation-data';
import AutomationsClient from '../components/automations/AutomationsClient';
import { getHasToken } from '../lib/getAuth';

export const runtime = 'edge';

export default async function AutomationsPage() {
    const pageData = await getAutomationsPageData();
    const hasToken = await getHasToken();

    return (
        <>
            <MetaHeadComp metaData={pageData.metaData} page={'/automations'} />
            <ConditionalNavbar>
                <NavbarServer navbarData={pageData.navbarData} utm={'/automations'} />
            </ConditionalNavbar>
            <AutomationsClient pageData={pageData} hasToken={hasToken} />
        </>
    );
}
