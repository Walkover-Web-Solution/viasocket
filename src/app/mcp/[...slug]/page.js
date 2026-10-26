import { notFound } from 'next/navigation';
import ErrorComp from '@/components/404/404Comp';
import { getMCPPageData } from '../../lib/mcp-data';
import McpMain from '@/app/components/mcp/McpMain';

export const runtime = 'edge';

// App pages (/mcp/{app}) own their title and description. The table-api row
// `/mcp/appName` is still "{App} MCP | viaSocket" and has no short-name field,
// so a name that would push the new title past 60 characters drops
// "Free, Instant Setup" and keeps the name to 35 characters. A description past
// 155 characters shortens the name on a word boundary. `/mcp/aiagent` and `/mcp/saas`
// are separate routes and do not use this.
const MCP_APP_TITLE_LIMIT = 60;
const MCP_APP_DESCRIPTION_LIMIT = 155;
const MCP_APP_TITLE_NAME_LIMIT = 35;
const MCP_APP_TITLE_FULL_SUFFIX = ' MCP Server | Free, Instant Setup | viaSocket';
const MCP_APP_TITLE_SHORT_SUFFIX = ' MCP Server | viaSocket';
const MCP_APP_DESCRIPTION_PREFIX = 'Connect ';
const MCP_APP_DESCRIPTION_SUFFIX =
    " to ChatGPT, Claude, and Cursor with viaSocket's free MCP Server." +
    ' Get a secure endpoint in minutes — no API wrangling needed.';

function cutAppName(name, maxLength) {
    if (maxLength < 1) return '';
    if (name.length <= maxLength) return name;
    const sliced = name.slice(0, maxLength).trimEnd();
    return sliced || name.slice(0, maxLength);
}

// Descriptions have no specified overflow formula. Cut on a word so a long
// display name does not end mid-word inside the 155-character limit.
function cutAppNameAtWord(name, maxLength) {
    if (maxLength < 1) return '';
    if (name.length <= maxLength) return name;
    const sliced = name.slice(0, maxLength).trimEnd();
    const space = sliced.lastIndexOf(' ');
    const atWord = space > 0 ? sliced.slice(0, space).trimEnd() : '';
    return atWord || sliced || name.slice(0, maxLength);
}

function mcpAppTitle(appName) {
    const full = `${appName}${MCP_APP_TITLE_FULL_SUFFIX}`;
    if (full.length <= MCP_APP_TITLE_LIMIT) return full;
    return `${cutAppName(appName, MCP_APP_TITLE_NAME_LIMIT)}${MCP_APP_TITLE_SHORT_SUFFIX}`;
}

function mcpAppDescription(appName) {
    const room =
        MCP_APP_DESCRIPTION_LIMIT - MCP_APP_DESCRIPTION_PREFIX.length - MCP_APP_DESCRIPTION_SUFFIX.length;
    return `${MCP_APP_DESCRIPTION_PREFIX}${cutAppNameAtWord(appName, room)}${MCP_APP_DESCRIPTION_SUFFIX}`;
}

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
        
        if (appOneDetails?.name) {
            title = mcpAppTitle(appOneDetails.name);
            description = mcpAppDescription(appOneDetails.name);
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

      return <McpMain data={data} />;
    } catch (error) {
        console.error('Error rendering MCP page:', error);
        return notFound();
    }
}
