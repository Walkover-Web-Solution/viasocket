import { CheckCircle2, ChevronDown, FileText, Sparkles, Tag } from 'lucide-react';

export default function Step3({ basePrice, total }) {
    return (
        <div className="animate-[hireStepFade_0.32s_cubic-bezier(0.2,0.7,0.2,1)]">
            <div className="flex items-center gap-2.5 mb-2">
                <Sparkles className="w-[22px] h-[22px] text-accent" />
                <h3 className="text-[17px] font-bold tracking-[-0.2px]">AI workflow assessment</h3>
            </div>
            <p className="text-xs text-gray-500 mb-4 leading-[1.55]">
                Based on what you described, here's how our AI sized up the work.
            </p>

            <div className="flex flex-wrap gap-2 mb-[22px]">
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-green-50 border border-green-200 text-green-700">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Complexity: Basic
                </span>
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-[#faf9f4] border border-[#ececec] text-[#222]">
                    Tier: Starter
                </span>
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-[#faf9f4] border border-[#ececec] text-[#222]">
                    Multi-app
                </span>
            </div>

            {/* Requirements card */}
            <div className="border border-[#ececec] rounded-xl mb-3 overflow-hidden">
                <div className="flex items-center justify-between p-4 gap-3">
                    <div className="flex items-center gap-2.5 text-sm font-semibold">
                        <FileText className="w-4 h-4 text-gray-500 flex-shrink-0" /> Your Requirements Documents
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
                </div>
            </div>

            {/* Pricing card */}
            <div className="border border-[#ececec] rounded-xl mb-3">
                <div className="px-4 py-3.5">
                    <div className="flex justify-between items-center py-2 text-xs text-gray-500">
                        <span>Expert consultation fee</span>
                        <span className="text-gray-500">${basePrice}</span>
                    </div>

                    <div className="flex justify-between items-center py-2 text-xs text-gray-500">
                        <span>Workflow planning</span>
                        <span className="text-gray-500">Included</span>
                    </div>
                    <div className="flex justify-between items-center py-2 text-xs text-gray-500">
                        <span>Delivery estimate</span>
                        <span className="text-gray-500">3–5 business days</span>
                    </div>
                </div>
                <div className="flex items-center justify-between p-4 border-t border-[#ececec]">
                    <div className="flex items-center gap-2.5 text-sm font-bold">
                        <Tag className="w-4 h-4 text-accent" /> Final consultation pricing
                    </div>
                    <div className="text-[22px] font-bold text-accent tracking-[-0.5px]">${total}</div>
                </div>
            </div>

            <div className="border border-[#ececec] rounded-xl mb-3 p-4">
                <div className="flex items-center gap-3">
                    <span className="w-[18px] h-[18px] rounded-[5px] border border-[#e2e2e2] flex-shrink-0" />
                    <span className="text-sm font-medium flex-1">Add 3 months of monitoring & maintenance</span>
                    <span className="text-xs font-semibold text-accent bg-[rgba(168,32,13,0.08)] px-2.5 py-0.5 rounded-full">
                        +$100
                    </span>
                </div>
                <div className="ml-8 mt-1 flex items-center gap-2 text-xs text-gray-500">
                    <span>Workflow monitoring</span>
                    <span className="text-accent font-bold">•</span>
                    <span>Maintenance coverage</span>
                    <span className="text-accent font-bold">•</span>
                    <span>Priority support</span>
                    {/* <span className="text-accent font-bold">•</span>
                    <span>Optimization recommendations</span> */}
                    {/* <span className="text-accent font-bold">•</span>
                    <span>Error handling support</span> */}
                </div>
            </div>
        </div>
    );
}
