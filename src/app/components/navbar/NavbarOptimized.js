'use client';

import { useState } from 'react';
import Menubar from '@/components/navbar/menubar';
import MCPBanner from './MCPBanner';
import EmbedBanner from './EmbedBanner';
import TopNavLinks from './TopNavLinks';
import MainNavbar from './MainNavbar';

const navItems = [
    {
        name: 'Usecases',
        link: '/departments',
    },
    {
        name: 'Features',
        link: '/features',
    },
    {
        name: 'Explore Apps',
        link: '/integrations',
    },
    {
        name: 'Pricing',
        link: '/pricing',
    },
];

export default function NavbarOptimized({ utm, hasToken = null }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const mode = 'light';
    let borderClass;
    let backgroundClass;
    let textClass;

    if (utm && utm === '/pricing') {
        borderClass = '';
    }
    if (utm !== '/index') {
        textClass = 'text-dark ';
    } else {
        textClass = 'text-white ';
    }
    if (utm && utm === '/index') {
        backgroundClass = '!uppercase';
    } else {
        backgroundClass = textClass + '!uppercase';
    }

    return (
        <>
            <div
                className={`fixed top-0 left-0 right-0 z-[100] w-full transition-all duration-300 max-h-none overflow-visible translate-y-0 opacity-100 pointer-events-auto`}
            >
                {/* Top navigation bar */}
                <div
                    className={`border-gray-300 border-b lg:block hidden bg-gray-200/80 supports-[backdrop-filter]:bg-gray-200/70 supports-[-webkit-backdrop-filter:blur(0)]:bg-gray-200/70 backdrop-blur-xl [-webkit-backdrop-filter:blur(24px)]`}
                >
                    <div className="items-center justify-end flex !h-[30px]">
                        {utm === '/index' && <MCPBanner />}
                        {utm === '/embed' && <EmbedBanner />}
                        <TopNavLinks borderClass={borderClass} backgroundClass={backgroundClass} utm={utm} />
                    </div>
                </div>

                {/* Main navigation bar */}
                <MainNavbar
                    navItems={navItems}
                    hasToken={hasToken}
                    borderClass={borderClass}
                    backgroundClass={backgroundClass}
                    mode={mode}
                    setMenuOpen={setMenuOpen}
                />
            </div>

            <Menubar open={menuOpen} onClose={() => setMenuOpen(false)} navItems={navItems} />
        </>
    );
}
