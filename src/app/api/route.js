import { notFoundProblem } from '@/utils/jsonErrors';

export const runtime = 'edge';

const handleNotFound = () => notFoundProblem('No resource is served directly at the API root /api.');

export async function GET() {
    return handleNotFound();
}

export async function POST() {
    return handleNotFound();
}

export async function PUT() {
    return handleNotFound();
}

export async function DELETE() {
    return handleNotFound();
}

export async function PATCH() {
    return handleNotFound();
}

export async function HEAD() {
    return handleNotFound();
}

export async function OPTIONS() {
    return handleNotFound();
}
