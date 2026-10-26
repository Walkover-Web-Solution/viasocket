// Ops settings (one document, `settings/main`). Defaults apply while the store is empty or not
// connected. Agent guidance is free text shown to agents and humans; it is never parsed for
// permissions, so it cannot widen what anyone may do.

import { CORE_DOCS } from './knowledge';
import { ANALYSES } from './shared/analyses-registry.mjs';

export const DEFAULT_SETTINGS = {
    knowledgeSources: CORE_DOCS,
    agentGuidance: '',
    analyses: Object.fromEntries(ANALYSES.map((a) => [a.name, { enabled: true, paused: false }])),
    analysesPaused: false,
    thresholds: { knowledgeStaleDays: 30, analysisStaleHours: 36, researchGraceDays: 0 },
    budgets: { analysisRequests: 300, analysisMinutes: 15, researchUrls: 40 },
    notifications: { onFailedAnalysis: true, onOverdueResearch: false, onExperimentHealth: true, recipients: '' },
};

export function mergeSettings(stored) {
    const s = stored || {};
    return {
        ...DEFAULT_SETTINGS,
        ...s,
        analyses: { ...DEFAULT_SETTINGS.analyses, ...(s.analyses || {}) },
        thresholds: { ...DEFAULT_SETTINGS.thresholds, ...(s.thresholds || {}) },
        budgets: { ...DEFAULT_SETTINGS.budgets, ...(s.budgets || {}) },
        notifications: { ...DEFAULT_SETTINGS.notifications, ...(s.notifications || {}) },
    };
}

export async function getSettings(store) {
    if (!store.connected) return { settings: mergeSettings(null), version: 0, connected: false };
    try {
        const d = await store.get('settings', 'main');
        return { settings: mergeSettings(d.found ? d.data : null), version: d.version, connected: true };
    } catch (err) {
        return { settings: mergeSettings(null), version: 0, connected: false, error: err.message };
    }
}
