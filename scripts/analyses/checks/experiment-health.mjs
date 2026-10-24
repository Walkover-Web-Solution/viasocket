// Experiment health from the store's counters (via the ingest endpoint): sample-ratio mismatch on
// assignments, exposures without assignment, events claiming the wrong variant. Customer traffic
// only; synthetic experiments are reported separately and never raise high findings.
import { srmCheck } from '../../../src/lib/ops/shared/stats.mjs';

export default async function experimentHealth({ ingestGet }) {
    if (!ingestGet) return { status: 'not-connected', results: {}, findings: [], notes: 'Needs OPS_INGEST_URL and OPS_INGEST_TOKEN to read experiment counters.' };
    const data = await ingestGet('?data=experiments');
    const running = (data.experiments || []).filter((e) => e.status === 'running');
    if (!running.length) return { status: 'insufficient-data', results: { experiments: data.experiments?.length || 0 }, findings: [], notes: 'No running experiment.' };
    const findings = [];
    const report = [];
    for (const e of running) {
        const bucketName = e.synthetic ? 'synthetic' : 'customer';
        const b = e.counts?.buckets?.[bucketName] || {};
        const keys = e.variants.map((v) => v.key);
        const assigned = keys.map((k) => b[k]?.assignment?.visitors || 0);
        const exposed = keys.map((k) => b[k]?.exposure?.visitors || 0);
        const srm = srmCheck(assigned, e.variants.map((v) => v.weight));
        const unassignedBucket = e.synthetic ? 'synthetic_unassigned' : 'unassigned';
        const unassigned = Object.values(e.counts?.buckets?.[unassignedBucket] || {}).reduce((s, v) => s + Object.values(v).reduce((a, x) => a + (x.events || 0), 0), 0);
        const leaks = keys.filter((k, i) => exposed[i] > assigned[i]);
        const sev = (s) => (e.synthetic ? 'info' : s);
        report.push({ id: e.id, phase: e.phase, bucket: bucketName, assigned: Object.fromEntries(keys.map((k, i) => [k, assigned[i]])), exposed: Object.fromEntries(keys.map((k, i) => [k, exposed[i]])), srm, unassigned });
        if (srm.n && srm.mismatch) findings.push({ severity: sev('high'), title: `${e.id}: sample ratio mismatch (p=${srm.p.toExponential(2)})`, evidence: { phase: e.phase, assigned, weights: e.variants.map((v) => v.weight) } });
        if (unassigned) findings.push({ severity: sev('high'), title: `${e.id}: ${unassigned} events claimed a variant the visitor was not assigned`, evidence: { phase: e.phase } });
        if (leaks.length) findings.push({ severity: sev('medium'), title: `${e.id}: exposures without assignment in ${leaks.join(', ')}`, evidence: { assigned, exposed } });
        if (!srm.n) findings.push({ severity: 'info', title: `${e.id}: no assignments recorded yet`, evidence: { phase: e.phase } });
    }
    return { status: 'succeeded', results: { experiments: report }, findings };
}
