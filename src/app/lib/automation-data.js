import {
    getFooterData,
    getNavbarData,
    getTemplateMarqueeItemsData,
} from '@/utils/getData';
import {
    FOOTER_FIELDS,
    NAVBAR_FIELDS,
    TEMPLATEMARQUEEITEMS_FIELDS,
} from '@/const/fields';
import { getMetaData } from '@/utils/getMetaData';
import { getFaqData } from '@/utils/getFaqData';
import { getBlogData } from '@/utils/getBlogData';
import { getTemplates, getApps } from '@/utils/axiosCalls';

export async function getAutomationsPageData() {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://viasocket.com';
        const pageUrl = `${baseUrl}/automations`;

        // Fetch dynamic data in parallel
        const [footerData, templates, metaData, faqData, blogData, navbarData, initialApps, templateMarqueeItems] = await Promise.all([
            getFooterData(FOOTER_FIELDS, '', pageUrl),
            getTemplates(pageUrl),
            getMetaData('/automations', pageUrl),
            getFaqData('/automations', pageUrl),
            getBlogData({ tag1: 'templates' }, pageUrl),
            getNavbarData(NAVBAR_FIELDS, '', pageUrl),
            getApps({ limit: 50 }, pageUrl),
            getTemplateMarqueeItemsData(TEMPLATEMARQUEEITEMS_FIELDS, '', pageUrl),
        ]);

        const validStatuses = ['verified_by_ai', 'verified'];
        const templateData = templates.filter((t) => t?.flowJson?.order?.root && t?.flowJson?.order?.root?.length > 0);
        const validTemplateData = templateData.filter((t) => validStatuses.includes(t.verified));

        const categories = [
            ...new Set(templateData.flatMap((template) => template.category ?? []).filter((c) => c != null)),
        ];

        const apps = [
            ...new Map(
                templateData
                    .flatMap((template) => {
                        // Base apps from pluginData
                        const baseApps = (template.pluginData ?? []).map((p) => ({
                            iconurl: p.iconurl,
                            pluginname: p.pluginname,
                            pluginslugname: p.pluginslugname,
                        }));

                        // Extra apps for webhook/cron trigger types
                        const extraApps = [];
                        if (template.triggerType === 'webhook') {
                            extraApps.push({
                                pluginname: 'Webhook',
                                pluginslugname: 'webhook',
                            });
                        }
                        if (template.triggerType === 'cron') {
                            extraApps.push({
                                pluginname: 'Cron',
                                pluginslugname: 'cron',
                            });
                        }

                        return [...baseApps, ...extraApps];
                    })
                    // Filter out invalid entries
                    .filter((app) => app && app.pluginname)
                    // Map to key-value pairs for uniqueness by slugname
                    .map((app) => [app.pluginslugname, app])
            ).values(),
        ].sort((a, b) => a.pluginname.localeCompare(b.pluginname));

        const marqueeApps = templateMarqueeItems.filter((item) => item.is_app);
        const marqueeCategories = templateMarqueeItems.filter((item) => !item.is_app);

        return {
            footerData: footerData || [],
            metaData: metaData || {
                title: 'Workflow Automation Templates',
                description: 'Discover and use pre-built workflow automation templates',
                keywords: 'automation, templates, workflow',
            },
            templateToShow: validTemplateData || [],
            faqData: faqData || [],
            blogData: blogData || [],
            categories: categories || [],
            apps: apps || [],
            navbarData: navbarData || [],
            initialApps: initialApps || [],
            marqueeApps: marqueeApps || [],
            marqueeCategories: marqueeCategories || [],
        };
    } catch (error) {
        console.error('Error fetching automations page data:', error);
        return {
            footerData: [],
            metaData: {
                title: 'Workflow Automation Templates',
                description: 'Discover and use pre-built workflow automation templates',
                keywords: 'automation, templates, workflow',
            },
            templateToShow: [],
            faqData: [],
            blogData: [],
            categories: [],
            apps: [],
            navbarData: [],
            initialApps: [],
            marqueeApps: [],
            marqueeCategories: [],
        };
    }
}

export async function getAutomationSlugPageData(slug) {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://viasocket.com';
        const pageUrl = `${baseUrl}/automations/${slug.join('/')}`;

        const [firstSlug, secondSlug] = slug || [];

        // Fetch basic data in parallel
        const [footerData, faqData, navbarData, templates] = await Promise.all([
            getFooterData(FOOTER_FIELDS, '', pageUrl),
            getFaqData('/automation', pageUrl),
            getNavbarData(NAVBAR_FIELDS, '', pageUrl),
            getTemplates(pageUrl),
        ]);

        const templateData = templates.filter((t) => t?.flowJson?.order?.root && t?.flowJson?.order?.root?.length > 0);

        // Check if this is a category page (single slug) or template page (two slugs)
        const isCategory = firstSlug && !secondSlug;

        if (isCategory) {
            // Handle category filtering
            const categoryName = firstSlug.replace(/-/g, ' ');
            const categoryTemplates = templateData.filter(
                (template) =>
                    Array.isArray(template.category) &&
                    template.category.some(
                        (cat) =>
                            cat.toLowerCase().replace(/\s+/g, '-') === firstSlug ||
                            cat.toLowerCase() === categoryName.toLowerCase()
                    )
            );
            const metaData = {
                title: `${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} Templates - viaSocket`,
                description: `Discover ${categoryName} automation templates on viaSocket. Streamline your workflows with pre-built integrations.`,
                keywords: `${categoryName}, automation, integration, workflow, templates`,
                image: '/assets/img/viasocket-og-image.png',
                url: pageUrl,
            };
            return {
                footerData: footerData || [],
                metaData: metaData,
                template: null,
                relatedTemplates: categoryTemplates || [],
                isCategory: true,
                categoryName: categoryName,
                navbarData: navbarData || [],
            };
        } else {
            // Handle individual template page
            const selectedTemplate = templateData.find((t) => String(t.id) === String(secondSlug));

            const selectedCategories = Array.isArray(selectedTemplate?.category) ? selectedTemplate.category : [];

            const relatedTemplates = templateData
                .filter(
                    (template) =>
                        template.id !== selectedTemplate?.id &&
                        Array.isArray(template.category) &&
                        template.category.some((cat) => selectedCategories.includes(cat))
                )
                .slice(0, 3);

            const metaData = {
                title: selectedTemplate?.title || 'viaSocket Template',
                description: selectedTemplate?.description || 'Discover powerful automation templates on viaSocket',
                keywords: selectedTemplate?.tags?.join(', ') || 'automation, integration, workflow',
                image: selectedTemplate?.templateUrl || '/assets/img/viasocket-og-image.png',
                url: pageUrl,
            };
            return {
                footerData: footerData || [],
                metaData: metaData,
                template: selectedTemplate || null,
                relatedTemplates: relatedTemplates || [],
                isCategory: false,
                categoryName: null,
                navbarData: navbarData || [],
                faqData: faqData || [],
            };
        }
    } catch (error) {
        console.error('Error fetching automation slug page data:', error);
        return {
            footerData: [],
            metaData: {
                title: 'viaSocket Template',
                description: 'Discover powerful automation templates on viaSocket',
                keywords: 'automation, integration, workflow',
                image: '/assets/img/viasocket-og-image.png',
                url: '',
            },
            template: null,
            relatedTemplates: [],
            isCategory: false,
            categoryName: null,
            navbarData: [],
            faqData: [],
        };
    }
}