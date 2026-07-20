import { redirect } from 'next/navigation';

export const runtime = 'edge';

export default function RedirectToFlow() {
    redirect('https://flow.viasocket.com/org?import=true');
}
