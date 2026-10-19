'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import s from './addToProduct.module.scss';
import IntegrationsRequestComp from '../IntegrationsBetaComp/integrationsRequestComp';

// Shown instead of "Available Actions and Triggers" for an app with neither (e.g. Deel): the same
// message and request button as the previous page's beta section (IntegrationsBetaComp), in this
// page's design. The button opens the existing request form (?requestIntegration=true&requestType=app).
export default function BetaNotice({ appInfo }) {
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

    const name = appInfo?.name;
    return (
        <section className={s.sec} id="actions-triggers">
            <div className={`${s.wrap} ${s.beta}`}>
                <h2 className={s.h2}>Integrate {name} with your favorite apps</h2>
                <p className={s['beta-lead']}>
                    The app you are looking for is in <b>beta</b>, and we are awaiting verification from the app builders before
                    making it accessible to end users.
                </p>
                <p className={s['beta-note']}>This process may take 15 to 30 days.</p>
                <p className={s['beta-lead']}>
                    If you can’t wait, we can add the beta version to your viaSocket workspace within <b>24 hours</b>.
                </p>
                <button type="button" className={s.btn} onClick={() => setOpen(true)}>
                    Request a new Action for {name}
                </button>
            </div>
            {open && <IntegrationsRequestComp appInfo={appInfo} type="app" onClose={() => setOpen(false)} />}
        </section>
    );
}
