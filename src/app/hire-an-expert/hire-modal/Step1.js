'use client';

import { Paperclip } from 'lucide-react';

export default function Step1({ project, setProject }) {
    const inp =
        'w-full px-3.5 py-3 bg-white border border-[#ececec] rounded-[10px] text-sm text-[#222] leading-[1.5] outline-none transition-all focus:border-accent focus:shadow-[0_0_0_3px_rgba(168,32,13,0.10)] placeholder:text-[#aaa]';

    return (
        <div className="animate-[hireStepFade_0.32s_cubic-bezier(0.2,0.7,0.2,1)]">
            <div className="mb-[18px]">
                <label className="block text-[13px] font-semibold text-[#111] mb-2">Project title</label>
                <input
                    className={inp}
                    placeholder="e.g. Sync HubSpot deals to Slack"
                    value={project.title}
                    onChange={(e) => setProject({ ...project, title: e.target.value })}
                />
            </div>

            <div className="mb-[18px]">
                <label className="block text-[13px] font-semibold text-[#111] mb-2">
                    What should the automation do?
                </label>
                <textarea
                    className={`${inp} min-h-[132px] resize-y font-inherit`}
                    placeholder="When a HubSpot deal moves to 'Closed Won', post in #wins, create a Notion onboarding page, and add the customer to our Mailchimp list…"
                    value={project.description}
                    onChange={(e) => setProject({ ...project, description: e.target.value })}
                />
                <p className="text-xs text-[#555] mt-2">The more detail, the more accurate your AI scope.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mb-[18px]">
                <div>
                    <label className="block text-[13px] font-semibold text-[#111] mb-2">Budget range</label>
                    <select
                        className={inp}
                        value={project.budget}
                        onChange={(e) => setProject({ ...project, budget: e.target.value })}
                    >
                        <option value="">Select…</option>
                        <option>Under $500</option>
                        <option>$500 – $1,000</option>
                        <option>$1,000 – $2,500</option>
                        <option>$2,500+</option>
                    </select>
                </div>
                <div>
                    <label className="block text-[13px] font-semibold text-[#111] mb-2">Timeline</label>
                    <select
                        className={inp}
                        value={project.timeline}
                        onChange={(e) => setProject({ ...project, timeline: e.target.value })}
                    >
                        <option value="">Select…</option>
                        <option>ASAP (3 days)</option>
                        <option>This week</option>
                        <option>This month</option>
                        <option>Flexible</option>
                    </select>
                </div>
            </div>

            <button
                type="button"
                className="inline-flex items-center gap-2 px-3.5 py-2.5 bg-transparent border border-dashed border-[#e2e2e2] rounded-[10px] text-[#555] text-[13px] font-medium hover:border-accent hover:text-accent hover:bg-[rgba(168,32,13,0.03)] transition-colors"
            >
                <Paperclip className="w-4 h-4" /> Attach screenshots or docs (optional)
            </button>
        </div>
    );
}
