'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import s from './addToProduct.module.scss';
import IntegrationsRequestComp from '../IntegrationsBetaComp/integrationsRequestComp';

// The hero's main call to action for an app with no actions or triggers (e.g. Deel): the previous
// page's "Request a new Action for {app}" button. It opens the existing request form
// (?requestIntegration=true&requestType=app).
export default function BetaRequestButton({ appInfo }) {
    const router = useRouter();
    const pathname = usePathname();
    const params = useSearchParams();
    const open = params?.get('requestIntegration') === 'true' && params?.get('requestType') === 'app';

    const setOpen = (on) => {
        const p = new URLSearchParams(params?.toString() || '');
        if (on) {
            p.set('requestIntegration', 'true');
            p.set('requestType', 'app');
        } else {
            p.delete('requestIntegration');
            p.delete('requestType');
        }
        const q = p.toString();
        router.replace(`${pathname}${q ? `?${q}` : ''}`, { scroll: false });
    };

    return (
        <>
            <button type="button" className={s.btn} onClick={() => setOpen(true)}>
                Request a new Action for {appInfo?.name}
            </button>
            {open && <IntegrationsRequestComp appInfo={appInfo} type="app" onClose={() => setOpen(false)} />}
        </>
    );
}
