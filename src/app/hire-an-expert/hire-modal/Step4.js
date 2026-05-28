'use client';

import { Lock } from 'lucide-react';

export default function Step4({ total, basePrice }) {
    const inp =
        'w-full px-3.5 py-3 bg-white border border-[#ececec] rounded-[10px] text-sm text-[#222] leading-[1.5] outline-none transition-all focus:border-accent focus:shadow-[0_0_0_3px_rgba(168,32,13,0.10)] placeholder:text-[#aaa]';

    return (
        <div className="animate-[hireStepFade_0.32s_cubic-bezier(0.2,0.7,0.2,1)]">
            <div className="flex items-center gap-2 p-3 bg-[rgba(168,32,13,0.04)] border border-[rgba(168,32,13,0.18)] rounded-[10px] mb-3.5 text-xs text-[#6b1d10] leading-[1.5]">
                <Lock className="w-4 h-4 flex-shrink-0 text-accent" />
                This amount will be charged once your workflow is built and delivered by our expert team.
            </div>

            <div className="border border-[#ececec] rounded-xl p-5 mb-3.5">
                <h4 className="text-[15px] font-bold text-[#111] mb-3.5">Card details</h4>
                <div className="mb-3.5">
                    <label className="block text-xs font-semibold text-[#111] mb-2">Card number</label>
                    <input className={inp} placeholder="4242 4242 4242 4242" />
                </div>
                <div className="grid grid-cols-2 gap-3.5">
                    <div>
                        <label className="block text-xs font-semibold text-[#111] mb-2">Expiry</label>
                        <input className={inp} placeholder="MM / YY" />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-[#111] mb-2">CVC</label>
                        <input className={inp} placeholder="123" />
                    </div>
                </div>
                <div className="inline-flex items-center gap-1.5 mt-2 text-xs text-gray-500">
                    <Lock className="w-3 h-3" /> Secured by Stripe · 256-bit TLS
                </div>
            </div>

            <div className="bg-[#faf9f4] rounded-xl px-5 py-[18px]">
                <h4 className="text-[15px] font-bold text-gray-500 mb-3">Payment summary</h4>
                <div className="flex justify-between items-center py-1 text-xs text-gray-500">
                    <span>Expert consultation</span>
                    <span className="text-gray-500">$320</span>
                </div>
                <div className="flex justify-between items-center py-1 text-xs text-gray-500">
                    <span>3 months of monitoring & maintenance</span>
                    <span className="text-gray-500">$100</span>
                </div>
                <div className="flex justify-between items-center py-1 text-xs text-gray-500">
                    <span>Estimated tax</span>
                    <span className="text-gray-500">$26</span>
                </div>
                <div className="flex justify-between items-center pt-3 mt-3 border-t border-[#ececec] text-[15px] font-bold text-gray-500">
                    <span>Total</span>
                    <strong className="text-accent text-xl tracking-[-0.4px]">$346</strong>
                </div>
            </div>
        </div>
    );
}
