'use client';
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { GlassCard } from "./shared";
import { MdSupportAgent } from "react-icons/md";

export default function SupportSection() {

  return (
    <section className="section">
      <GlassCard>
        <div className="p-6 md:p-10 flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-16">
          <div className="space-y-2 flex-1">
            <h2 className="heading2">Need help building your workflow?</h2>
            <p className="sub-heading2 max-w-lg">
              Get instant answers from our AI assistant or connect with a support specialist anytime.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button className="primary-button">
                Browse help centre
                <ExternalLink size={15} />
              </button>
              <Link href="https://cal.id/team/viasocket/workflow-setup-discussion" target="_blank" rel="nofollow noopener noreferrer" className="secondary-button">
                Book a demo
              </Link>
            </div>
          </div>

          {/* Chat widget */}
          <div className="chat-widget shrink-0 hidden md:block">
            {/* Header */}
            <div className="flex items-center justify-center gap-1.5 px-4 py-3">
              <div className="w-[21px] h-[21px] relative overflow-hidden shrink-0">
                <Image src="/assets/brand/favicon_dark.svg" alt="viaSocket" width={40} height={40} />
              </div>
              <span className="text-sm font-medium text-gray-800">viaSocket Support</span>
            </div>
            <div className="h-px bg-gray-400" />
            {/* Chat body */}
            <div className="flex flex-col gap-4 px-4 py-5 pb-6">
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 shrink-0">
                   <MdSupportAgent size={28} />
                </div>
                <div className="flex flex-col gap-0.5 pt-0.5">
                  <span className="text-xs font-semibold text-black">viaSocket</span>
                  <span className="text-xs font-normal text-black">What can I help you with?</span>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="bg-blue-500 text-white text-xs font-normal px-5 py-2 rounded-[10px_10px_10px_3px] tracking-wide">How can I set trigger?</div>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>
    </section>
  );
}
