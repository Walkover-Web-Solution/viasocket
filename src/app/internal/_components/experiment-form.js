import { OUTCOMES, SURFACES } from '@/lib/ops/experiments';
import { Csrf } from './ui';

const Field = ({ name, label, hint, value, area, type = 'text', required }) => (
    <label>
        {label}
        {hint ? <span className="hint">{hint}</span> : null}
        {area ? <textarea name={name} rows={3} defaultValue={value ?? ''} /> : <input type={type} name={name} defaultValue={value ?? ''} required={required} />}
    </label>
);

export function ExperimentForm({ user, exp, action, back }) {
    const v = (k) => exp?.[k];
    const variant = (key) => exp?.variants?.find((x) => x.key === key) || {};
    return (
        <form className="ops-form" method="post" action={action}>
            <Csrf user={user} back={back} />
            {exp?.id ? <input type="hidden" name="id" value={exp.id} /> : null}
            <fieldset>
                <legend>Basics</legend>
                <div className="ops-2col">
                    {exp?.id ? null : <Field name="id" label="Id" hint="lowercase-with-dashes; used in cookies (vs_x_<id>)" required />}
                    <Field name="title" label="Title" value={v('title')} />
                    <label>
                        Surface
                        <select name="surface" defaultValue={v('surface') || 'home'} disabled={Boolean(exp?.id)}>
                            {Object.entries(SURFACES).map(([k, s]) => (
                                <option key={k} value={k}>
                                    {s.label}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
                <Field name="hypothesis" area label="Hypothesis" hint="Because <evidence>, changing <what> for <audience> will move <primary outcome> by <direction/size>." value={v('hypothesis')} />
                <div className="ops-2col">
                    <Field name="audience" label="Audience" value={v('audience')} hint="Who is eligible (bots, internal and synthetic traffic are always excluded)" />
                    <Field name="assignmentUnit" label="Assignment unit" value={v('assignmentUnit') || 'Anonymous visitor (vs_vid first-party cookie)'} />
                </div>
                <Field name="exposureDefinition" area label="Exposure definition" hint="When a visitor counts as exposed, e.g. /exp.js reported the variant page rendered" value={v('exposureDefinition')} />
            </fieldset>
            <fieldset>
                <legend>Variants (max 3: baseline A + up to 2 challengers; weights add to 100)</legend>
                {['A', 'B', 'C'].map((k) => (
                    <div key={k} className="ops-2col">
                        <Field name={`variant_${k}_label`} label={`${k} label`} value={variant(k).label} hint={k === 'A' ? 'Baseline' : 'Leave empty for no variant'} />
                        <Field name={`variant_${k}_target`} label={`${k} target path`} value={variant(k).target ?? (k === 'A' && !exp ? '/new-home/index.html' : '')} hint="Rewrite destination for this variant" />
                        <Field name={`variant_${k}_weight`} type="number" label={`${k} weight`} value={variant(k).weight ?? ''} />
                    </div>
                ))}
            </fieldset>
            <fieldset>
                <legend>Decision</legend>
                <div className="ops-2col">
                    <label>
                        Primary outcome
                        <span className="hint">signup completion is not observable here (docs/CONTRACTS.md)</span>
                        <select name="primaryOutcome" defaultValue={v('primaryOutcome') || ''}>
                            <option value="">Choose…</option>
                            {OUTCOMES.map((o) => (
                                <option key={o}>{o}</option>
                            ))}
                        </select>
                    </label>
                    <Field name="minSamplePerVariant" type="number" label="Minimum exposed visitors per variant" value={v('minSamplePerVariant')} />
                    <Field name="plannedDays" type="number" label="Planned duration (days)" value={v('plannedDays')} />
                </div>
                <Field name="guardrails" area label="Guardrails" hint="What must not get worse, and the threshold that stops the test" value={v('guardrails')} />
                <Field name="decisionMethod" area label="Decision method" value={v('decisionMethod') || 'Two-sided two-proportion z-test per challenger vs A on the primary outcome, Bonferroni-adjusted alpha 0.05/(number of challengers); no verdict before the minimum sample and planned duration; SRM chi-square p < 0.001 invalidates the read.'} />
                <Field name="reviewCondition" area label="Review / end condition" value={v('reviewCondition')} />
                <div className="ops-2col">
                    <Field name="owner" label="Owner" value={v('owner')} />
                    <Field name="authority" label="Decision authority" hint="Who may launch, promote or stop" value={v('authority')} />
                </div>
                <Field name="rollbackPlan" area label="Rollback plan" value={v('rollbackPlan') || 'Rollback on the Experiments page stops serving challengers within the 30 s cache; everyone gets A.'} />
            </fieldset>
            <div className="ops-row">
                <button className="btn-o" type="submit">
                    {exp ? 'Save draft' : 'Create draft'}
                </button>
            </div>
        </form>
    );
}
