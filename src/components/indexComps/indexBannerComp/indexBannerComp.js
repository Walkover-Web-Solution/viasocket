import { handleRedirect } from '@/utils/handleRedirection';
import { GoArrowUpRight } from 'react-icons/go';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function IndexBannerComp() {
    const router = useRouter();
    return (
        <div className="container min-h-fit pt-12">
            <div className="flex flex-col md:flex-row md:items-center h-full cont__gap">
                <div className="w-full flex flex-col items-center justify-center md:items-start gap-12">
                    <div className="flex gap-12 flex-col items-center">
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col">
                                <h1 className="h1 text-black text-start ">
                                    Build<span className="text-accent"> Intelligent</span> automations
                                </h1>
                                <p className="sub__h1">
                                    Connect 1,583+ Apps, Deploy AI Agents, and Build Custom Workflows—All Without
                                    Writing a Single Line of Code!
                                </p>
                            </div>
                            <div className="cont gap-2 w-full">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <button
                                        className="btn btn-accent"
                                        onClick={(e) => handleRedirect(e, '/signup?', router)}
                                    >
                                        Start for free
                                    </button>

                                    <Link
                                        href="https://cal.id/team/viasocket/workflow-setup-discussion"
                                        className="btn btn-outline"
                                        target="_blank"
                                    >
                                        Free call with automation experts
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-4 min-w-fit">
                    <div className="flex flex-col">
                        <span className="text-base">Need automation ideas?</span>
                        <Link
                            href="https://viasocket.com/workflow-automation-ideas"
                            target="_blank"
                            className="text-accent text-xs flex items-center gap-1"
                        >
                            Generate with AI <GoArrowUpRight />
                        </Link>
                    </div>

                    <div className="flex flex-col">
                        <span className="text-base">Want professional help?</span>
                        <Link
                            href="https://viasocket.com/experts"
                            target="_blank"
                            className="text-accent text-xs flex items-center gap-1"
                        >
                            Hire an Expert <GoArrowUpRight />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
