import { redirect } from 'next/navigation';

export const runtime = 'edge';

export default function RedirectToFlow() {
    redirect('https://flow.viasocket.com?import=true');
}
