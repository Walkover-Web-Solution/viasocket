import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const McpSwitchComp = () => {
    const router = useRouter();
    const currentRoute = router.pathname;

    return (
        <div className="container cont">
            <div className="w-full flex items-center">
                <div className="flex flex-row text-left max-w-4xl flex-wrap items-center justify-center category-btn">
                    <Link href="/mcp" className="no-underline">
                        <div
                            className={`cursor-pointer px-6 py-3 border custom-border transition-all duration-200 text-sm border-r-0 ${
                                currentRoute.startsWith('/mcp') &&
                                !currentRoute.startsWith('/mcp/aiagent') &&
                                !currentRoute.startsWith('/mcp/saas')
                                    ? 'bg-black text-white custom-border'
                                    : 'bg-white text-black hover:bg-gray-100'
                            }`}
                        >
                            Users
                        </div>
                    </Link>

                    <Link href="/mcp/aiagent" className="no-underline">
                        <div
                            className={`cursor-pointer px-6 py-3 border custom-border transition-all duration-200 text-sm border-r-0 ${
                                currentRoute.startsWith('/mcp/aiagent')
                                    ? 'bg-black text-white custom-border'
                                    : 'bg-white text-black hover:bg-gray-100'
                            }`}
                        >
                            AI Agents
                        </div>
                    </Link>

                    <Link href="/mcp/saas" className="no-underline">
                        <div
                            className={`cursor-pointer px-6 py-3 border custom-border transition-all duration-200 text-sm ${
                                currentRoute.startsWith('/mcp/saas')
                                    ? 'bg-black text-white custom-border'
                                    : 'bg-white text-black hover:bg-gray-100'
                            }`}
                        >
                            SaaS Players
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default McpSwitchComp;
