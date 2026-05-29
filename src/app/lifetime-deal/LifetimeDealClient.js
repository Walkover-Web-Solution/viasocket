import Navbar from './Navbar';
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

export default function LifetimeDealClient() {
    return (
        <div className="font-sans text-gray-900 bg-white">
            <Navbar />
            <Hero />
            <HowItWorks />
            <AIWorkflows />
            <Integrations />
            <Pricing />
            <Unlock />
            <Comparison />
            <Testimonials />
            <Faq />
            <FinalCta />
        </div>
    );
}
