import { notFound } from 'next/navigation';
import ErrorComp from '@/components/404/404Comp';
import McpAppComp from '@/components/mcpComps/mcpAppComp/McpAppComp';
import McpIndexComp from '@/components/mcpComps/mcpIndexComp/McpIndexComp';
import { getMCPPageData } from '../../lib/data';
import McpClient from '@/app/components/mcp/McpClient';

export async function generateMetadata({ params }) {
    const { slug = [] } = await params;
    
    try {
        const data = await getMCPPageData(slug);
        
        if (data.noData) {
            return {
                title: '404 - Page not found',
                description: 'The page you are looking for does not exist.',
            };
        }

        const { metaData, appOneDetails } = data;
        
        let title = metaData?.title || 'MCP - viaSocket';
        let description = metaData?.description || 'Connect your AI to 1000+ apps with viaSocket MCP';
        
        // Replace [app_name] placeholder with actual app name
        if (appOneDetails?.name) {
            title = title.replace(/\[app_name\]/g, appOneDetails.name);
            description = description.replace(/\[app_name\]/g, appOneDetails.name);
        }
        
        return {
            title,
            description,
            keywords: metaData?.keywords,
            openGraph: {
                title,
                description,
                images: metaData?.image ? [{ url: metaData.image }] : [{ url: "https://files.msg91.com/342616/wnitwkyk" }],
            },
            twitter: {
                card: 'summary_large_image',
                title,
                description,
                images: metaData?.image ? [metaData.image] : ["https://files.msg91.com/342616/wnitwkyk"],
            },
        };
    } catch (error) {
        console.error('Error generating metadata:', error);
        return {
            title: 'MCP - viaSocket',
            description: 'Connect your AI to 1000+ apps with viaSocket MCP',
        };
    }
}

export default async function McpPage({ params }) {
    const { slug = [] } = await params;
    
    try {
        const data = await getMCPPageData(slug);
        
        if (data.noData) {
            return <ErrorComp footerData={data.footerData} />;
        }

      return <McpClient data={data} />;
    } catch (error) {
        console.error('Error rendering MCP page:', error);
        return notFound();
    }
}
