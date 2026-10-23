import { guard, done, str } from '@/lib/ops/http';
import { getStore, casUpdate } from '@/lib/ops/store';
import { audit } from '@/lib/ops/audit';
import { DEFAULT_SETTINGS, mergeSettings } from '@/lib/ops/settings';
import { isKnowledgePath } from '@/lib/ops/knowledge';

export const runtime = 'edge';

const int = (v, min, max, fallback) => {
    const n = Number(v);
    return Number.isInteger(n) && n >= min && n <= max ? n : fallback;
};

// Owner-only. Schedules are NOT settable here: they live in .github/workflows/website-analyses.yml.
export async function POST(request) {
    const g = await guard(request, 'owner', { mutation: true });
    if (g.response) return g.response;
    const { user, form } = g;
    const store = getStore();
    if (!store.connected) return done(request, form, { ok: false, message: 'Storage not connected: settings cannot be saved', back: '/internal/settings', status: 503 });
    const section = str(form.section, 40);
    const res = await casUpdate(store, 'settings', 'main', (cur) => {
        const s = mergeSettings(cur);
        if (section === 'knowledge') {
            s.knowledgeSources = str(form.knowledgeSources, 5000)
                .split(/\s+/)
                .filter((p) => isKnowledgePath(p))
                .slice(0, 60);
            if (!s.knowledgeSources.length) s.knowledgeSources = DEFAULT_SETTINGS.knowledgeSources;
        } else if (section === 'guidance') {
            s.agentGuidance = str(form.agentGuidance, 4000);
        } else if (section === 'thresholds') {
            s.thresholds = {
                knowledgeStaleDays: int(form.knowledgeStaleDays, 1, 365, s.thresholds.knowledgeStaleDays),
                analysisStaleHours: int(form.analysisStaleHours, 1, 720, s.thresholds.analysisStaleHours),
                researchGraceDays: int(form.researchGraceDays, 0, 60, s.thresholds.researchGraceDays),
            };
        } else if (section === 'budgets') {
            s.budgets = {
                analysisRequests: int(form.analysisRequests, 10, 2000, s.budgets.analysisRequests),
                analysisMinutes: int(form.analysisMinutes, 1, 60, s.budgets.analysisMinutes),
                researchUrls: int(form.researchUrls, 1, 200, s.budgets.researchUrls),
            };
        } else if (section === 'analyses') {
            for (const name of Object.keys(s.analyses)) s.analyses[name] = { ...s.analyses[name], enabled: form[`enabled_${name}`] === 'on' };
        } else if (section === 'notifications') {
            s.notifications = {
                onFailedAnalysis: form.onFailedAnalysis === 'on',
                onOverdueResearch: form.onOverdueResearch === 'on',
                onExperimentHealth: form.onExperimentHealth === 'on',
                recipients: str(form.recipients, 500),
            };
        } else {
            return undefined;
        }
        return s;
    });
    if (res.aborted) return done(request, form, { ok: false, message: 'Unknown settings section', back: '/internal/settings' });
    await audit(store, user, `settings.${section}`, 'settings/main');
    return done(request, form, { ok: res.ok, message: res.ok ? 'Settings saved' : 'Settings changed elsewhere; reload', back: '/internal/settings' });
}
