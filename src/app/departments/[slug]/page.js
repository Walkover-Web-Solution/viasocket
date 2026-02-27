import { getDepartmentPageData } from '@/app/lib/department-data';
import DepartmentClient from '@/app/components/department/DepartmentClient';
import { notFound } from 'next/navigation';
import { getHasToken } from '@/app/lib/getAuth';

export const runtime = 'edge';

export async function generateMetadata({ params }) {
    try {
        const { slug } = await params;
        const data = await getDepartmentPageData(slug);
        
        if (data.noData || !data.department) {
            return {
                title: 'Department Not Found | viaSocket',
                description: 'The requested department page could not be found.',
            };
        }

        const { metaData, department } = data;
        
        let title = metaData?.title || `${department?.name || 'Department'} | viaSocket`;
        let description = metaData?.description || department?.h1_description || `Explore ${department?.name} automation workflows and integrations.`;
        
        return {
            title,
            description,
            openGraph: {
                title,
                description,
                url: `https://viasocket.com/departments/${slug}`,
                siteName: 'viaSocket',
                type: 'website',
            },
            twitter: {
                card: 'summary_large_image',
                title,
                description,
            },
        };
    } catch (error) {
        console.error('Error generating metadata for department page:', error);
        return {
            title: 'Department | viaSocket',
            description: 'Explore department automation workflows and integrations.',
        };
    }
}

export default async function DepartmentPage({ params }) {
    try {
        const { slug } = await params;
        const data = await getDepartmentPageData(slug);
        const hasToken = await getHasToken();
        
        if (data.noData || !data.department) {
            notFound();
        }

        return <DepartmentClient data={data} hasToken={hasToken} />;
    } catch (error) {
        console.error('Error in department page:', error);
        notFound();
    }
}
