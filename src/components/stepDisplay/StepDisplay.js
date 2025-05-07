import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

export default function StepDisplay({ steps }) {
    const [activeStep, setActiveStep] = useState(0);
    const [lineProgress, setLineProgress] = useState(0);
    const intervalRef = useRef(null);
    const transitioning = useRef(false);

    const nextStep = () => {
        if (transitioning.current) return;

        transitioning.current = true;
        setLineProgress(0);

        setActiveStep((prev) => {
            const next = (prev + 1) % steps.length;
            return next;
        });

        setTimeout(() => {
            transitioning.current = false;
        }, 500);
    };

    const selectStep = (index) => {
        if (transitioning.current) return;
        if (index === activeStep) return;

        transitioning.current = true;
        setLineProgress(0);
        setActiveStep(index);

        setTimeout(() => {
            transitioning.current = false;
        }, 500);
    };

    useEffect(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        setLineProgress(0);

        intervalRef.current = setInterval(() => {
            setLineProgress((prev) => {
                if (prev >= 100) {
                    if (!transitioning.current) {
                        setTimeout(() => nextStep(), 200);
                    }
                    return 100;
                }
                return prev + 1;
            });
        }, 50);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [activeStep]);

    return (
        <div className="flex flex-col md:flex-row w-full  p-4 gap-8">
            <div className="w-full md:w-1/2 flex flex-col relative">
                {steps.map((step, index) => {
                    const isActive = index === activeStep;

                    return (
                        <div key={index} className="relative pl-8 mb-16 h-24">
                            <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-400">
                                {isActive && (
                                    <div
                                        className="absolute top-0 left-0 w-full bg-accent transition-all duration-300 ease-linear"
                                        style={{ height: `${lineProgress}%` }}
                                    />
                                )}
                            </div>

                            <div
                                onClick={() => selectStep(index)}
                                className="cursor-pointer flex items-center gap-4 h-full"
                            >
                                <div
                                    className={`relative z-10 rounded-full w-10 h-10 flex items-center justify-center ${isActive ? 'bg-accent' : 'bg-gray-400'}`}
                                >
                                    <span className="text-center text-white">{index + 1}</span>
                                </div>

                                <div className="flex-1 flex flex-col gap-1 justify-center">
                                    <h3 className="text-2xl font-bold">{step.title}</h3>
                                    <p className="text-lg text-gray-600">{step.description}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="w-full md:w-1/2">
                {steps.map((step, index) => (
                    <div
                        key={index}
                        className={`transition-opacity duration-300 ${
                            index === activeStep ? 'block opacity-100' : 'hidden opacity-0'
                        }`}
                    >
                        <Image
                            src={step.image}
                            alt={`Step ${index + 1}`}
                            className="object-cover border border-black"
                            width={600}
                            height={600}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
