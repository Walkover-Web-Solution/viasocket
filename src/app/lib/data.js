import {
    getFooterData,
    getIndexTemplateData,
    getReviewSectionData,
    getNavbarData,
    getProgramsData,
    getAgencies,
    getExpertBlogs,
    getPageData,
    getEmbedData
} from '@/utils/getData';
import {
    FOOTER_FIELDS,
    INDEXTEMPLATE_FIELDS,
    REVIEWSECTION_FIELDS,
    NAVBAR_FIELDS,
    PROGRAMS_FIELDS,
    AGENCIES_FIELDS,
    EXPERTBLOGS_FIELDS,
    PAGEDATA_FIELDS,
    EMBED_FIELDS
} from '@/const/fields';
import { getMetaData } from '@/utils/getMetaData';
import { getFaqData } from '@/utils/getFaqData';
import { getBlogData } from '@/utils/getBlogData';
import { getAppCount, getTemplates, getApps } from '@/utils/axiosCalls';
import { validateTemplateData } from '@/utils/validateTemplateData';
import { fetchPluginData } from '@/utils/axiosCalls';

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

