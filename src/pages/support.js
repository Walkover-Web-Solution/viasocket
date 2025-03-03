import Link from 'next/link';
import { useState } from 'react';
import { MdCall, MdMail, MdOutlineWhatsapp } from 'react-icons/md';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import Image from 'next/image';
import Navbar from '@/components/navbar/navbar';
import Footer from '@/components/footer/footer';
import { getFooterData, getMetaData, getNavData } from '@/utils/getData';
import { FOOTER_FIELDS, METADATA_FIELDS, NAVIGATION_FIELDS } from '@/const/fields';

export async function getStaticProps() {
    const navData = await getNavData(NAVIGATION_FIELDS);
    const footerData = await getFooterData(FOOTER_FIELDS);
    const metaData = await getMetaData(METADATA_FIELDS, `filter=name='/support'`);
    return {
        props: {
            navData: navData || [],
            footerData: footerData || [],
            metaData: (metaData?.length > 0 && metaData[0]) || {},
        },
    };
}
export const runtime = 'experimental-edge';


export default function Support({ navData, footerData, metaData }) {
    const [issubmit, setIsSubmit] = useState(false);
    const [isSend, setIsSend] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [errors, setErrors] = useState({
        name: false,
        email: false,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: false,
        }));
    };

    const handleSubmit = async () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const newErrors = {
            name: !formData.name,
            email: !formData.email || !emailRegex.test(formData.email),
        };

        if (newErrors.name || newErrors.email) {
            setErrors(newErrors);
            return;
        }

        setIsSend(true);

        try {
            const response = await fetch(`https://flow.sokt.io/func/scrir501xRzP`, {
                method: 'POST',
                headers: {},
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                setIsSubmit(true);
                setIsSend(false);
            } else {
                console.log('error');
                setIsSend(false);
            }
        } catch (error) {
            setIsSend(false);
            console.log(error, 'error');
        }
    };
    return (
        <>
            <MetaHeadComp metaData={metaData} page={'/support'} />
            <div className="container ">
                <Navbar navData={navData} utm={'/support'} />
            </div>

            <div className="container flex flex-col justify-center items-center md:gap-16 gap-4 my-12 md:my-24">
                <div className="flex flex-col gap-3 md:text-center text-start md:items-center md:w-full sm:w-1/2 w-full min-w-[300px}">
                    <h1 className="md:text-5xl text-4xl font-semibold">viaSocket Support</h1>
                    <p className="md:text-xl text-lg font-medium md:w-2/3">
                        We are here to assist you with any questions, concerns, or feedback you may have. Whether you're
                        seeking support, have a business inquiry, or simply want to connect with us, we are eager to
                        hear from you.
                    </p>
                </div>
                <div className=" flex flex-col justify-center items-center gap-16 mx-auto  md:flex-row  my-4 ">
                    <div className="flex flex-col gap-10 md:w-full sm:w-1/2 w-full min-w-[300px}  ">
                        <div className="flex flex-col gap-2">
                            <h2 className="md:text-3xl text-2xl font-semibold">Get In Touch</h2>
                            <p className="fext-lg font-medium md:w-2/3">
                                Our team is available 24/7 to assist you. Get in touch via email, phone, or live chat
                                and experience seamless support and integration!
                            </p>
                        </div>
                        <div className="flex flex-col gap-6 w-full">
                            <div className="flex align-center gap-3">
                                <div className="h-14 w-14 flex items-center justify-center rounded-full bg-[#EDE8DE]">
                                    <MdCall color="primary" fontSize={22} />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <h3 className="font-bold text-lg">Phone Number</h3>
                                    <Link
                                        href={'tel:+13154442439'}
                                        className="hover:underline cursor-pointer hover:text-gray-900 transition-all w-fit"
                                    >
                                        +13154442439
                                    </Link>
                                </div>
                            </div>
                            <div className="flex align-center gap-3">
                                <div className="h-14 w-14 flex items-center justify-center rounded-full bg-[#EDE8DE]">
                                    <MdOutlineWhatsapp color="primary" fontSize={22} />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <h3 className="font-bold text-lg">WhatsApp Number</h3>
                                    <Link
                                        href={'https://wa.me/+13154442439'}
                                        className="hover:underline cursor-pointer hover:text-gray-900 transition-all w-fit"
                                    >
                                        +13154442439
                                    </Link>
                                </div>
                            </div>
                            <div className="flex align-center gap-3">
                                <div className="h-14 w-14 flex items-center justify-center rounded-full bg-[#EDE8DE]">
                                    <MdMail color="primary" fontSize={22} />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <h3 className="font-bold text-lg">For setting up workflows </h3>
                                    <Link
                                        href={'mailto:support@viasocket.com'}
                                        className="hover:underline cursor-pointer hover:text-gray-900 transition-all w-fit"
                                    >
                                        support@viasocket.com
                                    </Link>
                                </div>
                            </div>
                            <div className="flex align-center gap-3">
                                <div className="h-14 w-14 flex items-center justify-center rounded-full bg-[#EDE8DE]">
                                    <MdMail color="primary" fontSize={22} />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <h3 className="font-bold text-lg">For queries/request related to plugins</h3>
                                    <Link
                                        href={'mailto:plugs@viasocket.com'}
                                        className="hover:underline cursor-pointer hover:text-gray-900 transition-all w-fit"
                                    >
                                        plugs@viasocket.com
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap w-full gap-3">
                            <button className="btn btn-accent" onClick={() => window.chatWidget.open()}>
                                Live Chat
                            </button>
                            <Link href="https://cal.id/team/viasocket/superheros" target="_blank">
                                <button className="btn btn-primary btn-outline">Book a Meeting</button>
                            </Link>
                            <Link href="https://viasocket.com/faq" target="_blank">
                                <button className="btn btn-primary btn-outline">Help Doc</button>
                            </Link>
                            <Link href="https://viasocket.com/community" target="_blank">
                                <button className="btn btn-primary btn-outline">Community </button>
                            </Link>
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center gap-5 w-full md:w-full sm:w-1/2 md:max-w-[500px] bg-[#EDE8DE] lg:p-12 md:p-8 sm:p-12 p-4  h-[500px]">
                        {issubmit ? (
                            <div className="flex flex-col items-center gap-4 max-w-[300px]">
                                <Image
                                    className="h-[140px] w-[140px]"
                                    src={`/assets/img/check.png`}
                                    width={100}
                                    height={100}
                                    alt={'img'}
                                />
                                <p className="text-center">
                                    Stay tuned, you will receive a response within the next 24 hours.
                                </p>{' '}
                            </div>
                        ) : (
                            <div className="flex flex-col gap-4 w-full  ">
                                <h2 className="md:text-3xl text-2xl font-semibold">Send a message</h2>
                                <input
                                    required
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`input bg-white w-full outline-none focus:outline-none  ${errors.name ? 'border-red-500' : ''}`}
                                />
                                <input
                                    required
                                    type="email"
                                    name="email"
                                    placeholder="Email address"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`input bg-white w-full outline-none focus:outline-none  ${errors.email ? 'border-red-500' : ''}`}
                                />
                                <textarea
                                    style={{ resize: 'none' }}
                                    required
                                    name="message"
                                    placeholder="Message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="input bg-white w-full min-h-[170px] outline-none py-2 focus:outline-none "
                                />
                                <button className="btn btn-accent  " onClick={handleSubmit}>
                                    {isSend ? <p>Sending </p> : <p> Send us message </p>}
                                </button>
                            </div>
                        )}
                    </div>
                </div>{' '}
            </div>
            <div className="container pt-16 pb-4">
                <Footer footerData={footerData} />
            </div>
        </>
    );
}
