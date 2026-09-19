import Footer from './footer';
import NewFooter from './NewFooter';
import { getVariant } from '@/utils/getVariant';

export default async function FooterServer({ footerData }) {
    const variant = await getVariant();

    if (variant === 'B') {
        return <NewFooter />;
    }

    return <Footer footerData={footerData} />;
}
