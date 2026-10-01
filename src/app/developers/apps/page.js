import Header from '../Header';
import Footer from '../Footer';
import AppsDirectory from './AppsDirectory';

export const runtime = 'edge';

export async function generateMetadata() {
    return {
        title: 'AI actions for 2,300+ apps · viaSocket Action Layer',
        description: "Give your AI agents access to actions across thousands of apps. Browse AI integrations for HubSpot, Salesforce, Slack, Gmail, Shopify and more.",
    };
}

export default function AppsPage() {
    return (
        <>
            <Header />
            <AppsDirectory />
            <Footer />
        </>
    );
}
