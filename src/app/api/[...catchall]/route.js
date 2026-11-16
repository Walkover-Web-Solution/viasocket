import { notFoundProblem } from '@/utils/jsonErrors';

export const runtime = 'edge';

const handleNotFound = (request) => {
    const path = new URL(request.url).pathname;
    return notFoundProblem(`The requested API endpoint was not found: ${path}`);
};

export async function GET(request) {
    return handleNotFound(request);
}

export async function POST(request) {
    return handleNotFound(request);
}

export async function PUT(request) {
    return handleNotFound(request);
}

export async function DELETE(request) {
    return handleNotFound(request);
}

export async function PATCH(request) {
    return handleNotFound(request);
}

export async function HEAD(request) {
    return handleNotFound(request);
}

export async function OPTIONS(request) {
    return handleNotFound(request);
}
