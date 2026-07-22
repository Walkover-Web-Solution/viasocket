export function generateSlug(title) {
    return title
        ?.trim()
        .replace(/[^a-zA-Z0-9\s]/g, '')
        .replace(/\s+/g, '-')
        .toLowerCase();
}

function findTemplateBySlug(templateData, slug) {
    return templateData.find((t) => generateSlug(t.title) === slug);
}

function buildTemplatePageResponse(selectedTemplate, { templateData, footerData, faqData, navbarData, pageUrl }) {
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

function buildCategoryPageResponse(categoryName, categoryTemplates, { footerData, navbarData, pageUrl }) {
    return {
        footerData: footerData || [],
        metaData: {
            title: `${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} Templates - viaSocket`,
            description: `Discover ${categoryName} automation templates on viaSocket. Streamline your workflows with pre-built integrations.`,
            keywords: `${categoryName}, automation, integration, workflow, templates`,
            image: '/assets/img/viasocket-og-image.png',
            url: pageUrl,
        },
        template: null,
        relatedTemplates: categoryTemplates || [],
        isCategory: true,
        categoryName: categoryName,
        navbarData: navbarData || [],
    };
}

export function resolveAutomationSlug({ slug, templateData, footerData, faqData, navbarData, pageUrl }) {
    const [firstSlug, secondSlug] = slug || [];

    if (firstSlug) {
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

        if (categoryTemplates.length > 0) {
            return buildCategoryPageResponse(categoryName, categoryTemplates, { footerData, navbarData, pageUrl });
        }

        // Single slug: try to resolve as a template title slug
        if (!secondSlug) {
            const selectedTemplate = findTemplateBySlug(templateData, firstSlug);
            if (selectedTemplate) {
                return buildTemplatePageResponse(selectedTemplate, { templateData, footerData, faqData, navbarData, pageUrl });
            }
        }

        // Two slugs: try ID first, then fallback to title slug
        if (secondSlug) {
            const selectedTemplateById = templateData.find((t) => String(t.id) === String(secondSlug));
            if (selectedTemplateById) {
                return buildTemplatePageResponse(selectedTemplateById, { templateData, footerData, faqData, navbarData, pageUrl });
            }

            const selectedTemplateBySlug = findTemplateBySlug(templateData, firstSlug);
            if (selectedTemplateBySlug) {
                return buildTemplatePageResponse(selectedTemplateBySlug, { templateData, footerData, faqData, navbarData, pageUrl });
            }
        }
    }

    return {
        footerData: footerData || [],
        metaData: {
            title: 'viaSocket Template',
            description: 'Discover powerful automation templates on viaSocket',
            keywords: 'automation, integration, workflow',
            image: '/assets/img/viasocket-og-image.png',
            url: pageUrl,
        },
        template: null,
        relatedTemplates: [],
        isCategory: false,
        categoryName: null,
        navbarData: navbarData || [],
        faqData: faqData || [],
    };
}
