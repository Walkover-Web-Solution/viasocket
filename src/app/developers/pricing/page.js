import Header from '../Header';
import Footer from '../Footer';
import Faq from '../Faq';
import PricingTop from './PricingTop';
import Ladder from './Ladder';
import CompareRows from './CompareRows';
import { FastValues, EnterpriseCta } from './FastValues';

export const runtime = 'edge';

export async function generateMetadata() {
    return {
        title: 'Pricing · viaSocket',
        description: 'Everything you need to add actions and integrations to your AI product. Pay only for what you use.',
    };
}

const PRICING_FAQS = [
    ['What is a Task?', 'A Task is one action executed through the Action Layer. For example, creating a HubSpot contact, sending an email through Gmail, or updating a Salesforce record counts as one Task.'],
    ['Do I pay separately for integrations?', 'No. All plans include access to 2,300+ apps. Your pricing is based on the number of Tasks your product uses.'],
    ['What happens when I reach my Task limit?', 'You can move to a higher usage plan as your product grows. Enterprise customers can also get custom limits.'],
    ['Can I use the Action Layer for multiple customers?', 'Yes. Multi-tenant support lets each of your customers have their own connections, credentials, and permissions.'],
    ['Can I use my own branding?', 'Yes. Custom branding and white-label capabilities are available on Growth and higher plans.'],
    ['Can I try it before paying?', 'Yes. The Free plan includes 100K Tasks per month, so you can build and test your Action Layer without paying upfront.'],
    ['How quickly can I get started?', 'You can get your Action Layer live in under 15 minutes using our setup flow and developer resources.'],
    ['Do you offer annual billing?', 'Yes. Growth and Scale are available with annual billing at $290/year and $990/year respectively — roughly two months free.'],
    ['Do you offer an SLA?', 'Scale includes a 99.9% SLA. Enterprise customers can get a custom SLA based on their requirements.'],
    ['What support do I get?', 'Free includes community support. Paid plans include Slack support, with priority and dedicated support available on higher plans.'],
];

export default function PricingPage() {
    return (
        <>
            <div className="max-w-[1080px] mx-auto px-[clamp(20px,5vw,64px)]">
                <Header />
            </div>
            <PricingTop />
            <Ladder />
            <CompareRows />
            <FastValues />
            <EnterpriseCta />
            <Faq items={PRICING_FAQS} title="Pricing questions, answered." />
            <Footer />
        </>
    );
}
