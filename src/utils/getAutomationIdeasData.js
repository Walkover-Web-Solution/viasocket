import { getUsecases } from './axiosCalls';

// Mirrors the slugification the automation-ideas app applies to `h1` when
// building its `/automation-ideas/usecase/:slug` article URLs. There is no
// slug field in the API response, so the URL has to be derived from the title.
function slugifyTitle(title) {
    return (title || '')
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

function dedupeById(articles) {
    const seen = new Set();
    return articles.filter((article) => {
        const id = article?._id;
        if (!id || seen.has(id)) return false;
        seen.add(id);
        return true;
    });
}

// The usecases API returns one entry per automation-ideas article that
// mentions the queried app anywhere in its flows, including articles where
// the app isn't the main subject (those come back with `h1: null` and aren't
// published on the site). Keep only published articles and build the slug
// client-side since the API doesn't expose one directly.
export async function getAutomationIdeasData(appSlug, pageUrl, limit = 4) {
    if (!appSlug) return [];

    const articles = await getUsecases(appSlug, pageUrl);
    const published = dedupeById(articles).filter((article) => article?.h1);

    return published.slice(0, limit).map((article) => ({
        id: article._id,
        title: article.h1,
        description: article.subheader || article.meta_description || '',
        slug: slugifyTitle(article.h1),
        apps: (article.apps || []).map((app) => app?.app_slug).filter(Boolean),
    }));
}

// Dual-app pages want articles relevant to both apps, falling back to
// articles about either app when nothing mentions both.
export async function getAutomationIdeasDataForPair(appOneSlug, appTwoSlug, pageUrl, limit = 4) {
    if (!appOneSlug && !appTwoSlug) return [];

    const [appOneArticles, appTwoArticles] = await Promise.all([
        getAutomationIdeasData(appOneSlug, pageUrl, 20),
        appTwoSlug ? getAutomationIdeasData(appTwoSlug, pageUrl, 20) : Promise.resolve([]),
    ]);

    const combined = dedupeById([...appOneArticles, ...appTwoArticles].map((a) => ({ _id: a.id, ...a })));

    const mentionsBoth = combined.filter(
        (article) => article.apps?.includes(appOneSlug) && article.apps?.includes(appTwoSlug)
    );

    const rest = combined.filter((article) => !mentionsBoth.includes(article));

    return [...mentionsBoth, ...rest].slice(0, limit);
}
