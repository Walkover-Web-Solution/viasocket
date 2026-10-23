import { requireUser, can, flashFrom } from '@/lib/ops/page';
import { getStore } from '@/lib/ops/store';
import { Shell, StoreBanner } from '../../_components/ui';
import { ExperimentForm } from '../../_components/experiment-form';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';
export const metadata = { title: 'New experiment' };

export default async function NewExperimentPage({ searchParams }) {
    const user = await requireUser('/internal/experiments/new');
    const sp = await searchParams;
    const store = getStore();
    return (
        <Shell user={user} active="experiments" title="New experiment" intro="Creates a draft. Nothing is served until an owner launches it and every launch check passes." flash={flashFrom(sp)}>
            <StoreBanner store={store} />
            {can(user, 'editor') ? <ExperimentForm user={user} action="/api/internal/experiments/create" back="/internal/experiments/new" /> : <p>Creating experiments needs the editor role.</p>}
        </Shell>
    );
}
