import { redirect } from 'next/navigation';

export const runtime = 'edge';

export default async function McpPage({ params }) {
    const { slug = [] } = await params;

    const targetUrl = `https://mushroom.viasocket.com/mcp/${slug}`;

    redirect(targetUrl);
}

