import { getBuiltinTools } from './admin-builtin-tools';
import { getIntegrationsPageData } from './integration-data';

// /tools and /tools/{page}: viaSocket's built-in tools, listed in the admin panel (admin-builtin-tools.js).
// A tool's page shows its plug with the single-app data (/integrations/{slug}), under the tool's own name.

/** The tools that have a page, in the admin's order. */
export async function getToolsIndexData() {
    return (await getBuiltinTools()).filter((t) => t.slug && t.page);
}

/** { tool, others, appOneDetails, actionLayerBlogs, adminContent } for /tools/{page}, or null. `others` are
 *  the other tools with a page, for "More built-in tools". */
export async function getToolPageData(page) {
    const all = await getToolsIndexData();
    const tool = all.find((t) => t.page === page);
    if (!tool) return null;
    const data = await getIntegrationsPageData([tool.slug]);
    if (data?.noData || !data?.appOneDetails || !data.actionLayerBlogs) return null;
    return {
        tool,
        others: all.filter((t) => t.page !== page),
        appOneDetails: { ...data.appOneDetails, name: tool.name, iconurl: tool.icon || data.appOneDetails.iconurl },
        actionLayerBlogs: data.actionLayerBlogs,
        adminContent: data.adminContent,
    };
}
