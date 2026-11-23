export const APPERPAGE = 45;

// Apps pinned to the first grid position of a category listing, by category slug.
export const CATEGORY_PINNED_APPS = {
    'human-resources': 'magicalapi',
    'hr-talent-and-recruitment': 'magicalapi',
};

// "Built-in tools" in the /integrations category list (after "All"): not a table-api category, it links to
// /tools. Its old address, /integrations/category/built-in-tools (and /page/N), redirects there
// (src/app/integrations/[...slug]/page.js).
export const BUILTIN_TOOLS_CATEGORY = { name: 'Built-in tools', slug: 'built-in-tools', href: '/tools' };
