'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import s from './addToProduct.module.scss';
import IntegrationsRequestComp from '../IntegrationsBetaComp/integrationsRequestComp';

/** Opens the shared request form for a new trigger or action on /integrations/{app}. */
export default function EventRequestLink({ appInfo, kind }) {
    const router = useRouter();
    const pathname = usePathname();
    const params = useSearchParams();
    const open = params?.get('requestIntegration') === 'true' && params?.get('requestType') === kind;

    const setOpen = (on) => {
        const p = new URLSearchParams(params?.toString() || '');
        if (on) {
            p.set('requestIntegration', 'true');
            p.set('requestType', kind);
        } else {
            p.delete('requestIntegration');
            p.delete('requestType');
        }
        const q = p.toString();
        router.replace(`${pathname}${q ? `?${q}` : ''}`, { scroll: false });
    };

    const label = kind === 'trigger' ? 'Trigger' : 'Action';
    const name = appInfo?.name || 'this app';

    return (
        <>
            <button type="button" className={s['req-event']} onClick={() => setOpen(true)}>
                Request a new {label} for {name}
            </button>
            {open && <IntegrationsRequestComp appInfo={appInfo} type={kind} onClose={() => setOpen(false)} />}
        </>
    );
}
