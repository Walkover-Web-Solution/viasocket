import Marquee from 'react-fast-marquee';
import { useMemo } from 'react';

// Helper functions moved outside component for better performance
const parseAppsData = (data) => {
    if (!data) return [];

    // Handle string data
    if (typeof data === 'string') {
        try {
            // Try parsing as JSON first
            const jsonData = JSON.parse(data);
            return Array.isArray(jsonData) ? jsonData : [jsonData];
        } catch {
            // If not valid JSON, parse as colon-separated or line-separated
            return data
                .split(/[,\n]/)
                .map((line) => line.trim())
                .filter(Boolean)
                .map((line) => {
                    const parts = line.split(':');
                    return parts.length >= 2 ? { app: parts[0].trim(), domain: parts[1].trim() } : { app: line };
                });
        }
    }

    // Handle array data
    if (Array.isArray(data)) return data;

    // Handle object data
    if (typeof data === 'object' && data !== null) return [data];

    return [];
};

const DepartmentAppsMarquee = ({ marque_apps, department }) => {
    // Use useMemo instead of useState + useEffect for better performance
    const parsedApps = useMemo(() => parseAppsData(marque_apps), [marque_apps]);

    // Split apps into two equal groups for the two marquees
    const { firstHalf, secondHalf } = useMemo(() => {
        if (!parsedApps.length) return { firstHalf: [], secondHalf: [] };

        const midpoint = Math.ceil(parsedApps.length / 2);
        return {
            firstHalf: parsedApps.slice(0, midpoint),
            secondHalf: parsedApps.slice(midpoint),
        };
    }, [parsedApps]);

    // Early return if no apps to display
    if (!parsedApps.length) return null;

    // Memoized app item renderer for better performance
    const AppItem = ({ app, keyPrefix, isLast }) => {
        const appName = app.app || '';
        const domain = app.domain || '';
        const iconSrc = domain ? `https://thingsofbrand.com/api/icon/${domain}` : '';
        const firstLetter = appName.charAt(0).toUpperCase();

        // Only render if we have an app name
        if (!appName) return null;

        return (
            <div
                key={`${keyPrefix}-${appName}`}
                className={`flex items-center gap-2 whitespace-nowrap ${isLast ? 'mr-20' : ''}`}
            >
                {domain && (
                    <div className="w-8 h-8 relative overflow-hidden rounded-full bg-gray-50 flex items-center justify-center">
                        {iconSrc ? (
                            <img
                                src={iconSrc}
                                alt={`${appName} icon`}
                                width={30}
                                height={30}
                                className="object-contain w-8 h-8"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    // Use React's way of adding elements instead of direct DOM manipulation
                                    e.target.parentNode.innerHTML = `<span class="text-xs font-bold text-gray-700">${firstLetter}</span>`;
                                }}
                            />
                        ) : (
                            <span className="text-xs font-bold text-gray-700">{firstLetter}</span>
                        )}
                    </div>
                )}
                <span className="text-gray-800 font-medium">{appName}</span>
            </div>
        );
    };

    return (
        <div className="flex flex-col gap-6 container py-8 px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <p className="text-center min-w-fit uppercase">
                    Trusted by Teams Using These <span className="text-accent">{department?.name}</span> Apps
                </p>
                <Marquee
                    direction="left"
                    speed={40}
                    autoFill
                    gradient
                    gradientColor={[250, 249, 246]}
                    gradientWidth={96}
                >
                    <div className="flex py-4 gap-20">
                        {firstHalf.map((app, index) => (
                            <AppItem
                                key={`app-${index}`}
                                app={app}
                                keyPrefix="left"
                                isLast={index === firstHalf.length - 1}
                            />
                        ))}
                    </div>
                </Marquee>
            </div>
            <Marquee direction="right" speed={40} autoFill gradient gradientColor={[250, 249, 246]} gradientWidth={96}>
                <div className="flex py-4 gap-20">
                    {secondHalf.map((app, index) => (
                        <AppItem
                            key={`app-${index}`}
                            app={app}
                            keyPrefix="right"
                            isLast={index === secondHalf.length - 1}
                        />
                    ))}
                </div>
            </Marquee>
        </div>
    );
};

export default DepartmentAppsMarquee;
