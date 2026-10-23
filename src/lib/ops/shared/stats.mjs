// Frequentist evaluation for A/B/C tests. Deliberately plain and labelled in the UI:
// Wilson 95% intervals per variant, a two-sided two-proportion z-test of each challenger
// against the baseline with a Bonferroni-adjusted alpha, and a chi-square sample-ratio
// check on assignments. No "probability to win".

export const ALPHA = 0.05;
export const SRM_ALPHA = 0.001;

export function wilson(successes, n, z = 1.959964) {
    if (!n) return { rate: null, low: null, high: null };
    const p = successes / n;
    const z2 = z * z;
    const denom = 1 + z2 / n;
    const centre = (p + z2 / (2 * n)) / denom;
    const half = (z * Math.sqrt((p * (1 - p)) / n + z2 / (4 * n * n))) / denom;
    return { rate: p, low: Math.max(0, centre - half), high: Math.min(1, centre + half) };
}

// Abramowitz-Stegun 7.1.26 approximation of erf; |error| < 1.5e-7.
function erf(x) {
    const s = Math.sign(x);
    const a = Math.abs(x);
    const t = 1 / (1 + 0.3275911 * a);
    const y = 1 - ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-a * a);
    return s * y;
}

export const normalCdf = (z) => 0.5 * (1 + erf(z / Math.SQRT2));

/** Two-sided p-value for H0: p1 == p2 (pooled z-test). */
export function twoProportionTest(x1, n1, x2, n2) {
    if (!n1 || !n2) return { z: null, p: null, diff: null };
    const p1 = x1 / n1;
    const p2 = x2 / n2;
    const pool = (x1 + x2) / (n1 + n2);
    const se = Math.sqrt(pool * (1 - pool) * (1 / n1 + 1 / n2));
    if (!se) return { z: 0, p: 1, diff: p2 - p1 };
    const z = (p2 - p1) / se;
    return { z, p: 2 * (1 - normalCdf(Math.abs(z))), diff: p2 - p1 };
}

// Regularised upper incomplete gamma Q(s, x) for the chi-square survival function.
function gammaln(z) {
    const g = [76.18009172947146, -86.50532032941677, 24.01409824083091, -1.231739572450155, 0.1208650973866179e-2, -0.5395239384953e-5];
    let x = z;
    let y = z;
    let tmp = x + 5.5;
    tmp -= (x + 0.5) * Math.log(tmp);
    let ser = 1.000000000190015;
    for (let j = 0; j < 6; j += 1) ser += g[j] / ++y;
    return -tmp + Math.log((2.5066282746310005 * ser) / x);
}

function gammaQ(s, x) {
    if (x <= 0) return 1;
    if (x < s + 1) {
        let sum = 1 / s;
        let del = sum;
        let ap = s;
        for (let n = 0; n < 200; n += 1) {
            ap += 1;
            del *= x / ap;
            sum += del;
            if (Math.abs(del) < Math.abs(sum) * 1e-12) break;
        }
        return 1 - sum * Math.exp(-x + s * Math.log(x) - gammaln(s));
    }
    let b = x + 1 - s;
    let c = 1 / 1e-300;
    let d = 1 / b;
    let h = d;
    for (let i = 1; i < 200; i += 1) {
        const an = -i * (i - s);
        b += 2;
        d = an * d + b;
        if (Math.abs(d) < 1e-300) d = 1e-300;
        c = b + an / c;
        if (Math.abs(c) < 1e-300) c = 1e-300;
        d = 1 / d;
        const del = d * c;
        h *= del;
        if (Math.abs(del - 1) < 1e-12) break;
    }
    return Math.exp(-x + s * Math.log(x) - gammaln(s)) * h;
}

export const chiSquareSurvival = (stat, df) => gammaQ(df / 2, stat / 2);

/** Sample-ratio mismatch: observed counts vs expected weights. */
export function srmCheck(observed, weights) {
    const n = observed.reduce((s, x) => s + x, 0);
    const wsum = weights.reduce((s, w) => s + w, 0);
    if (!n || !wsum || observed.length < 2) return { stat: null, p: null, mismatch: false, n };
    let stat = 0;
    observed.forEach((o, i) => {
        const e = (n * weights[i]) / wsum;
        stat += e ? ((o - e) * (o - e)) / e : 0;
    });
    const p = chiSquareSurvival(stat, observed.length - 1);
    return { stat, p, mismatch: p < SRM_ALPHA, n };
}

/**
 * Full evaluation of one experiment phase.
 * counts: { [variantKey]: { assigned, exposed, converted } } (unique visitors)
 * opts: { baseline, weights: {key: w}, minSamplePerVariant, plannedDays, daysRunning }
 */
export function evaluate(counts, opts) {
    const keys = Object.keys(opts.weights || {}).filter((k) => counts[k] || opts.weights[k] > 0);
    const baseline = opts.baseline || 'A';
    const challengers = keys.filter((k) => k !== baseline);
    const alpha = challengers.length ? ALPHA / challengers.length : ALPHA;
    const rows = keys.map((k) => {
        const c = counts[k] || { assigned: 0, exposed: 0, converted: 0 };
        return { key: k, ...c, ci: wilson(c.converted, c.exposed) };
    });
    const srm = srmCheck(
        keys.map((k) => (counts[k] || {}).assigned || 0),
        keys.map((k) => Number(opts.weights[k]) || 0)
    );
    const base = counts[baseline] || { exposed: 0, converted: 0 };
    const comparisons = challengers.map((k) => {
        const c = counts[k] || { exposed: 0, converted: 0 };
        const t = twoProportionTest(base.converted, base.exposed, c.converted, c.exposed);
        return { key: k, ...t, alpha, significant: t.p !== null && t.p < alpha };
    });
    const minSample = Number(opts.minSamplePerVariant) || 0;
    const underSample = rows.filter((r) => r.exposed < minSample).map((r) => r.key);
    const tooEarly = (Number(opts.daysRunning) || 0) < (Number(opts.plannedDays) || 0);

    let verdict = 'insufficient evidence';
    let reason = '';
    if (srm.mismatch) {
        verdict = 'invalid: sample ratio mismatch';
        reason = `Assignments do not match the planned weights (chi-square p=${srm.p.toExponential(2)} < ${SRM_ALPHA}). Fix assignment before reading results.`;
    } else if (!minSample || !opts.plannedDays) {
        reason = 'No minimum sample or planned duration was set, so no verdict is given.';
    } else if (underSample.length) {
        reason = `Below the minimum sample of ${minSample} exposed visitors: ${underSample.join(', ')}.`;
    } else if (tooEarly) {
        reason = `Planned duration is ${opts.plannedDays} days; ${Math.floor(opts.daysRunning || 0)} have passed.`;
    } else {
        const winners = comparisons.filter((c) => c.significant);
        if (!winners.length) {
            verdict = 'inconclusive';
            reason = `No challenger differs from ${baseline} at the Bonferroni-adjusted alpha ${alpha.toFixed(4)}.`;
        } else {
            verdict = winners
                .map((w) => `${w.key} ${w.diff > 0 ? 'above' : 'below'} ${baseline} on the primary outcome`)
                .join('; ');
            reason = `Significant at alpha ${alpha.toFixed(4)} (two-sided). Check guardrails before deciding.`;
        }
    }
    return {
        method: `Wilson 95% intervals; two-sided two-proportion z-test vs ${baseline}${challengers.length > 1 ? `, Bonferroni-adjusted alpha ${alpha.toFixed(4)} for ${challengers.length} comparisons` : ` at alpha ${ALPHA}`}; chi-square SRM check (p < ${SRM_ALPHA}).`,
        rows,
        comparisons,
        srm,
        verdict,
        reason,
    };
}
