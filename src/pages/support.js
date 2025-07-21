import Link from 'next/link';
import { useState } from 'react';
import { MdCall, MdMail, MdOutlineWhatsapp } from 'react-icons/md';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import Image from 'next/image';
import Navbar from '@/components/navbar/navbar';
import Footer from '@/components/footer/footer';
import { getFooterData } from '@/utils/getData';
import { FOOTER_FIELDS } from '@/const/fields';
import { getMetaData } from '@/utils/getMetaData';

export async function getServerSideProps(context) {
    const { req } = context;
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const pageUrl = `${protocol}://${req.headers.host}${req.url}`;

    const footerData = await getFooterData(FOOTER_FIELDS, '', pageUrl);
    const metaData = await getMetaData('/support', pageUrl);
    return {
        props: {
            footerData: footerData || [],
            metaData: metaData || {},
        },
    };
}
export const runtime = 'experimental-edge';

export default function Support({ footerData, metaData }) {
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
                console.error('error');
                setIsSend(false);
            }
        } catch (error) {
            setIsSend(false);
            console.error(error, 'error');
        }
    };
    return (
        <>
            <MetaHeadComp metaData={metaData} page={'/support'} />
            <Navbar footerData={footerData} utm={'/support'} />

            <div className="container flex flex-col md:gap-16 gap-4 my-12 md:my-24">
                <div className="flex flex-col text-start md:w-full w-full min-w-[300px]">
                    <h6 className="h6 mb-0">viaSocket Support</h6>
                    <h1 className="h1">
                        Always here <span className="text-accent">for you</span>, every step of the way
                    </h1>
                </div>
                <div className="support__container">
                    <div className="border custom-border bg-[#FAF9F6] flex flex-col lg:flex-row items-center justify-between">
                        <div className="w-full lg:w-3/5 bg-white p-8 border-b lg:border-b-0 lg:border-r custom-border">
                            <div className="flex flex-col gap-10">
                                <div className="flex flex-col gap-2 text-left">
                                    <h2 className="md:text-3xl text-2xl font-semibold">Reach out however you prefer</h2>
                                    <p className="text-lg font-medium">
                                        Our team is available 24/7 to assist with any questions or challenges. Reach out
                                        anytime
                                    </p>
                                </div>
                                <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 w-full text-left">
                                    <div className="flex items-center gap-3 border custom-border p-6">
                                        <div className="flex flex-col justify-center">
                                            <MdCall size={30} />
                                            <h3 className="font-semibold">Give us a call</h3>
                                            <span>Sometimes it's easier to just talk it through</span>
                                            <Link
                                                href={'tel:+1 (315) 444-2439'}
                                                className="hover:underline hover:text-accent cursor-pointer transition-all w-fit"
                                            >
                                                +1 (315) 444-2439
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 border custom-border p-6">
                                        <div className="flex flex-col justify-center">
                                            <MdOutlineWhatsapp size={30} />
                                            <h3 className="font-semibold">Text us on WhatsApp</h3>
                                            <span>Quick questions? Send us a message</span>
                                            <Link
                                                href={'https://wa.me/+1 (315) 444-2439'}
                                                className="hover:underline hover:text-accent cursor-pointer transition-all w-fit"
                                            >
                                                +1 (315) 444-2439
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 border custom-border p-6">
                                        <div className="flex flex-col justify-center">
                                            <MdMail size={30} />
                                            <h3 className="font-semibold">Email for workflows</h3>
                                            <span>Having trouble with an automation? We'll help you fix it</span>
                                            <Link
                                                href={'mailto:support@viasocket.com '}
                                                className="hover:underline hover:text-accent cursor-pointer transition-all w-fit"
                                            >
                                                support@viasocket.com
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 border custom-border p-6">
                                        <div className="flex flex-col justify-center">
                                            <MdMail size={30} />
                                            <h3 className="font-semibold">Email us to bring your app</h3>
                                            <span>Need help connecting your apps? We've got you covered</span>
                                            <Link
                                                href={'mailto:plugs@viasocket.com'}
                                                className="hover:underline hover:text-accent cursor-pointer transition-all w-fit"
                                            >
                                                plugs@viasocket.com
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full lg:w-2/5">
                            <div className="flex flex-col gap-5 p-12 h-[500px] items-center justify-center">
                                {issubmit ? (
                                    <div className="flex flex-col gap-4 max-w-[300px]">
                                        <Image
                                            className="h-[140px] w-[140px]"
                                            src={`/assets/img/check.png`}
                                            width={100}
                                            height={100}
                                            alt={'img'}
                                        />
                                        <p className="text-left">
                                            Stay tuned, you will receive a response within the next 24 hours.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-4 w-full text-left">
                                        <h2 className="md:text-3xl text-2xl font-semibold">Tell us how we can help</h2>
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
                        </div>
                    </div>
                </div>

                <div className="border custom-border bg-black text-white p-8 flex flex-col gap-8">
                    <h2 className="h2">Other ways to get help</h2>

                    <div className="grid md:grid-cols-2 sm:grid-cols-1 xl:grid-cols-4 gap-8">
                        <div className="flex justify-between gap-4 flex-col border border-white p-6">
                            <p className="flex flex-col">
                                <strong>Live Chat</strong>
                                <span> Chat with us right now</span>
                            </p>
                            <button className="btn btn-accent" onClick={() => window.chatWidget.open()}>
                                Live Chat
                            </button>
                        </div>

                        <div className="flex justify-between gap-4 flex-col border border-white p-6">
                            <p className="flex flex-col">
                                <strong>Book a Meeting</strong>
                                <span> Let's hop on a call and figure it out together</span>
                            </p>
                            <Link href="https://cal.id/forms/55f3930f-0e5e-4204-b3d5-f4858dcf202f" target="_blank">
                                <button className="btn btn-primary btn-outline bg-white">Book a Meeting</button>
                            </Link>
                        </div>

                        <div className="flex justify-between gap-4 flex-col border border-white p-6">
                            <p className="flex flex-col">
                                <strong>Help Docs</strong>
                                <span> Check out our guides and tutorials</span>
                            </p>
                            <Link href="https://viasocket.com/faq" target="_blank">
                                <button className="btn btn-primary btn-outline bg-white">Help Doc</button>
                            </Link>
                        </div>

                        <div className="flex justify-between gap-4 flex-col border border-white p-6">
                            <p className="flex flex-col">
                                <strong>Community</strong>
                                <span> Ask questions and share tips with other users</span>
                            </p>
                            <Link href="https://viasocket.com/community" target="_blank">
                                <button className="btn btn-primary btn-outline bg-white">Community </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container pb-4">
                <Footer footerData={footerData} />
            </div>
        </>
    );
}
