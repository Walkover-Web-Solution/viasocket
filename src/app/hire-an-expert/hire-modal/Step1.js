'use client';

import { Paperclip } from 'lucide-react';

export default function Step1({ project, setProject }) {
    const inp =
        'w-full px-3.5 py-3 bg-white border border-[#ececec] rounded-[10px] text-sm text-[#222] leading-[1.5] outline-none transition-all focus:border-accent focus:shadow-[0_0_0_3px_rgba(168,32,13,0.10)] placeholder:text-[#aaa]';

    return (
        <div className="animate-[hireStepFade_0.32s_cubic-bezier(0.2,0.7,0.2,1)]">
            <div className="mb-[18px]">
                <label className="block text-xs font-semibold text-[#111] mb-2">Project title</label>
                <input
                    className={inp}
                    placeholder="e.g. Sync HubSpot deals to Slack"
                    value={project.title}
                    onChange={(e) => setProject({ ...project, title: e.target.value })}
                />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <label htmlFor="hire-name" className="block text-xs font-semibold text-[#111] mb-2">
                        Full name
                    </label>
                    <input
                        id="hire-name"
                        type="text"
                        autoComplete="name"
                        className={inp}
                        placeholder="Ashish Khatri"
                        value={project.name || ''}
                        onChange={(e) => setProject({ ...project, name: e.target.value })}
                    />
                </div>
                <div>
                    <label htmlFor="hire-email" className="block text-xs font-semibold text-[#111] mb-2">
                        Email ID
                    </label>
                    <input
                        id="hire-email"
                        type="email"
                        autoComplete="email"
                        className={inp}
                        placeholder="you@company.com"
                        value={project.email || ''}
                        onChange={(e) => setProject({ ...project, email: e.target.value })}
                    />
                </div>
            </div>

            <div className="mb-[18px]">
                <label className="block text-xs font-semibold text-[#111] mb-2">What would you like to automate?</label>
                <textarea
                    className={`${inp} min-h-[132px] resize-y font-inherit`}
                    placeholder="Describe the workflow you want, apps involved, triggers, outcomes, anything specific."
                    value={project.description}
                    onChange={(e) => setProject({ ...project, description: e.target.value })}
                />
                <p className="text-xs text-[#555] mt-2">Tell us a bit about your workflow to get started.</p>
            </div>

            <button
                type="button"
                className="inline-flex items-center gap-2 px-3.5 py-2.5 bg-transparent border border-dashed border-[#e2e2e2] rounded-[10px] text-[#555] text-xs font-medium hover:border-accent hover:text-accent hover:bg-[rgba(168,32,13,0.03)] transition-colors"
            >
                <Paperclip className="w-4 h-4" /> Attach screenshots or docs (optional)
            </button>
        </div>
    );
}
