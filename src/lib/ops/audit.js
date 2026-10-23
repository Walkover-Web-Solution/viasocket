// Audit trail of every ops mutation (who, when, what, outcome), append-only in the store's
// `audit` log stream. A mutation whose audit write fails still reports its own result; the
// failure is logged to the console so it is visible in the worker logs.

export async function audit(store, user, action, target, { detail, result = 'ok' } = {}) {
    if (!store?.connected) return;
    try {
        await store.append('audit', {
            at: new Date().toISOString(),
            actor: user?.email || 'system',
            role: user?.role || 'system',
            action,
            target,
            result,
            detail: detail === undefined ? undefined : JSON.parse(JSON.stringify(detail)),
        });
    } catch (err) {
        console.error('[ops audit] could not record', action, target, err.message);
    }
}
