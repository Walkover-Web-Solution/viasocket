'use client';

import s from './addToProduct.module.scss';
import { promptWithUseCase, USECASES_COPY as C } from './copy';
import { useCopyPrompt } from './CopyPrompt';

// /use-cases: one card per use case. Clicking a card copies the setup prompt, then the card's
// use case, as the homepage's sample prompts do.

function Apps({ apps }) {
    return (
        <span className={s['uc-apps']} aria-label={apps.map((a) => a.name).join(', ') || undefined}>
            {apps.map((a) => (
                <img key={a.name} className={s.appicon} src={a.icon} alt="" width={28} height={28} loading="lazy" />
            ))}
        </span>
    );
}

/** The whole card copies the setup prompt, then this card's use case. */
function UseCaseCard({ c }) {
    const copy = useCopyPrompt();
    return (
        <li>
            <button type="button" className={s['uc-card']} onClick={() => copy(promptWithUseCase(c.prompt))} aria-label={`Copy prompt: ${c.prompt}`}>
                <span className={s['uc-t']}>{c.title}</span>
                <span className={s['uc-q']}>
                    <span className={s['uc-ai']} />
                    <span>{c.prompt}</span>
                </span>
                {c.apps.length > 0 && <Apps apps={c.apps} />}
            </button>
        </li>
    );
}

export default function UseCaseGrid() {
    return (
        <ul className={s.uc}>
            {C.cases.map((c) => (
                <UseCaseCard key={c.title} c={c} />
            ))}
        </ul>
    );
}
