'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, Check, ArrowLeft, Lock, X } from 'lucide-react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
import Step6 from './Step6';
import '../hire-expert.scss';

const DEFAULT_TITLE = {
    title: 'Hire a workflow expert',
    sub: 'Get your automation workflow designed, fixed, or fully managed by Viasocket experts.',
};

const TITLES = {
    5: { title: 'Book your kickoff call', sub: 'Pick a time that works — your expert will join you.' },
};

const getTitle = (step) => TITLES[step] || DEFAULT_TITLE;

export default function HireModal({ onClose }) {
    const [step, setStep] = useState(1);
    const [project, setProject] = useState({
        description: '',
        apps: '',
        budget: '',
        timeline: '',
    });
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

    const basePrice = 320;
    const total = basePrice;

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
                            {getTitle(step).title}
                        </h2>
                        <p className="text-sm text-gray-500 leading-[1.55]">{getTitle(step).sub}</p>
                        {/* Stepper */}
                        {step !== 6 && (
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
                        )}
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
                <div className="px-8 pt-4">
                    {step > 1 && step !== 2 && step !== 6 && (
                        <button
                            onClick={() => setStep(step - 1)}
                            className="inline-flex items-center gap-1 text-accent text-xs font-semibold mb-6 hover:underline"
                        >
                            <ArrowLeft className="w-4 h-4 transition-transform group-hover:translate-x-0.5" /> Update
                            Automation Setup
                        </button>
                    )}
                    {step === 1 && <Step1 project={project} setProject={setProject} />}
                    {step === 2 && <Step2 />}
                    {step === 3 && <Step3 basePrice={basePrice} total={total} />}
                    {step === 4 && <Step4 total={total} basePrice={basePrice} />}
                    {step === 6 && <Step6 />}
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
                <div className="px-8 pt-2 pb-7">
                    {step === 1 && (
                        <button
                            disabled={!project.description}
                            onClick={() => setStep(2)}
                            className="w-full btn btn-accent"
                        >
                            Generate AI Consultation Report <ArrowRight className="w-4 h-4" />
                        </button>
                    )}
                    {step === 3 && (
                        <button onClick={() => setStep(4)} className="w-full btn btn-accent">
                            Continue to Payment <Lock className="w-4 h-4" />
                        </button>
                    )}
                    {step === 4 && (
                        <button onClick={() => setStep(5)} className="w-full btn btn-accent">
                            Assign an Expert <ArrowRight className="w-4 h-4" />
                        </button>
                    )}
                    {step === 5 && (
                        <button
                            disabled={!selectedDate || !selectedTime}
                            onClick={() => setStep(6)}
                            className="w-full btn btn-accent"
                        >
                            Confirm meeting <Check className="w-4 h-4" />
                        </button>
                    )}
                    {step === 6 && (
                        <button onClick={onClose} className="w-full btn btn-accent">
                            Got it
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
