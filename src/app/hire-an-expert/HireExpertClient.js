'use client';

import { useState } from 'react';
import Hero from './Hero';
import HowItWorks from './HowItWorks';
import Comparison from './Comparison';
import CaseStudies from './CaseStudies';
import TestimonialsCarousel from './TestimonialsCarousel';
import ReadyToAutomate from './ReadyToAutomate';
import HireModal from './hire-modal/HireModal';

export default function HireExpertClient({ securityGridData }) {
    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => setModalOpen(true);

    return (
        <div className="font-inter-tight text-[#222]">
            <Hero onHire={openModal} />
            <HowItWorks />
            <Comparison onHire={openModal} />
            <CaseStudies />
            <ReadyToAutomate onHire={openModal} />
            <TestimonialsCarousel />
            {modalOpen && <HireModal onClose={() => setModalOpen(false)} />}
        </div>
    );
}
