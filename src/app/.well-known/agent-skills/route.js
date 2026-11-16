import { AGENT_SKILLS_INDEX } from '@/utils/agentSkills';

export const runtime = 'edge';

const INDEX_JSON = JSON.stringify(AGENT_SKILLS_INDEX);

export async function GET() {
    return new Response(INDEX_JSON, {
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Cache-Control': 'public, max-age=3600',
            'Access-Control-Allow-Origin': '*',
        },
    });
}
