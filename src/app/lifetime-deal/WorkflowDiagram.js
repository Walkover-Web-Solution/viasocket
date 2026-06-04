import Image from 'next/image';
import { Download, RefreshCw, Share2, Play, ChevronDown } from 'lucide-react';

export default function WorkflowDiagram() {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-white p-4 select-none">
            {/* Trigger Card */}
            <div className="w-full max-w-[260px] border rounded bg-white overflow-hidden shadow-sm">
                {/* Header */}
                <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100">
                    <span className="text-xs font-semibold text-gray-700">Trigger</span>
                    <div className="flex items-center gap-2 text-[#FFB89A]">
                        <Download size={12} strokeWidth={2.5} />
                        <RefreshCw size={12} strokeWidth={2.5} />
                        <Share2 size={12} strokeWidth={2.5} />
                        <Play size={12} strokeWidth={2.5} fill="currentColor" />
                    </div>
                </div>
                {/* Webhook Row */}
                <div className="flex items-center gap-3 px-3 py-3">
                    <div className="w-9 h-9 rounded flex items-center justify-center shrink-0 overflow-hidden">
                        <Image src="https://stuff.thingsofbrand.com/viasocket.com/images/img0_Webhook-Transparent.svg" alt="Webhook" width={32} height={32} className="object-contain p-1" />
                    </div>
                    <div className="min-w-0 flex flex-col items-start justify-start">
                        <div className="text-sm font-semibold text-gray-800 truncate">Webhook</div>
                        <div className="text-[10px] text-gray-400 truncate">https://dev.sokt.io/func/scriukB09f/3g</div>
                    </div>
                </div>
            </div>

            {/* Connector Arrow 1 */}
            <div className="flex flex-col items-center py-1">
                <div className="w-0.5 h-3 bg-[#FFB89A]"></div>
                <ChevronDown size={10} className="text-[#FFB89A]" />
            </div>

            {/* Google Sheets Card */}
            <div className="w-full max-w-[260px] border rounded bg-white px-3 py-2.5 flex items-center gap-3 shadow-sm">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
                    <Image src="https://stuff.thingsofbrand.com/google.com/images/img4_googlesheet.png" alt="Google Sheets" width={32} height={32} className="object-contain" />
                </div>
                <span className="text-sm font-semibold text-gray-800">Google Sheets</span>
                <svg className="ml-auto text-gray-400" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/></svg>
            </div>

            {/* Connector Arrow 2 */}
            <div className="flex flex-col items-center py-1">
                <div className="w-0.5 h-3 bg-[#FFB89A]"></div>
                <ChevronDown size={10} className="text-[#FFB89A]" />
            </div>

            {/* Plus Button */}
            <div className="w-9 h-9 rounded border bg-white flex items-center justify-center shadow-sm">
                <span className="text-[#FFB89A] text-lg font-light leading-none">+</span>
            </div>
        </div>
    );
}
