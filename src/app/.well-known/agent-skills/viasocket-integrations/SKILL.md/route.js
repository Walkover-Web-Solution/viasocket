import { VIASOCKET_INTEGRATIONS_SKILL_MD } from '@/utils/agentSkills';

export const runtime = 'edge';

export async function GET() {
    return new Response(VIASOCKET_INTEGRATIONS_SKILL_MD, {
        headers: {
            'Content-Type': 'text/markdown; charset=utf-8',
            'Cache-Control': 'public, max-age=3600',
            'Access-Control-Allow-Origin': '*',
        },
    });
}
