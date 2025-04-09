export default function getMcpInfo(params) {
    const result = {
        appone: null,
        apptwo: null,
        category: 'all',
        page: null,
    };

    const mcpIndex = params.indexOf('mcp');
    if (mcpIndex !== -1) {
        const nextParam = params[mcpIndex + 1];
        const nextNextParam = params[mcpIndex + 2];

        if (nextParam === 'category') {
            if (nextNextParam) {
                result.category = nextNextParam;
                if (params[mcpIndex + 3] === 'page' && params[mcpIndex + 4]) {
                    result.page = params[mcpIndex + 4];
                }
            }
        } else if (nextParam === 'page') {
            if (nextNextParam) {
                result.page = nextNextParam;
            }
        } else if (nextParam) {
            result.appone = nextParam;
            if (nextNextParam && nextNextParam !== 'category' && nextNextParam !== 'page') {
                result.apptwo = nextNextParam;
            } else if (nextNextParam === 'category' && params[mcpIndex + 3]) {
                result.category = params[mcpIndex + 3];
            } else if (nextNextParam === 'page' && params[mcpIndex + 3]) {
                result.page = params[mcpIndex + 3];
            }
        }
    }
    return result;
}
