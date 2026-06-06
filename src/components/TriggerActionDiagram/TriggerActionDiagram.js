import Image from 'next/image';
import { RefreshCw, GitBranch, Play, ArrowDown, Plus, Download, MoreHorizontal } from 'lucide-react';

export default function TriggerActionDiagram() {
    return (
        <div className="w-full flex flex-col items-center gap-2 justify-center h-full py-1">
            <div className="w-full max-w-[220px] bg-white rounded-lg border border-gray-200 shadow-sm relative">
                <div className="flex items-center justify-between mb-1 p-1 bg-accent/10 rounded-t-lg">
                    <span className="text-xs font-semibold text-accent">Trigger</span>
                    <div className="flex items-center gap-1.5 text-accent">
                        <RefreshCw size={10} />
                        <GitBranch size={10} />
                        <Play size={10} />
                        <Download size={10} />
                    </div>
                </div>
                <div className="flex items-center gap-2 p-1">
                    <div className="w-7 h-7 rounded-md bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Image
                            src="https://stuff.thingsofbrand.com/viasocket.com/images/img0_Webhook-Transparent.svg"
                            alt="Webhook"
                            width={16}
                            height={16}
                            className="w-4 h-4 object-contain"
                        />
                    </div>
                    <div>
                        <div className="text-xs font-semibold text-gray-800 text-left leading-tight">Webhook</div>
                        <div className="text-[9px] text-gray-400 truncate leading-tight">https://webhook...</div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center text-accent">
                <ArrowDown size={18} strokeWidth={1.5} />
            </div>

            <div className="w-full max-w-[220px] bg-white rounded-lg border border-gray-200 shadow-sm relative">
                <div className="flex items-center justify-between mb-1 p-1 bg-accent/10 rounded-t-lg">
                    <span className="text-xs font-semibold text-accent">Action</span>
                    <MoreHorizontal size={14} className="text-accent" />
                </div>
                <div className="flex items-center gap-2 p-1">
                    <div className="w-7 h-7 rounded-md bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Image
                            src="https://stuff.thingsofbrand.com/google.com/images/img4_googlesheet.png"
                            alt="Google Sheets"
                            width={16}
                            height={16}
                            className="w-4 h-4 object-contain"
                        />
                    </div>

                    <div className="text-xs font-semibold text-gray-800 leading-tight">Google Sheets</div>
                </div>
            </div>

            <div className="flex flex-col items-center text-accent">
                <ArrowDown size={18} strokeWidth={1.5} />
            </div>

            <div className="w-7 h-7 rounded-md bg-white border border-gray-200 shadow-sm flex items-center justify-center text-accent">
                <Plus size={12} strokeWidth={2.5} />
            </div>
        </div>
    );
}
