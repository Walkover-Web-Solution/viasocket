import Link from 'next/link';
import { useState } from 'react';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import { IoIosFlash } from "react-icons/io";
import { FaHeadset } from "react-icons/fa6";
import { IoIosPeople } from "react-icons/io";

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

            <div className="container flex flex-col gap-12 pt-12">
                <div className="support-heading">
                    <h1 className="h1 flex items-center gap-2">
                        <span>We're here to help, now!</span> <IoIosFlash />
                    </h1>
                    <p>
                        If you need anything, just reach out—we're committed to being the automation assistant you
                        deserve!
                    </p>
                </div>

                <div className="flex flex-col gap-4">
                    <h2 className="h2">Instant Help</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="border custom-border p-8 flex flex-col gap-4 justify-between bg-white">
                            <div className="flex flex-col">
                                <FaHeadset size={32} />
                                <h3 className="h3">Live chat with AI</h3>
                                <p>For quick questions or troubleshooting that doesn’t require a call.</p>
                            </div>
                            <button className="btn btn-accent">Start Chat Now</button>
                        </div>
                        <div className="border custom-border p-8 flex flex-col gap-4 justify-between bg-white">
                            <div className="flex flex-col">
                                <IoIosPeople size={32} />
                                <h3 className="h3">Search answers in Communityl</h3>
                                <p>Connect with other users, get answers, and share automation tips.</p>
                            </div>
                            <button className="btn btn-accent">Engage with viaSocket Community</button>
                        </div>
                        <div className="border custom-border p-8 flex flex-col gap-4 justify-between bg-white">
                            <div className="flex flex-col">
                                <IoIosFlash size={32} />
                                <h3 className="h3">FAQ</h3>
                                <p>Connect with other users, get answers, and share automation tips.</p>
                            </div>
                            <button className="btn btn-accent">Start learning with viaSocket Learn </button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <h2 className="h2">Talk to Human</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="border custom-border p-8 flex flex-col gap-4 justify-between bg-white">
                            <div className="flex flex-col">
                                <h3 className="h3">Give us a call</h3>
                                <p>If you'd prefer a detailed conversation or need more in-depth assistance.</p>
                            </div>
                            <button className="btn btn-accent">Phone: +1 (315) 444-2439</button>
                        </div>
                        <div className="border custom-border p-8 flex flex-col gap-4 justify-between bg-white">
                            <div className="flex flex-col">
                                <h3 className="h3">Text us on WhatsApp</h3>
                                <p>For quick questions or if you’re on the go and need a fast reply.</p>
                            </div>
                            <button className="btn btn-accent">WhatsApp: +1 (315) 444-2439</button>
                        </div>
                        <div className="border custom-border p-8 flex flex-col gap-4 justify-between bg-white">
                            <div className="flex flex-col">
                                <h3 className="h3">Book a Meeting</h3>
                                <p>If your question needs more time or a detailed conversation, schedule a call.</p>
                            </div>
                            <button className="btn btn-accent">Book a Meeting</button>
                        </div>
                        <div className="border custom-border p-8 flex flex-col gap-4 justify-between bg-white">
                            <div className="flex flex-col">
                                <h3 className="h3">Email us</h3>
                                <p>If you need to reach out to us for any reason, we're here to help.</p>
                            </div>
                            <button className="btn btn-accent">Email us</button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-4 justify-between bg-white p-8 border custom-border">
                    <div className="flex flex-col">
                        <h2 className="h2">Hire an Automation Experts</h2>
                        <p>
                            Need help automating entire business processes? viaSocket Experts are certified consultants
                            who specialize in workflow automation.
                        </p>
                    </div>
                    <button className="btn btn-accent">Find an Expert</button>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="flex flex-col">
                        <h2 className="h2">Looking to bring your app on viaSocket? </h2>
                        <p>
                            For SaaS companies looking to bring their app onto the platform, or those currently in the
                            process of building one
                        </p>
                    </div>

                    <div className="border custom-border bg-[#FAF9F6] flex flex-col lg:flex-row items-center justify-between">
                        <div className="w-full lg:w-3/5 bg-white p-8 border-b lg:border-b-0 lg:border-r custom-border flex flex-col gap-4">
                            <div className="flex flex-col">
                                <h3 className="h3">Build your app integration the way you want</h3>
                                <p>Follow this playbook to build an app integration from start to finish.</p>
                            </div>
                            <Link
                                href="https://viasocket.my.canva.site/viasocket-dh-playbook"
                                className="btn btn-accent"
                            >
                                With the iframe we can bring the playbook here
                            </Link>
                        </div>
                        <div className="w-full lg:w-2/5 bg-[#FAF9F6] p-8 flex flex-col gap-4">
                            <div className="flex flex-col">
                                <h3 className="h3">Get help building your app integration</h3>
                                <p>Our team would be delighted to assist you with the integration process.</p>
                            </div>
                            <Link href="mailto:plugs@viasocket.com" className="btn btn-accent">
                                Drop us a mail on - plugs@viasocket.com
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-4 p-8 border custom-border bg-white">
                    <h2 className="h2">Can't Get Help? Contact the Founders Directly</h2>
                    <p>
                        If you're facing a challenge that our team hasn’t been able to resolve or if you have feedback
                        that could help us improve, we want to hear from you. As the founders of viaSocket, we’re always
                        here to listen, solve problems, and continuously evolve to serve you better. Don’t hesitate to
                        reach out to us directly—we’re committed to making sure you get the best experience possible.
                    </p>

                    <div className="flex flex-col gap-4">
                        <h3 className="h3">Contact the Founders</h3>
                        <p>Pushpendra Agrawal (Founder) – email address</p>
                        <p>Ravi Palliwal (Co-founder) – email address</p>
                    </div>
                </div>
            </div>
            <div className="container pb-4">
                <Footer footerData={footerData} />
            </div>
        </>
    );
}
