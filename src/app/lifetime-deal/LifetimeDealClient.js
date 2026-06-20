import Hero from './Hero';
import HowItWorks from './HowItWorks';
import AIWorkflows from './AIWorkflows';
import Integrations from './Integrations';
import Pricing from './Pricing';
import Unlock from './Unlock';
import Comparison from './Comparison';
import Testimonials from './Testimonials';
import Faq from './Faq';
import FinalCta from './FinalCta';
import LifetimeDealFooter from './LifetimeDealFooter';

export default function LifetimeDealClient({ reviewData = [], appCount = 0 }) {
    return (
        <div className="font-sans text-gray-900 bg-white">
            <Hero />
            <Comparison />
            <HowItWorks />
            <AIWorkflows />
            <Integrations appCount={appCount} />
            <Pricing />
            <Unlock appCount={appCount} />
            <Testimonials reviewData={reviewData} />
            <Faq />
            <FinalCta />
            <LifetimeDealFooter appCount={appCount} />
        </div>
    );
}
