'use client';

import { useState } from 'react';
import s from './addToProduct.module.scss';
import EventRequestLink from './EventRequestLink';

const PAGE_SIZE = 9;

/** The app's actions or triggers as cards, nine at first with a "Show all" button. */
export default function EventsList({ kind, items, appName, iconUrl, appInfo }) {
    const [all, setAll] = useState(false);
    const shown = items.length ? (all ? items : items.slice(0, PAGE_SIZE)) : [];

    return (
        <div className={s['at-group']}>
            {items.length === 0 ? (
                <p className={s.lead}>No {kind}s are available for {appName} yet.</p>
            ) : (
                <ul className={s.ops}>
                    {shown.map((o, i) => (
                        <li key={`${o.name}-${i}`}>
                            {iconUrl && <img className={s.appicon} src={iconUrl} alt="" width={28} height={28} style={{ width: 28, height: 28 }} loading="lazy" />}
                            <b>{o.name}</b>
                            {o.description && <span>{o.description}</span>}
                        </li>
                    ))}
                </ul>
            )}
            {items.length > PAGE_SIZE && (
                <div className={s['ops-foot']}>
                    <button type="button" className={s['btn-o']} onClick={() => setAll(!all)}>
                        {all ? 'Show fewer' : `Show all ${kind}s`}
                    </button>
                </div>
            )}
            {appInfo && (
                <div className={s['ops-foot']}>
                    <EventRequestLink appInfo={appInfo} kind={kind} />
                </div>
            )}
        </div>
    );
}
