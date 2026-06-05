import { Sparkles, User, Mail, FileText, Check } from 'lucide-react';
import '../../../scss/animations.scss';

export default function WorkflowIllustration() {
    return (
        <div className="mt-auto flex items-center gap-3.5 pt-8">
            <div className="w-[54px] h-[54px] bg-gradient-to-br from-[#7c3aed] via-[#a78bfa] to-[#c4b5fd] flex items-center justify-center shrink-0 rounded-[10px] relative animate-feat-spark-glow">
                <div className="absolute -inset-1.5 rounded-[14px] bg-[radial-gradient(circle,rgba(124,58,237,0.35)_0%,transparent_70%)] z-0 animate-feat-spark-halo pointer-events-none" />
                <Sparkles color="white" size={28} className="relative z-[1] drop-shadow-[0_1px_2px_rgba(0,0,0,0.18)] animate-feat-spark-float" />
            </div>
            <div
                className="shrink-0 w-[30px] h-[6px] animate-feat-connector-flow"
                style={{
                    backgroundImage: 'linear-gradient(90deg, #a78bfa 0%, #a78bfa 50%, transparent 50%, transparent 100%)',
                    backgroundSize: '6px 2px',
                    backgroundRepeat: 'repeat-x',
                    backgroundPosition: '0 50%',
                }}
            />
            <div className="flex-1 bg-white border border-[#e0d5ff] py-[11px] px-3.5 flex flex-col gap-[7px] rounded-md shadow-[0_4px_14px_rgba(124,58,237,0.1)]">
                <div className="flex items-center gap-2 text-[11.5px] text-gray-700 font-medium leading-none animate-feat-item-pulse" style={{ animationDelay: '0s' }}>
                    <span className="text-gray-400 font-normal text-[11px] min-w-[14px]">1.</span>
                    <span className="w-3.5 h-3.5 flex items-center justify-center shrink-0">
                        <User color="#ff7a59" size={12} />
                    </span>
                    Create Contact
                </div>
                <div className="flex items-center gap-2 text-[11.5px] text-gray-700 font-medium leading-none animate-feat-item-pulse" style={{ animationDelay: '0.45s' }}>
                    <span className="text-gray-400 font-normal text-[11px] min-w-[14px]">2.</span>
                    <span className="w-3.5 h-3.5 flex items-center justify-center shrink-0">
                        <Mail color="#ea4335" size={12} />
                    </span>
                    Send Email
                </div>
                <div className="flex items-center gap-2 text-[11.5px] text-gray-700 font-medium leading-none animate-feat-item-pulse" style={{ animationDelay: '0.9s' }}>
                    <span className="text-gray-400 font-normal text-[11px] min-w-[14px]">3.</span>
                    <span className="w-3.5 h-3.5 flex items-center justify-center shrink-0">
                        <FileText color="#0f9d58" size={12} />
                    </span>
                    Update Record
                </div>
            </div>
            <div className="w-7 h-7 rounded-full border-[1.5px] border-gray-300 flex items-center justify-center text-gray-300 shrink-0 bg-white animate-feat-check-cycle">
                <Check size={12} color="#22c55e" />
            </div>
        </div>
    );
}
