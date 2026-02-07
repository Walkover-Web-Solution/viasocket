import FAQSection from '@/components/faqSection/faqSection';
import Footer from '@/components/footer/footer';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import NavbarServer from '../components/navbar/NavbarServer';
import { getBlackFridaySalePageData } from '../lib/black-friday-sale-data';
import BlackFridaySaleClient from '../components/black-friday-sale/BlackFridaySaleClient';

export const runtime = 'edge';

export default async function BlackFridaySalePage() {
    const { footerData, faqData, metaData, blackFridaySaleData, navbarData } = await getBlackFridaySalePageData();

    return (
        <>
            <MetaHeadComp metaData={metaData} page={'/black-friday-sale'} />
            <NavbarServer navbarData={navbarData} utm={'/black-friday-sale'} />
            <div className='global-top-space relative'>
                <BlackFridaySaleClient blackFridaySaleData={blackFridaySaleData} />
                <div className="container lg:gap-20 md:gap-16 gap-12 lg:mt-20 md:mt-16 mt-12">
                    <div className="cont">
                        {faqData && faqData.length > 0 && <FAQSection faqData={faqData} faqName={`/black-friday-sale`} />}
                        <Footer footerData={footerData} />
                    </div>
                </div>
            </div>
        </>
    )
}