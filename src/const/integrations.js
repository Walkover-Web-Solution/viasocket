export const APPERPAGE = 45;

// Apps pinned to the first grid position of a category listing, by category slug.
export const CATEGORY_PINNED_APPS = {
    'human-resources': 'magicalapi',
    'hr-talent-and-recruitment': 'magicalapi',
};

// The "Built-in tools" category: viaSocket's own tools, managed in the admin panel (Pages → Built-in tools)
// rather than table-api. It sits after "All" in the category list (AppDirectory).
export const BUILTIN_TOOLS_CATEGORY = { name: 'Built-in tools', slug: 'built-in-tools' };

/** A built-in tool's own URL: /tools/{page} when it has a page, else its plug's /integrations/{slug}, else null. */
export const toolHref = (t) => (t?.slug && t?.page ? `/tools/${t.page}` : t?.slug ? `/integrations/${t.slug}` : null);
