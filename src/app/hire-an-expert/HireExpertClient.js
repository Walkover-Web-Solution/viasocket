'use client';

import { setIntent } from '@/utils/intentUtils';
import { handleRedirect } from '@/utils/handleRedirection';
import Hero from './Hero';
import HowItWorks from './HowItWorks';
import Comparison from './Comparison';
import CaseStudies from './CaseStudies';
import TestimonialsCarousel from './TestimonialsCarousel';
import ReadyToAutomate from './ReadyToAutomate';

export default function HireExpertClient({}) {
    const handleHireClick = (e) => {
        setIntent('hireanexpert', 1);
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
