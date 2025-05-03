import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const McpSwitchComp = () => {
    const router = useRouter();
    const currentRoute = router.pathname;

    return (
        <div className="container cont">
            <div className="w-full flex justify-center items-center">
                <div className="flex flex-row text-center max-w-4xl flex-wrap items-center justify-center category-btn">
                    <Link href="/mcp" className="no-underline">
                        <div
                            className={`cursor-pointer px-6 py-3 border border-right-0 transition-all duration-200 ${
                                currentRoute.startsWith('/mcp') &&
                                !currentRoute.startsWith('/mcp/developers') &&
                                !currentRoute.startsWith('/mcp/saas')
                                    ? 'bg-black text-white !border-gray-300'
                                    : 'bg-white text-black border-gray-300 hover:bg-gray-100'
                            }`}
                        >
                            Users
                        </div>
                    </Link>

                    <Link href="/mcp/developers" className="no-underline">
                        <div
                            className={`cursor-pointer px-6 py-3 border border-right-0 transition-all duration-200 ${
                                currentRoute.startsWith('/mcp/developers')
                                    ? 'bg-black text-white !border-gray-300'
                                    : 'bg-white text-black border-gray-300 hover:bg-gray-100'
                            }`}
                        >
                            AI Agents
                        </div>
                    </Link>

                    <Link href="/mcp/saas" className="no-underline">
                        <div
                            className={`cursor-pointer px-6 py-3 border transition-all duration-200 ${
                                currentRoute.startsWith('/mcp/saas')
                                    ? 'bg-black text-white !border-gray-300'
                                    : 'bg-white text-black border-gray-300 hover:bg-gray-100'
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
