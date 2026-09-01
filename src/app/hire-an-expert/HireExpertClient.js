'use client';

import { setIntent } from '@/utils/userIntentTracker';
import { handleRedirect } from '@/utils/handleRedirection';
import { trackInteraction } from '@/utils/trackVisitor';
import Hero from './Hero';
import HowItWorks from './HowItWorks';
import Comparison from './Comparison';
import CaseStudies from './CaseStudies';
import TestimonialsCarousel from './TestimonialsCarousel';
import ReadyToAutomate from './ReadyToAutomate';

export default function HireExpertClient({}) {
    const handleHireClick = (e) => {
        setIntent('hireanexpert');
        // Three sections share this one handler rather than three buttons, so the
        // press is reported here instead of by a data-track attribute on markup
        // this component does not own.
        trackInteraction({
            element: 'hire_expert_signup',
            section: 'main',
            action: 'signup_click',
            label: 'Hire an expert',
            destinationUrl: '/signup',
        });
        handleRedirect(e, '/signup?', null, 'hire-an-expert');
    };

    return (
        <div className="font-inter-tight text-[#222]">
            <Hero onHire={handleHireClick} />
            <HowItWorks />
            <Comparison onHire={handleHireClick} />
            <CaseStudies />
            <ReadyToAutomate onHire={handleHireClick} />
            <TestimonialsCarousel />
        </div>
    );
}
