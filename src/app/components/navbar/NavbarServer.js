import { cookies } from 'next/headers';
import NavbarOptimized from './NavbarOptimized';

const normalizePath = (path) => {
    if (!path) return '/';

    const noQuery = (path?.toString() || '').split('?')[0].split('#')[0].trim();
    let normalized = noQuery.startsWith('/') ? noQuery : `/${noQuery}`;

    if (normalized === '/index') normalized = '/';
    if (normalized.length > 1 && normalized.endsWith('/')) normalized = normalized.slice(0, -1);

    return normalized || '/';
};

const getGroupData = (navbarData, pageUrl) => {
    if (!Array.isArray(navbarData) || navbarData.length === 0) {
        return {
            groupedNavbarData: {},
            topLevelGroups: [],
            initialGroupName: '',
        };
    }

    const groupedNavbarData = navbarData.reduce((acc, item) => {
        const groupName = item?.group_name || '';
        if (!groupName) return acc;

        if (!acc[groupName]) acc[groupName] = [];
        acc[groupName].push(item);
        return acc;
    }, {});

    const topLevelGroups = [
        ...new Map(
            navbarData
                .filter((item) => item?.group_name)
                .map((item) => [item.group_name, item])
        ).values(),
    ];

    const currentPath = normalizePath(pageUrl || '/');

    let bestMatch = null;
    let bestScore = -1;

    for (const item of navbarData) {
        const candidates = [item?.link, item?.group_link].filter(Boolean);

        for (const candidate of candidates) {
            if (typeof candidate === 'string' && candidate.startsWith('http')) continue;

            const target = normalizePath(candidate);

            if (currentPath === target) {
                const score = target.length + 1000;
                if (score > bestScore) {
                    bestScore = score;
                    bestMatch = item;
                }
                continue;
            }

            if (target !== '/' && currentPath.startsWith(`${target}/`)) {
                const score = target.length;
                if (score > bestScore) {
                    bestScore = score;
                    bestMatch = item;
                }
            }
        }
    }

    const initialGroupName = bestMatch?.group_name || '';

    return {
        groupedNavbarData,
        topLevelGroups,
        initialGroupName,
    };
};

export default async function NavbarServer({ utm, navbarData }) {
    // Server-side cookie reading
    const cookieStore = await cookies();
    const token = cookieStore.get('prod');
    const hasToken = Boolean(token?.value);
    const { groupedNavbarData, topLevelGroups, initialGroupName } = getGroupData(navbarData, utm || '/');

    return (
        <NavbarOptimized 
            utm={utm} 
            navbarData={navbarData} 
            hasToken={hasToken}
            initialGroupName={initialGroupName}
            groupedNavbarData={groupedNavbarData}
            topLevelGroups={topLevelGroups}
            currentPath={normalizePath(utm || '/')}
        />
    );
}
