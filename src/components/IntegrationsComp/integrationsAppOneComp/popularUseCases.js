import { MoveRight } from 'lucide-react';
import { useMemo } from 'react';
import { getCookie, setCookie } from '@/utils/handleUtmSource';
import { handleRedirect } from '@/utils/handleRedirection';

const HARDCODED_USE_CASES = [
    'Start a workflow in your other tools whenever something new happens in [app_name].',
    'Update records in [app_name] automatically when data changes in the apps your team already uses.',
    'Log [app_name] activity into a spreadsheet or database so reporting stays current without manual entry.',
    'Alert the right teammate or channel when an important [app_name] event needs a response.',
    'Add AI steps that summarize, classify, or draft text from your [app_name] data mid-workflow.',
    'Run [app_name] workflows on a daily or weekly schedule to keep records and reports in sync.',
];

const POPULAR_APPS = ['Slack', 'Shopify', 'Salesforce', 'HubSpot', 'Google Sheets', 'Gmail', 'Zendesk'];

const getRandomAppTitles = (currentApp) => {
    const others = POPULAR_APPS.filter((a) => a !== currentApp);
    const shuffled = [...others].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);
    return selected.map((app, i) => (i % 2 === 0 ? `${currentApp} \u2192 ${app}` : `${app} \u2192 ${currentApp}`));
};

export default function PopularUseCases({ appName }) {
    const useCaseTitles = useMemo(() => getRandomAppTitles(appName || 'this app'), [appName]);

    return (
        <div className="flex flex-col gap-4">
            <h3 className="text-xs font-semibold tracking-widest uppercase text-gray-500">Popular Use Cases</h3>
            <div className="flex flex-col gap-3">
                {HARDCODED_USE_CASES.slice(0, 3).map((text, index) => {
                    const description = text.replace(/\[app_name\]/g, appName || 'this app');
                    return (
                        <div
                            key={index}
                            className="bg-white border border-gray-200 hover:border-accent p-4 flex items-start justify-between gap-4 cursor-pointer transition-colors"
                            onClick={(e) => {
                                const utmObject = JSON.parse(getCookie('utmData') || '{}');
                                utmObject.prompt = description;
                                setCookie('utmData', JSON.stringify(utmObject), 1);
                                handleRedirect(e, '/signup?', null, null);
                            }}
                        >
                            <div className="flex flex-col gap-1">
                                <span className="font-semibold text-sm text-[#1a1a1a]">{useCaseTitles[index]}</span>
                                <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
                            </div>
                            <MoveRight className="w-4 h-4 text-accent shrink-0 mt-1" />
                        </div>
                    );
                })}
            </div>
            <a
                href="#real-world-use-cases"
                className="text-sm font-medium text-accent flex items-center gap-1"
            >
                See all use cases <MoveRight className="w-4 h-4" />
            </a>
        </div>
    );
}
