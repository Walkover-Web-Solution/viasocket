'use client';
import Image from 'next/image';
import { Play } from 'lucide-react';
import { handleRedirect } from '@/utils/handleRedirection';

export default function HowItWorks({ appOneDetails, appTwoDetails, hasToken, utm }) {
    return (
        <div className="container">
            <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
                <a
                    href="https://www.youtube.com/watch?v=1KKTY-3WSzk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full md:w-[55%] shrink-0 rounded-xl overflow-hidden relative group"
                >
                    <Image
                        src="https://img.youtube.com/vi/1KKTY-3WSzk/maxresdefault.jpg"
                        width={720}
                        height={405}
                        alt="How to build your first workflow with viaSocket"
                        className="w-full h-auto object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                        <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                            <Play className="w-7 h-7 text-accent ml-1 fill-accent" />
                        </div>
                    </div>
                </a>
                <div className="flex flex-col gap-5 w-full md:w-[45%]">
                    <span className="text-accent text-xs font-bold uppercase tracking-widest">2-Minute Guide</span>
                    <h2 className="h2 leading-tight">
                        Learn how to build your first <span className="text-accent">workflow</span>
                    </h2>
                    <p className="text-gray-500 text-base leading-relaxed">
                        Follow a simple walkthrough to create, test, and launch your first automation.
                    </p>
                    <ol className="flex flex-col">
                        {[
                            { title: 'Connect your apps', desc: 'Link the apps you want to automate.' },
                            {
                                title: 'Configure your workflow',
                                desc: 'Set up triggers, actions, and map your data.',
                            },
                            { title: 'Test & publish', desc: 'Test your workflow and publish it.' },
                        ].map((step, i) => (
                            <li key={i} className="flex items-start gap-4">
                                <span className="w-6 h-6 rounded-full border border-gray-300 text-gray-400 text-xs font-medium flex items-center justify-center shrink-0 mt-0.5">
                                    {i + 1}
                                </span>
                                <div className="pb-5">
                                    <p className="font-semibold text-gray-900 text-sm">{step.title}</p>
                                    <p className="text-gray-500 text-sm mt-0.5">{step.desc}</p>
                                </div>
                            </li>
                        ))}
                    </ol>
                    <button
                        className="btn btn-accent self-start"
                        onClick={(e) =>
                            handleRedirect(e, hasToken ? `https://flow.viasocket.com?` : `/signup?`, null, utm)
                        }
                    >
                        Create your flow
                    </button>
                </div>
            </div>
        </div>
    );
}
