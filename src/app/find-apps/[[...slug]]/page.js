import { getFindAppsPageData } from '@/app/lib/data';
import FindAppsClient from '@/app/components/find-apps/FindAppsClient';

export async function generateMetadata({ params }) {
    try {
        const resolvedParams = await params;
        const slug = resolvedParams.slug || [];
        const data = await getFindAppsPageData(slug);
        
        if (data.noData) {
            return {
                title: '404 - Page not found',
                description: 'The page you are looking for does not exist.',
            };
        }

        const { alphabet } = data;
        
        let title = `Apps starting with ${alphabet?.toUpperCase()} | viaSocket`;
        let description = `Browse and discover a wide range of apps that start with the letter ${alphabet?.toUpperCase()}. Find the perfect app for your needs today!`;
        
        if (!alphabet) {
            title = 'Find Apps | viaSocket';
            description = 'Browse and discover apps by alphabetical order. Find the perfect app for your needs.';
        }
        
        return {
            title,
            description,
            openGraph: {
                title,
                description,
            },
            twitter: {
                card: 'summary_large_image',
                title,
                description,
            },
        };
    } catch (error) {
        console.error('Error generating metadata:', error);
        return {
            title: 'Find Apps | viaSocket',
            description: 'Browse and discover apps by alphabetical order.',
        };
    }
}

export default async function FindAppsPage({ params }) {
    try {
        const resolvedParams = await params;
        const slug = resolvedParams.slug || [];
        const data = await getFindAppsPageData(slug);
        
        if (data.noData) {
            return (
                <div className="container py-20 text-center">
                    <h1 className="text-2xl font-bold">Page Not Found</h1>
                    <p>The page you are looking for does not exist.</p>
                </div>
            );
        }
        
        return <FindAppsClient data={data} />;
    } catch (error) {
        console.error('Error in FindAppsPage:', error);
        return (
            <div className="container py-20 text-center">
                <h1 className="text-2xl font-bold">Error</h1>
                <p>Something went wrong while loading the page.</p>
            </div>
        );
    }
}
