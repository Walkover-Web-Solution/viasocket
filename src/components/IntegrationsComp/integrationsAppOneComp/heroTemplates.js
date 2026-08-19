import TemplateCard from '@/components/templateCard/templateCard';

// Apps whose hero shows ready-made templates instead of the generic use-case list.
const TEMPLATE_HERO_APPS = ['magicalapi'];

// Picks `count` random templates that use the app. Returns an empty array for
// apps that keep the use-case list, so the caller can fall back to it.
export function getHeroTemplates(templates, appSlug, count = 3) {
    if (!appSlug || !TEMPLATE_HERO_APPS.includes(appSlug) || !Array.isArray(templates)) return [];

    const appTemplates = templates.filter((template) =>
        (template?.pluginData || []).some((plugin) => plugin?.pluginslugname === appSlug)
    );

    return [...appTemplates].sort(() => 0.5 - Math.random()).slice(0, count);
}

export default function HeroTemplates({ templates }) {
    return (
        <div className="flex flex-col gap-4">
            <h3 className="text-xs font-semibold tracking-widest uppercase text-gray-500">Popular Templates</h3>
            <div className="flex flex-col gap-3">
                {templates.map((template, index) => (
                    // Grid so the card stretches to exactly 150px; the card clips its own overflow.
                    <div key={template?.id || index} className="grid h-[100px]">
                        <TemplateCard template={template} />
                    </div>
                ))}
            </div>
        </div>
    );
}
