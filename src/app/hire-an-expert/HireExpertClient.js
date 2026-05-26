'use client';

import { useState } from 'react';
import Hero from './Hero';
import HowItWorks from './HowItWorks';
import Comparison from './Comparison';
import CaseStudies from './CaseStudies';
import TestimonialsCarousel from './TestimonialsCarousel';
import ShowBadges from '../components/home/ShowBadges';
import HireModal from './hire-modal/HireModal';
import SecuritySection from '../components/SecuritySection';

export default function HireExpertClient({ securityGridData }) {
    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => setModalOpen(true);

    return (
        <div className="font-inter-tight text-[#222]">
            <Hero onHire={openModal} />
            <HowItWorks />
            <Comparison onHire={openModal} />
            <CaseStudies />
            <TestimonialsCarousel />
            <ShowBadges />
            <SecuritySection securityGridData={securityGridData} />
            {modalOpen && <HireModal onClose={() => setModalOpen(false)} />}
        </div>
    );
}
