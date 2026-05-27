import { Check } from 'lucide-react';

export default function Step6() {
    return (
        <div className="flex flex-col items-center text-center py-6">
            <div className="w-20 h-20 rounded-full bg-[#E8F5EC] flex items-center justify-center mb-6">
                <Check className="w-10 h-10 text-[#1FA463]" strokeWidth={3} />
            </div>
            <h3 className="text-[22px] font-bold tracking-[-0.4px] text-[#111] mb-3">
                You&apos;re connected with a Viasocket expert
            </h3>
            <p className="text-sm text-[#555] leading-[1.55] max-w-[420px]">
                Our automation team will review your workflow and reach out at your scheduled time, usually within a few hours.
            </p>
        </div>
    );
}
