import { RefreshCw, GitBranch, Play, ArrowDown, Plus, Download } from 'lucide-react';

export default function TriggerActionDiagram() {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center py-2">
            <div className="w-full max-w-[240px] bg-white rounded-xl border border-gray-200 shadow-sm p-3 relative">
                <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-accent">Trigger</span>
                    <div className="flex items-center gap-2 text-accent">
                        <RefreshCw size={12} />
                        <GitBranch size={12} />
                        <Play size={12} />
                        <Download size={12} />
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <img src="https://stuff.thingsofbrand.com/viasocket.com/images/img0_Webhook-Transparent.svg" alt="Webhook" className="w-5 h-5 object-contain" />
                    </div>
                    <div>
                        <div className="text-sm font-semibold text-gray-800 text-left">Webhook</div>
                        <div className="text-[10px] text-gray-400 truncate">https://webhook...</div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center my-1 text-accent">
                <ArrowDown size={28} strokeWidth={1.5} />
            </div>

            <div className="w-full max-w-[240px] bg-white rounded-xl border border-gray-200 shadow-sm p-3 relative">
                <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-accent">Action</span>
                    <div className="flex items-center gap-0.5 text-accent">
                        <div className="w-1 h-1 rounded-full bg-accent" />
                        <div className="w-1 h-1 rounded-full bg-accent" />
                        <div className="w-1 h-1 rounded-full bg-accent" />
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <img src="https://stuff.thingsofbrand.com/google.com/images/img4_googlesheet.png" alt="Google Sheets" className="w-5 h-5 object-contain" />
                    </div>
                    <div>
                        <div className="text-sm font-semibold text-gray-800">Google Sheets</div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center mt-1 text-accent">
                <ArrowDown size={28} strokeWidth={1.5} />
            </div>

            <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 shadow-sm flex items-center justify-center mt-1 text-accent">
                <Plus size={14} strokeWidth={2.5} />
            </div>
        </div>
    );
}
