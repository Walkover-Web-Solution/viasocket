'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Check, ChevronLeft, Lock, X } from 'lucide-react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
import { ADDON_PRICES } from './addons';

const TITLES = {
    1: { title: 'Tell us about your project', sub: "We'll use this to generate a tailored scope and quote." },
    2: { title: 'Analysing your project…', sub: 'Our AI is matching your needs with the right expert.' },
    3: { title: 'Your tailored assessment', sub: 'Review the proposed scope and pick optional add-ons.' },
    4: { title: 'Secure checkout', sub: 'Payment is held in escrow until you approve the kickoff.' },
    5: { title: 'Book your kickoff call', sub: 'Pick a time that works — your expert will join you.' },
};

export default function HireModal({ onClose }) {
    const [step, setStep] = useState(1);
    const [project, setProject] = useState({
        title: '',
        description: '',
        apps: '',
        budget: '',
        timeline: '',
    });
    const [selectedAddons, setSelectedAddons] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    // Lock scroll
    useEffect(() => {
        const orig = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = orig;
        };
    }, []);

    // Auto-advance from analysis step
    useEffect(() => {
        if (step === 2) {
            const t = setTimeout(() => setStep(3), 4000);
            return () => clearTimeout(t);
        }
    }, [step]);

    const basePrice = 799;
    const addonTotal = useMemo(
        () => selectedAddons.reduce((sum, id) => sum + (ADDON_PRICES[id] || 0), 0),
        [selectedAddons]
    );
    const total = basePrice + addonTotal;

    const toggleAddon = (id) =>
        setSelectedAddons((curr) => (curr.includes(id) ? curr.filter((x) => x !== id) : [...curr, id]));

    return (
        <div
            className="fixed inset-0 z-[1000] flex items-start justify-center px-5 py-[5vh] overflow-y-auto bg-black/40 backdrop-blur-md font-inter-tight"
            onClick={onClose}
        >
            <div
                className="w-full max-w-[640px] bg-white rounded-[20px] shadow-[0_24px_60px_rgba(15,23,42,0.18)] overflow-hidden animate-[hireModalIn_0.36s_cubic-bezier(0.2,0.7,0.2,1)]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-start justify-between gap-6 px-8 pt-7 pb-6 border-b border-[#ececec]">
                    <div>
                        <h2 className="text-[22px] font-bold tracking-[-0.4px] text-[#111] mb-1.5 leading-tight">
                            {TITLES[step].title}
                        </h2>
                        <p className="text-sm text-[#555] leading-[1.55]">{TITLES[step].sub}</p>
                        {/* Stepper */}
                        <div className="flex items-center gap-1.5 mt-4">
                            {[1, 2, 3, 4, 5].map((n) => (
                                <span
                                    key={n}
                                    className={`h-1 rounded-full transition-all ${
                                        n === step
                                            ? 'w-6 bg-accent'
                                            : n < step
                                              ? 'w-3 bg-accent/40'
                                              : 'w-3 bg-[#ececec]'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="flex-shrink-0 w-8 h-8 rounded-full bg-transparent hover:bg-[#faf9f4] text-[#888] hover:text-[#111] flex items-center justify-center transition-colors"
                        aria-label="Close"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Body */}
                <div className="px-8 pt-7">
                    {step === 1 && <Step1 project={project} setProject={setProject} />}
                    {step === 2 && <Step2 />}
                    {step === 3 && (
                        <Step3
                            selectedAddons={selectedAddons}
                            toggleAddon={toggleAddon}
                            basePrice={basePrice}
                            total={total}
                        />
                    )}
                    {step === 4 && <Step4 total={total} selectedAddons={selectedAddons} basePrice={basePrice} />}
                    {step === 5 && (
                        <Step5
                            selectedDate={selectedDate}
                            setSelectedDate={setSelectedDate}
                            selectedTime={selectedTime}
                            setSelectedTime={setSelectedTime}
                        />
                    )}
                </div>

                {/* Footer */}
                <div className="px-8 py-5 pb-7">
                    {step > 1 && step !== 2 && (
                        <button
                            onClick={() => setStep(step - 1)}
                            className="inline-flex items-center gap-1.5 text-accent text-[13px] font-semibold mb-4 hover:underline"
                        >
                            <ChevronLeft className="w-4 h-4" /> Back
                        </button>
                    )}
                    {step === 1 && (
                        <button
                            disabled={!project.title || !project.description}
                            onClick={() => setStep(2)}
                            className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 bg-accent hover:bg-[#8a1a0a] disabled:bg-[#e6e6e6] disabled:text-[#999] text-white rounded-full text-sm font-semibold transition-colors"
                        >
                            Generate my scope <ArrowRight className="w-4 h-4" />
                        </button>
                    )}
                    {step === 3 && (
                        <button
                            onClick={() => setStep(4)}
                            className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 bg-accent hover:bg-[#8a1a0a] text-white rounded-full text-sm font-semibold transition-colors"
                        >
                            Continue to payment · ${total} <ArrowRight className="w-4 h-4" />
                        </button>
                    )}
                    {step === 4 && (
                        <button
                            onClick={() => setStep(5)}
                            className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 bg-accent hover:bg-[#8a1a0a] text-white rounded-full text-sm font-semibold transition-colors"
                        >
                            Pay ${total} securely <Lock className="w-4 h-4" />
                        </button>
                    )}
                    {step === 5 && (
                        <button
                            disabled={!selectedDate || !selectedTime}
                            onClick={onClose}
                            className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 bg-accent hover:bg-[#8a1a0a] disabled:bg-[#e6e6e6] disabled:text-[#999] text-white rounded-full text-sm font-semibold transition-colors"
                        >
                            Confirm kickoff <Check className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>

            <style jsx global>{`
                @keyframes hireModalIn {
                    from {
                        opacity: 0;
                        transform: translateY(12px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
}
