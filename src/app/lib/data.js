import {
    getFooterData,
    getIndexTemplateData,
    getReviewSectionData,
    getNavbarData,
    getTestimonialData,
    getPricingFeatureData,
    getProgramsData,
    getAgencies,
    getExpertBlogs,
    getPageData,
    getEmbedData,
    getDepartmentData,
    getCategoryData,
    getMCPPromptData,
    getDoFollowStatus,
    getUsecasesData,
} from '@/utils/getData';
import {
    FOOTER_FIELDS,
    INDEXTEMPLATE_FIELDS,
    REVIEWSECTION_FIELDS,
    NAVBAR_FIELDS,
    TESTIMONIALS_FIELDS,
    PRICINGFEATURE_FIELDS,
    COUNTRIES_FIELDS,
    PROGRAMS_FIELDS,
    AGENCIES_FIELDS,
    EXPERTBLOGS_FIELDS,
    PAGEDATA_FIELDS,
    EMBED_FIELDS,
    DEPARTMENTDATA_FIELDS,
    INTECATEGORY_FIELDS,
    INTECATEGORYlIST_FILED,
    MCP_FIELDS,
    DOFOLLOWLINK_FIELDS,
    USECASES_FIELDS,
    ALLFEATURES_FIELDS,
} from '@/const/fields';
import { getMetaData } from '@/utils/getMetaData';
import { getFaqData } from '@/utils/getFaqData';
import { getBlogData } from '@/utils/getBlogData';
import { getVideoData } from '@/utils/getVideoData';
import { getAppCount, getTemplates, getApps, getCombos } from '@/utils/axiosCalls';
import getCountries from '@/utils/getCountries';
import { validateTemplateData } from '@/utils/validateTemplateData';
import getPageInfo from '@/utils/getPageInfo';
import getMcpInfo from '@/utils/getMcpInfo';
import getIntegrationsInfo from '@/utils/getInterationsInfo';
import getAppDetails from '@/utils/getAppDetail';
import { fetchPluginData } from '@/utils/axiosCalls';
import { getAllFeatures, getFeatureData } from '@/utils/getData';

export async function getHomePageData() {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://viasocket.com';
        const pageUrl = `${baseUrl}/`;

        // Fetch all data in parallel for better performance
        const [
            faqData,
            metaData,
            footerData,
            appCount,
            indexTemplateData,
            reviewData,
            navbarData,
            templates,
            initialApps,
        ] = await Promise.all([
            getFaqData('/index', pageUrl),
            getMetaData('/', pageUrl),
            getFooterData(FOOTER_FIELDS, '', pageUrl),
            getAppCount(pageUrl),
            getIndexTemplateData(INDEXTEMPLATE_FIELDS, '', pageUrl),
            getReviewSectionData(REVIEWSECTION_FIELDS, '', pageUrl),
            getNavbarData(NAVBAR_FIELDS, '', pageUrl),
            getTemplates(pageUrl),
            getApps({ limit: 50 }, pageUrl),
        ]);

        const validStatuses = ['verified_by_ai', 'verified'];
        const templateData = templates.filter((t) => t?.flowJson?.order?.root && t?.flowJson?.order?.root?.length > 0);
        const verifiedTemplates = templateData.filter((t) => validStatuses.includes(t.verified));
        const validTemplateData = validateTemplateData(verifiedTemplates);

        const securityGridData = [
            {
                title: 'SOC 2 (Type II)',
                description:
                    "Your workflow's data is handled with the highest level of security, privacy, and confidentiality.",
                iconName: 'shield-alt',
            },
            {
                title: 'ISO Certified',
                description:
                    'We consistently meet international standards to deliver reliable and secure solutions for your business.',
                iconName: 'certificate',
            },
            {
                title: 'GDPR & CCPA Compliance',
                description: 'Your data remains private and entirely under your control, at all times.',
                iconName: 'user-shield',
            },
            {
                title: 'End-to-End Observability',
                description:
                    "Gain full visibility into your data's journey with detailed audit logs, real-time analytics, and proactive alerts.",
                iconName: 'eye',
            },
            {
                title: '99.99% Uptime & Enterprise SLA',
                description: 'Stay worry-free with 99.99% uptime and fast, reliable support when you need it most.',
                iconName: 'clock',
            },
            {
                title: 'Error Handling & Recovery',
                description:
                    'Stay ahead of issues with smart alerts and AI-powered troubleshooting, keeping your workflows running smoothly.',
                iconName: 'bug',
            },
        ];

        return {
            metaData: metaData || {},
            faqData: faqData || [],
            footerData: footerData || [],
            securityGridData,
            appCount: appCount || 0,
            indexTemplateData: indexTemplateData || [],
            reviewData: reviewData || [],
            navbarData: navbarData || [],
            templateData: validTemplateData || [],
            initialApps: initialApps || [],
        };
    } catch (error) {
        console.error('Error fetching home page data:', error);
        // Return default values in case of error
        return {
            metaData: {},
            faqData: [],
            footerData: [],
            securityGridData: [],
            appCount: 0,
            indexTemplateData: [],
            reviewData: [],
            navbarData: [],
            templateData: [],
            initialApps: [],
        };
    }
}

export async function getWorkflowAutomationsPageData() {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://viasocket.com';
        const pageUrl = `${baseUrl}/workflow-automations`;

        // Fetch dynamic data in parallel
        const [footerData, navbarData, metaData, faqData] = await Promise.all([
            getFooterData(FOOTER_FIELDS, '', pageUrl),
            getNavbarData(NAVBAR_FIELDS, '', pageUrl),
            getMetaData('/workflow-automations', pageUrl),
            getFaqData('/workflow-automations', pageUrl),
        ]);

        // Static data for workflow automations page
        const automationSteps = [
            {
                title: 'Find repetitive tasks',
                description: 'Look for tasks that you do over and over again. These are perfect for automation.',
            },
            {
                title: 'Set up triggers',
                description:
                    'Decide what event will start your automation. This could be receiving an email, a form submission, or a specific time.',
            },
            {
                title: 'Define actions',
                description:
                    'Choose what should happen when the trigger occurs. This could be sending an email, updating a database, or creating a task.',
            },
            {
                title: 'Let automation do the work',
                description:
                    'Once set up, your automation will run automatically, handling the repetitive tasks for you.',
            },
            {
                title: 'Track and improve',
                description: "Monitor your automations to see how they're performing and make improvements as needed.",
            },
        ];

        const importancePoints = [
            {
                iconName: 'time',
                title: 'Saves time',
                description:
                    'By automating repetitive tasks, you free up time to focus on more important work that requires human creativity and decision-making.',
            },
            {
                iconName: 'error',
                title: 'Reduces errors',
                description:
                    'Automated processes follow the same steps every time, which means fewer mistakes compared to manual work where people might forget steps or make typos.',
            },
            {
                iconName: 'team',
                title: 'Improves team productivity',
                description:
                    'When routine tasks are automated, your team can spend their energy on strategic projects that help grow the business.',
            },
            {
                iconName: 'scale',
                title: 'Helps you scale',
                description:
                    'As your business grows, automation lets you handle more work without hiring more people for routine tasks.',
            },
        ];

        const automationExamples = [
            {
                category: 'Marketing',
                description:
                    'When someone fills out a contact form on your website, automatically add them to your email list and send a welcome email.',
            },
            {
                category: 'Sales',
                description:
                    'When a potential customer downloads a brochure, automatically create a follow-up task for your sales team.',
                aiNote: 'AI can analyze customer behavior and suggest the best follow-up approach.',
            },
            {
                category: 'HR',
                description:
                    'When a new employee is hired, automatically create accounts for them in all necessary systems and send them an onboarding checklist.',
            },
            {
                category: 'Customer Support',
                description:
                    'When a customer sends a support email, automatically categorize it and assign it to the right team member.',
                aiNote: 'AI can understand the content of emails and route them more accurately than simple keyword matching.',
            },
        ];

        const gettingStartedSteps = [
            {
                title: 'Start small',
                description:
                    'Pick one simple, repetitive task that annoys you. This could be copying data between systems or sending the same email over and over.',
            },
            {
                title: 'Map it out',
                description:
                    "Write down every step of the process. What triggers it? What actions need to happen? What's the end result?",
            },
            {
                title: 'Choose your tools',
                description:
                    'Look for automation tools that connect the apps you already use. Many tools offer free trials so you can test them out.',
            },
            {
                title: 'Build and test',
                description:
                    'Create your first automation and test it thoroughly. Make sure it works correctly before letting it run automatically.',
            },
            {
                title: 'Monitor and improve',
                description:
                    "Keep an eye on your automation to make sure it's working as expected. As you get comfortable, you can add more complex automations.",
            },
        ];

        const workflowAutomationTools = [
            {
                title: 'Ease of use',
                description:
                    "The tool should be easy to set up and use, even if you're not technical. Look for drag-and-drop interfaces and clear instructions.",
            },
            {
                title: 'Role-based controls',
                description:
                    'While creating workflow automation for an approval process, having access controls based on organizational hierarchy will help you better secure data.',
            },
            {
                title: 'Dashboards & reports',
                description:
                    'You should be able to visualize key performance indicators, and analyze business data with interactive charts, gauges, tables, and more, within a few clicks.',
            },
            {
                title: 'Seamless integrations',
                description:
                    'Choose workflow automation tools that have pre built integrations with ERPs, payment gateways, third-party vendors, and authentication services.',
            },
            {
                title: 'Mobile support',
                description:
                    'For in-the-field jobs, mobile support is crucial. Look for a workflow automation system that supports easy mobile access.',
            },
            {
                title: 'Extensibility',
                description:
                    'In case you want to incorporate more functionalities to your automated workflows, the platform should provide options like APIs and custom functions, to make your process as customizable as possible.',
            },
        ];

        return {
            metaData: metaData || {},
            faqData: faqData || [],
            footerData: footerData || [],
            navbarData: navbarData || [],
            automationSteps,
            importancePoints,
            automationExamples,
            gettingStartedSteps,
            workflowAutomationTools,
        };
    } catch (error) {
        console.error('Error fetching workflow automations page data:', error);
        return {
            metaData: {},
            faqData: [],
            footerData: [],
            navbarData: [],
            automationSteps: [],
            importancePoints: [],
            automationExamples: [],
            gettingStartedSteps: [],
            workflowAutomationTools: [],
        };
    }
}

export async function getSignupPageData() {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://viasocket.com';
        const pageUrl = `${baseUrl}/signup`;

        // Fetch dynamic data in parallel
        const [appCount] = await Promise.all([getAppCount(pageUrl)]);

        return {
            appCount: appCount || 0,
        };
    } catch (error) {
        console.error('Error fetching signup page data:', error);
        return {
            appCount: 0,
        };
    }
}

export async function getWorkflowAutomationIdeasPageData() {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://viasocket.com';
        const pageUrl = `${baseUrl}/workflow-automation-ideas`;

        // Fetch dynamic data in parallel
        const [metaData] = await Promise.all([getMetaData('/workflow-automation-ideas', pageUrl)]);

        return {
            metaData: metaData || {},
        };
    } catch (error) {
        console.error('Error fetching workflow automation ideas page data:', error);
        return {
            metaData: {},
        };
    }
}

export async function getTermsPageData() {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://viasocket.com';
        const pageUrl = `${baseUrl}/terms`;

        // Fetch dynamic data in parallel
        const [footerData, navbarData, metaData] = await Promise.all([
            getFooterData(FOOTER_FIELDS, '', pageUrl),
            getNavbarData(NAVBAR_FIELDS, '', pageUrl),
            getMetaData('/terms', pageUrl),
        ]);

        return {
            metaData: metaData || {},
            footerData: footerData || [],
            navbarData: navbarData || [],
        };
    } catch (error) {
        console.error('Error fetching terms page data:', error);
        return {
            metaData: {},
            footerData: [],
            navbarData: [],
        };
    }
}

export async function getPrivacyPageData() {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://viasocket.com';
        const pageUrl = `${baseUrl}/privacy`;

        // Fetch dynamic data in parallel
        const [footerData, navbarData, metaData] = await Promise.all([
            getFooterData(FOOTER_FIELDS, '', pageUrl),
            getNavbarData(NAVBAR_FIELDS, '', pageUrl),
            getMetaData('/privacy', pageUrl),
        ]);

        return {
            metaData: metaData || {},
            footerData: footerData || [],
            navbarData: navbarData || [],
        };
    } catch (error) {
        console.error('Error fetching privacy page data:', error);
        return {
            metaData: {},
            footerData: [],
            navbarData: [],
        };
    }
}

export async function getSupportPageData() {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://viasocket.com';
        const pageUrl = `${baseUrl}/support`;

        // Fetch dynamic data in parallel
        const [footerData, navbarData, metaData, testimonials] = await Promise.all([
            getFooterData(FOOTER_FIELDS, '', pageUrl),
            getNavbarData(NAVBAR_FIELDS, '', pageUrl),
            getMetaData('/support', pageUrl),
            getTestimonialData(TESTIMONIALS_FIELDS, '', pageUrl),
        ]);

        return {
            metaData: metaData || {},
            footerData: footerData || [],
            navbarData: navbarData || [],
            testimonials: testimonials || [],
        };
    } catch (error) {
        console.error('Error fetching support page data:', error);
        return {
            metaData: {},
            footerData: [],
            navbarData: [],
            testimonials: [],
        };
    }
}

export async function getPricingPageData() {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://viasocket.com';
        const pageUrl = `${baseUrl}/pricing`;

        // Fetch dynamic data in parallel
        const [metaData, footerData, faqData, features, countries, appCount, navbarData] = await Promise.all([
            getMetaData('/pricing', pageUrl),
            getFooterData(FOOTER_FIELDS, '', pageUrl),
            getFaqData('/pricing', pageUrl),
            getPricingFeatureData(PRICINGFEATURE_FIELDS, '', pageUrl),
            getCountries(COUNTRIES_FIELDS, '', pageUrl),
            getAppCount(pageUrl),
            getNavbarData(NAVBAR_FIELDS, '', pageUrl),
        ]);

        return {
            metaData: metaData || {},
            footerData: footerData || [],
            faqData: faqData || [],
            features: features || [],
            countries: countries || [],
            appCount: appCount || 0,
            navbarData: navbarData || [],
        };
    } catch (error) {
        console.error('Error fetching pricing page data:', error);
        return {
            metaData: {},
            footerData: [],
            faqData: [],
            features: [],
            countries: [],
            appCount: 0,
            navbarData: [],
        };
    }
}

export async function getFreeAccessProgramsPageData() {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://viasocket.com';
        const pageUrl = `${baseUrl}/free-access-programs`;

        // Fetch dynamic data in parallel
        const [footerData, metaData, programs, navbarData] = await Promise.all([
            getFooterData(FOOTER_FIELDS, '', pageUrl),
            getMetaData('/free-access-programs', pageUrl),
            getProgramsData(PROGRAMS_FIELDS, '', pageUrl),
            getNavbarData(NAVBAR_FIELDS, '', pageUrl),
        ]);

        return {
            footerData: footerData || [],
            metaData: metaData || {},
            programs: programs || [],
            navbarData: navbarData || [],
        };
    } catch (error) {
        console.error('Error fetching free access programs page data:', error);
        return {
            footerData: [],
            metaData: {},
            programs: [],
            navbarData: [],
        };
    }
}

export async function getExpertsPageData() {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://viasocket.com';
        const pageUrl = `${baseUrl}/experts`;

        // Fetch dynamic data in parallel
        const [metaData, footerData, pageData, verifiedAgencies, notVerifiesAgencies, expertsBlog, navbarData] =
            await Promise.all([
                getMetaData('/experts', pageUrl),
                getFooterData(FOOTER_FIELDS, '', pageUrl),
                getPageData(PAGEDATA_FIELDS, '', pageUrl),
                getAgencies(AGENCIES_FIELDS, 'filter=verified=true', pageUrl),
                getAgencies(AGENCIES_FIELDS, 'filter=verified IS NULL', pageUrl),
                getExpertBlogs(EXPERTBLOGS_FIELDS, '', pageUrl),
                getNavbarData(NAVBAR_FIELDS, '', pageUrl),
            ]);

        return {
            verifiedAgencies: verifiedAgencies || [],
            notVerifiesAgencies: notVerifiesAgencies || [],
            pageData: (pageData?.length > 0 && pageData[0]) || {},
            metaData: metaData || {},
            expertsHelp: expertsBlog || [],
            footerData: footerData || [],
            navbarData: navbarData || [],
        };
    } catch (error) {
        console.error('Error fetching experts page data:', error);
        return {
            verifiedAgencies: [],
            notVerifiesAgencies: [],
            pageData: {},
            metaData: {},
            expertsHelp: [],
            footerData: [],
            navbarData: [],
        };
    }
}

export async function getEmbedPageData() {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://viasocket.com';
        const pageUrl = `${baseUrl}/embed`;

        // Fetch dynamic data in parallel
        const [metaData, footerData, navbarData, faqData, embedData, blogData, appCount] = await Promise.all([
            getMetaData('/embed', pageUrl),
            getFooterData(FOOTER_FIELDS, '', pageUrl),
            getNavbarData(NAVBAR_FIELDS, '', pageUrl),
            getFaqData('/embed', pageUrl),
            getEmbedData(EMBED_FIELDS, '', pageUrl),
            getBlogData({ tag1: 'embed' }, pageUrl),
            getAppCount(pageUrl),
        ]);

        // Static data
        const tableData = [
            { Feature: 'Time to Implement', embed: 'Minutes', development: 'Weeks/Months' },
            { Feature: 'Developer Resources', embed: 'No Requirements', development: 'Required Development Team' },
            {
                Feature: 'Maintenance & Updates',
                embed: 'Managed by viaSocket',
                development: 'Ongoing Maintenance Needed',
            },
            { Feature: 'Pre-Made Templates', embed: 'Available', development: 'Requires Manual Setup' },
            { Feature: 'Scalability', embed: 'Easy to scale', development: 'Complex to scale' },
        ];

        const howItWorksData = [
            {
                title: 'Configure the Display',
                description:
                    "You have full control over the integration's appearance and functionality. Customize the display style, button type, and filter available services to suit your needs.",
            },
            {
                title: 'Generate JWT Token',
                description:
                    'To generate the JWT token, gather the org_id, user_id, project_id, and access key to ensure each user only sees their relevant flows.',
            },
            {
                title: 'Embed SDK',
                description: "Once you've got your token, grab the SDK code snippet and paste it into your app's code.",
            },
        ];

        return {
            footerData: footerData || [],
            navbarData: navbarData || [],
            blogData: blogData || [],
            faqData: faqData || [],
            embedData: embedData || [],
            tableData: tableData,
            howItWorksData: howItWorksData,
            metaData: metaData || {},
            appCount: appCount || 0,
        };
    } catch (error) {
        console.error('Error fetching embed page data:', error);
        return {
            footerData: [],
            navbarData: [],
            blogData: [],
            faqData: [],
            embedData: [],
            tableData: [],
            howItWorksData: [],
            metaData: {},
            appCount: 0,
        };
    }
}

export async function getDepartmentsPageData() {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://viasocket.com';
        const pageUrl = `${baseUrl}/department`;

        // Fetch dynamic data in parallel
        const [metaData, navbarData, footerData, departmentData, faqData, reviewData, appCount] = await Promise.all([
            getMetaData('/department', pageUrl),
            getNavbarData(NAVBAR_FIELDS, '', pageUrl),
            getFooterData(FOOTER_FIELDS, '', pageUrl),
            getDepartmentData(DEPARTMENTDATA_FIELDS, '', pageUrl),
            getFaqData('/departments', pageUrl),
            getReviewSectionData(REVIEWSECTION_FIELDS, '', pageUrl),
            getAppCount(pageUrl),
        ]);

        return {
            metaData: metaData || {},
            navbarData: navbarData || {},
            footerData: footerData || {},
            departmentData: departmentData || {},
            faqData: faqData || {},
            reviewData: reviewData || {},
            appCount: appCount || 1764,
        };
    } catch (error) {
        console.error('Error fetching departments page data:', error);
        return {
            metaData: {},
            navbarData: {},
            footerData: {},
            departmentData: {},
            faqData: {},
            reviewData: {},
            appCount: 1764,
        };
    }
}

export async function getDataRetentionDeletionPageData() {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://viasocket.com';
        const pageUrl = `${baseUrl}/data-retention-deletion`;

        // Fetch dynamic data in parallel
        const [footerData, metaData, navbarData] = await Promise.all([
            getFooterData(FOOTER_FIELDS, '', pageUrl),
            getMetaData('/data-retention-deletion', pageUrl),
            getNavbarData(NAVBAR_FIELDS, '', pageUrl),
        ]);

        return {
            footerData: footerData || [],
            metaData: metaData || {},
            navbarData: navbarData || [],
        };
    } catch (error) {
        console.error('Error fetching data retention deletion page data:', error);
        return {
            footerData: [],
            metaData: {},
            navbarData: [],
        };
    }
}

export async function getDataDeletionPolicyPageData() {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://viasocket.com';
        const pageUrl = `${baseUrl}/data-deletion-policy`;

        // Fetch dynamic data in parallel
        const [footerData, metaData, navbarData] = await Promise.all([
            getFooterData(FOOTER_FIELDS, '', pageUrl),
            getMetaData('/data-deletion-policy', pageUrl),
            getNavbarData(NAVBAR_FIELDS, '', pageUrl),
        ]);

        return {
            footerData: footerData || [],
            metaData: metaData || {},
            navbarData: navbarData || [],
        };
    } catch (error) {
        console.error('Error fetching data deletion policy page data:', error);
        return {
            footerData: [],
            metaData: {},
            navbarData: [],
        };
    }
}

export async function getAutomationsPageData() {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://viasocket.com';
        const pageUrl = `${baseUrl}/automations`;

        // Fetch dynamic data in parallel
        const [footerData, templates, metaData, faqData, blogData, navbarData, initialApps] = await Promise.all([
            getFooterData(FOOTER_FIELDS, '', pageUrl),
            getTemplates(pageUrl),
            getMetaData('/automations', pageUrl),
            getFaqData('/automations', pageUrl),
            getBlogData({ tag1: 'templates' }, pageUrl),
            getNavbarData(NAVBAR_FIELDS, '', pageUrl),
            getApps({ limit: 50 }, pageUrl),
        ]);

        const validStatuses = ['verified_by_ai', 'verified'];
        const templateData = templates.filter((t) => t?.flowJson?.order?.root && t?.flowJson?.order?.root?.length > 0);
        const verifiedTemplates = templateData.filter((t) => validStatuses.includes(t.verified));
        const validTemplateData = validateTemplateData(verifiedTemplates);

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
        };
    }
}

export async function getAutomationSlugPageData(slug) {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://viasocket.com';
        const pageUrl = `${baseUrl}/automations/${slug.join('/')}`;

        const [firstSlug, secondSlug] = slug || [];

        // Fetch basic data in parallel
        const [footerData, navbarData, templates] = await Promise.all([
            getFooterData(FOOTER_FIELDS, '', pageUrl),
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
        };
    }
}

export async function getMCPAiAgentPageData() {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://viasocket.com';
        const pageUrl = `${baseUrl}/mcp/aiagent`;

        // Fetch data in parallel
        const [metaData, footerData, faqData, blogData, navbarData] = await Promise.all([
            getMetaData('/mcp', pageUrl),
            getFooterData(FOOTER_FIELDS, '', pageUrl),
            getFaqData('/mcp', pageUrl),
            getBlogData({ tag1: 'mcp' }, pageUrl),
            getNavbarData(NAVBAR_FIELDS, '', pageUrl),
        ]);

        return {
            metaData: metaData || {},
            footerData: footerData || [],
            faqData: faqData || [],
            blogData: blogData || [],
            navbarData: navbarData || [],
        };
    } catch (error) {
        console.error('Error fetching MCP AI Agent page data:', error);
        return {
            metaData: {},
            footerData: [],
            faqData: [],
            blogData: [],
            navbarData: [],
        };
    }
}

export async function getMCPSaasPageData() {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://viasocket.com';
        const pageUrl = `${baseUrl}/mcp/saas`;

        // Fetch data in parallel
        const [metaData, footerData, faqData, blogData, navbarData] = await Promise.all([
            getMetaData('/mcp', pageUrl),
            getFooterData(FOOTER_FIELDS, '', pageUrl),
            getFaqData('/mcp', pageUrl),
            getBlogData({ tag1: 'mcp', tag2: 'saas' }, pageUrl),
            getNavbarData(NAVBAR_FIELDS, '', pageUrl),
        ]);

        return {
            metaData: metaData || {},
            footerData: footerData || [],
            faqData: faqData || [],
            blogData: blogData || [],
            navbarData: navbarData || [],
        };
    } catch (error) {
        console.error('Error fetching MCP SaaS page data:', error);
        return {
            metaData: {},
            footerData: [],
            faqData: [],
            blogData: [],
            navbarData: [],
        };
    }
}

export async function getMCPPageData(slug = []) {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://viasocket.com';
        const pageUrl = `${baseUrl}/mcp${slug.length > 0 ? '/' + slug.join('/') : ''}`;

        // Create page info from slug
        const pageInfo = { pathArray: ['mcp', ...slug] };
        const mcpInfo = getMcpInfo(pageInfo?.pathArray);

        // Fetch basic data that all pages need
        const [footerData, navbarData] = await Promise.all([
            getFooterData(FOOTER_FIELDS, '', pageUrl),
            getNavbarData(NAVBAR_FIELDS, '', pageUrl),
        ]);

        if (mcpInfo?.appone) {
            // App-specific MCP page
            const [metaData, faqData, categoryData, combosData] = await Promise.all([
                getMetaData('/mcp/appName', pageUrl),
                getFaqData('[mcpApp]', pageUrl),
                getCategoryData(INTECATEGORY_FIELDS, `filter=slug='${mcpInfo?.category || 'all'}'`, pageUrl),
                getCombos(mcpInfo, pageUrl),
            ]);

            const apps = await getApps({ page: mcpInfo?.page, categoryData, limit: 16 }, pageUrl);

            const appOneDetails = getAppDetails(combosData, mcpInfo?.appone);

            if (appOneDetails) {
                const [blogData, mcpPromptData] = await Promise.all([
                    getBlogData({ tag1: 'mcp' }, pageUrl),
                    getMCPPromptData(MCP_FIELDS, `filter=slug_names='${appOneDetails?.appslugname}'`, pageUrl),
                ]);

                const mcpAppSteps = [
                    {
                        title: 'Get Your MCP Endpoint',
                        description:
                            "Instantly get a unique, secure URL that connects your AI assistant to viaSocket's network of integrations",
                    },
                    {
                        title: 'Choose Your Actions',
                        description: `Choose and configure the actions your AI assistant can perform in ${appOneDetails?.name}`,
                    },
                    {
                        title: 'Connect Your AI Assistant',
                        description:
                            'Connect your AI Assistant easily with the MCP endpoint for instant, secure task execution',
                    },
                ];

                const mcpAIIntegrationData = [
                    "Skip the hassle of building or hosting your own APIs.We've already done the hard work",
                    'Set it up once and instantly tap into 1,000+ apps in simple and seamless fashion',
                    'Enjoy secure, scoped access right out of the box . Your data is in good hands',
                    'Compatible with all your go-to  tools. Just plug and play',
                ];

                return {
                    pageInfo: pageInfo || {},
                    footerData: footerData || {},
                    apps: apps || [],
                    metaData: metaData || {},
                    faqData: faqData || [],
                    mcpInfo: mcpInfo || {},
                    appOneDetails: appOneDetails || {},
                    categoryData: {},
                    blogsData: blogData || [],
                    combosData: combosData || [],
                    mcpAppSteps: mcpAppSteps || [],
                    mcpPromptData: mcpPromptData || [],
                    mcpAIIntegrationData: mcpAIIntegrationData || [],
                    navbarData: navbarData || {},
                    noData: false,
                };
            } else {
                return {
                    noData: true,
                    footerData: footerData || {},
                    navbarData: navbarData || {},
                };
            }
        } else {
            // MCP index page (handles /mcp, /mcp/category, /mcp/category/[category]/page/[pageno])
            const [metaData, faqData, categoryData, appCount, categories, blogData] = await Promise.all([
                getMetaData('/mcp', pageUrl),
                getFaqData('[mcpApp]', pageUrl),
                getCategoryData(INTECATEGORY_FIELDS, `filter=slug='${mcpInfo?.category || 'all'}'`, pageUrl),
                getAppCount(pageUrl),
                getCategoryData(INTECATEGORYlIST_FILED, '', pageUrl),
                getBlogData({ tag1: 'mcp' }, pageUrl),
            ]);

            const apps = await getApps({ page: mcpInfo?.page, categoryData }, pageUrl);

            const mcpSteps = [
                {
                    title: 'Get Your MCP Endpoint',
                    description:
                        "Instantly get a unique, secure URL that connects your AI assistant to viaSocket's network of integrations",
                },
                {
                    title: 'Choose Your Actions',
                    description:
                        'Easily select and define the actions your AI can perform, like sending emails or sending Slack messages, giving you full control',
                },
                {
                    title: 'Connect Your AI Assistant',
                    description:
                        'Connect your AI Assistant easily with the MCP endpoint for instant, secure task execution',
                },
            ];

            const tableData = [
                { aspects: 'Integration Speed', api: 'Takes weeks', mcp: 'Done in minutes' },
                {
                    aspects: 'Learning Curve',
                    api: 'Lots to read',
                    mcp: 'Just type what you need',
                },
                {
                    aspects: 'Maintenance',
                    api: 'Constant updates',
                    mcp: 'We handle it',
                },
                {
                    aspects: 'Security',
                    api: 'Your headache',
                    mcp: 'Built-in & managed',
                },
                {
                    aspects: 'Scalability',
                    api: 'Manual scaling',
                    mcp: 'Auto-scales',
                },
                {
                    aspects: 'Cost',
                    api: 'Dev + hosting costs',
                    mcp: 'Pay-as-you-use',
                },
            ];

            const featuresData = [
                {
                    heading: 'Broad connectivity',
                    content:
                        'Connect your AI to thousands of apps through a single protocol without building individual app integrations',
                    iconName: 'network',
                },
                {
                    heading: 'Massive Scalability',
                    content:
                        'Run tens of thousands of actions reliably and in real-time without delays or complications',
                    iconName: 'scale',
                },
                {
                    heading: 'Built-in Auth and Security',
                    content:
                        'viaSocket MCP endpoints come with robust authentication and encryption, so your data stays safe and secure from misuse',
                    iconName: 'shield',
                },
                {
                    heading: 'Interface flexibility',
                    content:
                        'Access viaSocket MCP in the platform you prefer to build in, like Cursor, ChatGPT, or Claude Desktop',
                    iconName: 'layers',
                },

                {
                    heading: 'Customizable AI Actions',
                    content:
                        'Customize your AI actions to set limits on what it can do, ensuring it stays within your preferred scope and meets your needs',
                    iconName: 'tools',
                },
                {
                    heading: 'Skip the Setup',
                    content:
                        'Forget building MCP servers from scratch—just use the viaSocket MCP server and let your AI connect to a world of apps in no time',
                    iconName: 'plug',
                },
            ];

            const keyPointData = [
                'No coding required',
                'Enterprise-grade security',
                'Pay only for what you use',
                'Compatible with all major AI platforms',
            ];

            return {
                pageInfo: pageInfo || {},
                mcpInfo: mcpInfo || {},
                footerData: footerData || {},
                apps: apps || [],
                blogsData: blogData || [],
                categoryData: categoryData || {},
                categories: categories || [],
                mcpSteps: mcpSteps || [],
                faqData: faqData || [],
                tableData: tableData || [],
                featuresData: featuresData || [],
                keyPointData: keyPointData || [],
                metaData: metaData || {},
                appCount: appCount || 0,
                navbarData: navbarData || {},
                noData: false,
            };
        }
    } catch (error) {
        console.error('Error fetching MCP page data:', error);
        return {
            noData: true,
            footerData: {},
            navbarData: {},
        };
    }
}

export async function getIntegrationsPageData(slug = [], searchParams = {}) {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://viasocket.com';
        const pageUrl = `${baseUrl}/integrations${slug.length > 0 ? '/' + slug.join('/') : ''}`;

        // Create page info from slug
        const pageInfo = { pathArray: ['integrations', ...slug], qurey: searchParams };
        const integrationsInfo = getIntegrationsInfo(pageInfo?.pathArray);

        // Fetch basic data that all pages need
        const [footerData, appCount, getDoFollowUrlStatusArray, navbarData] = await Promise.all([
            getFooterData(FOOTER_FIELDS, '', pageUrl),
            getAppCount(pageUrl),
            getDoFollowStatus(DOFOLLOWLINK_FIELDS, '', pageUrl),
            getNavbarData(NAVBAR_FIELDS, '', pageUrl),
        ]);

        if (integrationsInfo?.appone && integrationsInfo?.apptwo) {
            // App-to-app integration page
            const [metadata, faqData, combosData] = await Promise.all([
                getMetaData('/integrations/AppOne/AppTwo', pageUrl),
                getFaqData('[singleApp]', pageUrl),
                getCombos(integrationsInfo, pageUrl),
            ]);

            const appOneDetails = getAppDetails(combosData, integrationsInfo?.appone);
            const appTwoDetails = getAppDetails(combosData, integrationsInfo?.apptwo);

            if (appOneDetails && appTwoDetails) {
                const [blogData, videoData, templateData] = await Promise.all([
                    getBlogData({ tag1: appOneDetails?.appslugname, tag2: appTwoDetails?.appslugname }, pageUrl),
                    getVideoData({ tag1: appOneDetails?.appslugname, tag2: appTwoDetails?.appslugname }, pageUrl),
                    getTemplates(pageUrl),
                ]);

                const validTemplates = templateData.filter(
                    (t) => t?.flowJson?.order?.root && t?.flowJson?.order?.root?.length > 0
                );

                return {
                    pageInfo: pageInfo || {},
                    footerData: footerData || [],
                    apps: [],
                    metadata: metadata || {},
                    faqData: faqData || [],
                    integrationsInfo: integrationsInfo || {},
                    combosData: combosData || {},
                    appOneDetails: appOneDetails || {},
                    appTwoDetails: appTwoDetails || {},
                    categoryData: {},
                    blogData: blogData || [],
                    videoData: videoData || [],
                    appCount: appCount || 0,
                    getDoFollowUrlStatusArray: getDoFollowUrlStatusArray || [],
                    navbarData: navbarData || {},
                    templateToShow: validTemplates || [],
                    noData: false,
                };
            } else {
                return {
                    noData: true,
                    footerData: footerData || {},
                    navbarData: navbarData || {},
                };
            }
        } else if (integrationsInfo?.appone) {
            // Single app integration page
            const [metadata, faqData, categoryData, combosData, useCaseData] = await Promise.all([
                getMetaData('/integrations/AppOne', pageUrl),
                getFaqData('[doubleApp]', pageUrl),
                getCategoryData(INTECATEGORY_FIELDS, `filter=slug='${integrationsInfo?.category || 'all'}'`, pageUrl),
                getCombos(integrationsInfo, pageUrl),
                getUsecasesData(USECASES_FIELDS, `filter=slug='${integrationsInfo?.appone}'`, pageUrl),
            ]);

            const apps = await getApps({ page: integrationsInfo?.page, categoryData }, pageUrl);
            const appOneDetails = getAppDetails(combosData, integrationsInfo?.appone);

            if (appOneDetails) {
                const [blogData, videoData, templateData] = await Promise.all([
                    getBlogData({ tag1: appOneDetails?.appslugname }, pageUrl),
                    getVideoData({ tag1: appOneDetails?.appslugname }, pageUrl),
                    getTemplates(pageUrl),
                ]);

                const validTemplates = templateData.filter(
                    (t) => t?.flowJson?.order?.root && t?.flowJson?.order?.root?.length > 0
                );

                return {
                    pageInfo: pageInfo || {},
                    footerData: footerData || [],
                    apps: apps || [],
                    metadata: metadata || {},
                    faqData: faqData || [],
                    integrationsInfo: integrationsInfo || {},
                    combosData: combosData || {},
                    appOneDetails: appOneDetails || {},
                    appTwoDetails: {},
                    categoryData: (categoryData?.length > 0 && categoryData[0]) || {},
                    blogData: blogData || [],
                    useCaseData: useCaseData || [],
                    videoData: videoData || [],
                    appCount: appCount || 0,
                    getDoFollowUrlStatusArray: getDoFollowUrlStatusArray || [],
                    navbarData: navbarData || {},
                    templateToShow: validTemplates || [],
                    noData: false,
                };
            } else {
                return {
                    noData: true,
                    footerData: footerData || {},
                    navbarData: navbarData || {},
                };
            }
        } else {
            // Integrations index page
            const [metadata, faqData, categoryData, categories, blogData] = await Promise.all([
                getMetaData('/integrations', pageUrl),
                getFaqData('/integrations', pageUrl),
                getCategoryData(INTECATEGORY_FIELDS, `filter=slug='${integrationsInfo?.category || 'all'}'`, pageUrl),
                getCategoryData(INTECATEGORYlIST_FILED, '', pageUrl),
                getBlogData({ tag1: 'integration' }, pageUrl),
            ]);

            const apps = await getApps({ page: integrationsInfo?.page, categoryData }, pageUrl);

            return {
                pageInfo: pageInfo || {},
                footerData: footerData || {},
                apps: apps || [],
                metadata: metadata || {},
                faqData: faqData || [],
                integrationsInfo: integrationsInfo || {},
                combosData: {},
                appOneDetails: {},
                appTwoDetails: {},
                categoryData: (categoryData?.length > 0 && categoryData[0]) || {},
                categories: categories || [],
                blogData: blogData || [],
                appCount: appCount || 0,
                getDoFollowUrlStatusArray: getDoFollowUrlStatusArray || [],
                navbarData: navbarData || {},
                templateToShow: [],
                noData: false,
            };
        }
    } catch (error) {
        console.error('Error fetching Integrations page data:', error);
        return {
            noData: true,
            footerData: {},
            navbarData: {},
        };
    }
}

export async function getFindAppsPageData(slug = []) {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://viasocket.com';
        const pageUrl = `${baseUrl}/find-apps${slug.length > 0 ? '/' + slug.join('/') : ''}`;

        if (!slug || slug.length !== 1) {
            return {
                noData: true,
            };
        }

        const step = slug?.length;
        const alphabet = slug[0] || '';

        if (step === 1) {
            const data = await fetchPluginData(slug, pageUrl);

            return {
                apps: data?.data?.rows || [],
                appDetails: null,
                alphabet: alphabet,
                step: step,
                alphabet2: null,
            };
        }

        return {
            noData: true,
        };
    } catch (error) {
        console.error('Error fetching Find Apps page data:', error);
        return {
            noData: true,
        };
    }
}

export async function getFeaturesPageData(feature = []) {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://viasocket.com';
        const pageUrl = `${baseUrl}/features${feature.length > 0 ? '/' + feature.join('/') : ''}`;

        // Create page info from feature slug - match original GetPageInfo structure
        const pageInfo = {
            pathArray: ['features', ...feature],
            url: `/features${feature.length > 0 ? '/' + feature.join('/') : ''}`,
        };

        const [footerData, navbarData, metaData] = await Promise.all([
            getFooterData(FOOTER_FIELDS, '', pageUrl),
            getNavbarData(NAVBAR_FIELDS, '', pageUrl),
            getMetaData(pageInfo?.url, pageUrl),
        ]);

        let featureSlug = null;
        let features = [];
        let featureData = {};

        if (feature?.length > 0) {
            featureSlug = feature[0];
        }

        if (!featureSlug) {
            // Features index page - show all features
            features = await getAllFeatures(ALLFEATURES_FIELDS, '', pageUrl);
        } else {
            // Single feature page
            const featureDataArray = await getFeatureData(ALLFEATURES_FIELDS, `filter=slug='${featureSlug}'`, pageUrl);
            featureData = (featureDataArray?.length > 0 && featureDataArray[0]) || {};
        }

        const blogTags = 'feature';
        const blogData = await getBlogData({ tag1: blogTags }, pageUrl);

        return {
            features: features || [],
            featureData: featureData || {},
            footerData: footerData || [],
            metaData: metaData || {},
            pageInfo: pageInfo || {},
            blogData: blogData || [],
            navbarData: navbarData || [],
        };
    } catch (error) {
        console.error('Error fetching Features page data:', error);
        return {
            noData: true,
        };
    }
}

export async function getDepartmentPageData(slug) {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://viasocket.com';
        const pageUrl = `${baseUrl}/departments/${slug}`;

        const [metaData, navbarData, footerData, departmentData] = await Promise.all([
            getMetaData(`/department/${slug}`, pageUrl),
            getNavbarData(NAVBAR_FIELDS, '', pageUrl),
            getFooterData(FOOTER_FIELDS, '', pageUrl),
            getDepartmentData(DEPARTMENTDATA_FIELDS, '', pageUrl),
        ]);

        const blogTags = 'department';
        const blogsData = await getBlogData({ tag1: blogTags }, pageUrl);

        const departmentList = Array.isArray(departmentData) ? departmentData : [];
        const department = departmentList.find((item) => item?.slug === slug) || null;

        const templateData = await getTemplates(pageUrl);
        const validTemplates = templateData.filter(
            (t) => t?.flowJson?.order?.root && t?.flowJson?.order?.root?.length > 0
        );
        const templateToShow = validTemplates;

        if (!department) {
            return {
                noData: true,
            };
        }

        return {
            metaData: metaData || {},
            navbarData: navbarData || {},
            footerData: footerData || {},
            department,
            blogsData: blogsData || [],
            templateToShow: templateToShow || [],
        };
    } catch (error) {
        console.error('Error fetching Department page data:', error);
        return {
            noData: true,
        };
    }
}

