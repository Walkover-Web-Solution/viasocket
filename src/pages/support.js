import Link from 'next/link';
import { useState } from 'react';
import { MdStar } from 'react-icons/md';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import Image from 'next/image';
import Navbar from '@/components/navbar/navbar';
import Footer from '@/components/footer/footer';
import { getFooterData, getNavbarData } from '@/utils/getData';
import { FOOTER_FIELDS, NAVBAR_FIELDS } from '@/const/fields';
import { getMetaData } from '@/utils/getMetaData';
import { FaHeadset } from 'react-icons/fa';
import { IoIosPeople } from 'react-icons/io';
import { FaAnchor } from 'react-icons/fa';
import { FaPhoneSquareAlt } from 'react-icons/fa';
import { FaWhatsappSquare } from 'react-icons/fa';
import { FaCalendarCheck } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { getTestimonialData } from '@/utils/getData';
import { TESTIMONIALS_FIELDS } from '@/const/fields';

export async function getServerSideProps(context) {
    const { req } = context;
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const pageUrl = `${protocol}://${req.headers.host}${req.url}`;
    const testimonials = await getTestimonialData(TESTIMONIALS_FIELDS, '', pageUrl);
    const footerData = await getFooterData(FOOTER_FIELDS, '', pageUrl);
    const metaData = await getMetaData('/support', pageUrl);
    const navbarData = await getNavbarData(NAVBAR_FIELDS, '', pageUrl);
    return {
        props: {
            footerData: footerData || [],
            metaData: metaData || {},
            testimonials: testimonials || [],
            navbarData: navbarData || [],
        },
    };
}


export default function Support({ footerData, metaData, testimonials, navbarData }) {
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

    /** open chat widget */
    const openChatWidget = () => {
        window.chatWidget.open();
    };

    return (
        <>
            <MetaHeadComp metaData={metaData} page={'/support'} />
            <Navbar navbarData={navbarData} utm={'/support'} />

            <div className="container mt-12 global-top-space pt-12">
                <div className="support-page-heading">
                    <h1 className="h1">
                        We're here to help, <span className="text-accent">now!</span>
                    </h1>
                    <p>
                        If you need anything, just reach out—we're committed to being the automation assistant you
                        deserve!
                    </p>
                </div>

                <div className="flex flex-col gap-20 mt-12">
                    <div className="instant-help-section flex flex-col gap-6">
                        <h2 className="h2">Instant Help</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="flex flex-col border custom-border p-6 bg-white justify-between">
                                <FaHeadset size={32} />
                                <div className="flex flex-col min-h-[100px]">
                                    <h3 className="h3">Live Chat</h3>
                                    <p>For quick questions or troubleshooting that doesn’t require a call.</p>
                                </div>
                                <button className="btn btn-outline w-fit" onClick={openChatWidget}>
                                    Chat Now
                                </button>
                            </div>

                            <div className="flex flex-col border custom-border p-6 bg-white justify-between">
                                <IoIosPeople size={32} />
                                <div className="flex flex-col min-h-[100px]">
                                    <h3 className="h3">Search answers in Community</h3>
                                    <p>Connect with other users, get answers, and share automation tips.</p>
                                </div>
                                <Link href="https://viasocket.com/community/" className="btn btn-outline w-fit">
                                    Engage with viaSocket Community
                                </Link>
                            </div>

                            <div className="flex flex-col border custom-border p-6 bg-white justify-between">
                                <FaAnchor size={32} />
                                <div className="flex flex-col min-h-[100px]">
                                    <h3 className="h3">FAQ</h3>
                                    <p>Connect with other users, get answers, and share automation tips.</p>
                                </div>
                                <Link href="https://viasocket.com/help" className="btn btn-outline w-fit">
                                    Start learning with viaSocket FAQ
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="border custom-border p-6 bg-black text-white flex flex-col gap-4">
                        <div className="flex flex-col">
                            <h3 className="h3">Hire an Automation Experts</h3>
                            <p>
                                Need help automating entire business processes? viaSocket Experts are certified
                                consultants who specialize in workflow automation.
                            </p>
                        </div>
                        <Link
                            href="https://viasocket.com/experts"
                            className="btn bg-accent text-white hover:bg-white hover:text-black border-none"
                        >
                            Find an Expert
                        </Link>
                    </div>

                    <div className="support__container flex flex-col gap-6">
                        <div className="flex flex-col">
                            <h2 className="h2">Looking to bring your app on viaSocket? </h2>
                            <p>
                                For SaaS companies looking to bring their app onto the platform, or those currently in
                                the process of building one
                            </p>
                        </div>

                        <div className="flex flex-col lg:flex-row">
                            <div className="w-full lg:w-3/5 bg-white p-6 border border-b-0 lg:border-b lg:border-r-0 custom-border flex flex-col gap-4">
                                <div className="flex flex-col">
                                    <h3 className="h3">Build your app integration the way you want</h3>
                                    <p>Follow this playbook to build an app integration from start to finish.</p>
                                </div>
                                <Link
                                    href="https://viasocket.my.canva.site/viasocket-dh-playbook"
                                    className="btn btn-outline w-fit"
                                >
                                    Read our playbook
                                </Link>
                            </div>
                            <div className="w-full lg:w-2/5 border custom-border p-6 flex flex-col gap-4 bg-[#FAF9F6]">
                                <div className="flex flex-col">
                                    <h3 className="h3">Build it together with our team</h3>
                                    <p>Our team can come on screen sharing and build it together with your team.</p>
                                </div>
                                <Link href="mailto:support@viasocket.com" className="btn btn-outline w-fit">
                                    Connect with team
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col">
                            <h2 className="h2">Talk to Human</h2>
                            <p>Available daily for 18 hours</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="flex flex-col border custom-border p-6 bg-white justify-between">
                                <FaPhoneSquareAlt size={32} />
                                <div className="flex flex-col min-h-[100px]">
                                    <h3 className="h3">Give us a call</h3>
                                    <p>If you'd prefer a detailed conversation or need more in-depth assistance.</p>
                                </div>
                                <Link href="tel:+13154442439" className="btn btn-outline w-fit">
                                    Phone
                                </Link>
                            </div>

                            <div className="flex flex-col border custom-border p-6 bg-white justify-between">
                                <FaWhatsappSquare size={32} />
                                <div className="flex flex-col min-h-[100px]">
                                    <h3 className="h3">Text us on WhatsApp</h3>
                                    <p>For quick questions or if you’re on the go and need a fast reply.</p>
                                </div>
                                <Link href="https://wa.me/+13154442439" className="btn btn-outline w-fit">
                                    WhatsApp
                                </Link>
                            </div>

                            <div className="flex flex-col border custom-border p-6 bg-white justify-between">
                                <FaCalendarCheck size={32} />
                                <div className="flex flex-col min-h-[100px]">
                                    <h3 className="h3">Book a Meeting</h3>
                                    <p>If your question needs more time or a detailed conversation, schedule a call</p>
                                </div>
                                <Link
                                    href="https://cal.id/forms/55f3930f-0e5e-4204-b3d5-f4858dcf202f"
                                    className="btn btn-outline w-fit"
                                >
                                    Book a Meeting
                                </Link>
                            </div>

                            <div className="flex flex-col border custom-border p-6 bg-white justify-between">
                                <MdEmail size={32} />
                                <div className="flex flex-col min-h-[100px]">
                                    <h3 className="h3">Email support</h3>
                                    <p>For any other questions or concerns, please email us at support@viasocket.com</p>
                                </div>
                                <Link href="mailto:support@viasocket.com" className="btn btn-outline w-fit">
                                    Email Us
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6 p-6 border custom-border bg-white">
                        <div className="flex flex-col gap-1">
                            <h2 className="h2">Can't Get Help? Contact the Founders Directly</h2>
                            <p>
                                If you're facing a challenge that our team hasn’t been able to resolve or if you have
                                feedback that could help us improve, we want to hear from you. As the founders of
                                viaSocket, we’re always here to listen, solve problems, and continuously evolve to serve
                                you better. Don’t hesitate to reach out to us directly—we’re committed to making sure
                                you get the best experience possible.
                            </p>
                        </div>

                        <div className="flex flex-col gap-4">
                            <div className="founder-info flex items-center gap-2">
                                <Image
                                    src={
                                        'https://images.contactout.com/profiles/1d4c2fa861915fecc3f5002b63cd33f9' ||
                                        'https://placehold.co/40x40'
                                    }
                                    width={40}
                                    height={40}
                                    alt="Pushpendra Agrawal - Founder Profile Photo"
                                />
                                <div className="flex flex-col">
                                    <p> Pushpendra Agrawal (Founder) </p>
                                    <Link
                                        href="mailto:pushpendra@walkover.in"
                                        className="hover:text-blue-500 hover:underline"
                                    >
                                        {' '}
                                        Email: pushpendra@walkover.in
                                    </Link>
                                </div>
                            </div>
                            <div className="founder-info flex items-center gap-2">
                                <Image
                                    src={
                                        'https://media.licdn.com/dms/image/v2/D4D03AQFFuPdme6p-uw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1718316029070?e=2147483647&v=beta&t=KV5pENgrIy7AkGL4-kH3U73Zg29Y9vpF5HmQVdSpc8E' ||
                                        'https://placehold.co/40x40'
                                    }
                                    width={40}
                                    height={40}
                                    alt="Ravi Paliwal - Co-founder Profile Photo"
                                />
                                <div className="flex flex-col">
                                    <p>Ravi Paliwal (Co-founder)</p>
                                    <Link
                                        href="mailto:rpaliwal@msg91.com"
                                        className="hover:text-blue-500 hover:underline"
                                    >
                                        {' '}
                                        Email: rpaliwal@msg91.com
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="form-container flex flex-col gap-6">
                        <div className="form-heading">
                            <h2 className="h2">Need More Information? Let's look deeper</h2>
                            <p>Get started by telling us a bit about your problem</p>
                        </div>

                        <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
                            <div className="border custom-border p-6 bg-white lg:w-[45%] w-full">
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
                                    <div className="flex flex-col gap-4 w-full">
                                        <h3 className="h3">Tell us about your issue</h3>
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="name" className="mb-0">
                                                Name
                                            </label>
                                            <input
                                                required
                                                type="text"
                                                name="name"
                                                id="name"
                                                placeholder="Please enter your name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className={`input bg-white w-full border custom-border outline-none focus:outline-none ${errors.name ? 'border-red-500' : ''}`}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="email" className="mb-0">
                                                Email
                                            </label>
                                            <input
                                                required
                                                type="email"
                                                name="email"
                                                placeholder="Please enter your email address"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className={`input bg-white w-full border custom-border outline-none focus:outline-none ${errors.email ? 'border-red-500' : ''}`}
                                            />
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <p htmlFor="message" className="mb-0">
                                                Issue description or details
                                            </p>
                                            <textarea
                                                // style={{ resize: 'none' }}
                                                required
                                                name="issue"
                                                placeholder="Issue description or details"
                                                value={formData.issue}
                                                onChange={handleChange}
                                                className="input bg-white w-full border custom-border outline-none py-2 focus:outline-none "
                                            />
                                        </div>
                                        <button className="btn btn-accent  " onClick={handleSubmit}>
                                            {isSend ? <p>Sending </p> : <p> Send us message </p>}
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="cont gap-4 bg-white p-6 border custom-border lg:w-[50%] w-full">
                                <div className="flex flex-col gap-2">
                                    <div className="cont gap-2">
                                        <div className="flex gap-1">
                                            {[...Array(5)].map((_, index) => (
                                                <MdStar key={index} fontSize={24} color="#FDE047" />
                                            ))}
                                        </div>
                                        <p className="text-md">{testimonials[0]?.testimonial}</p>
                                    </div>
                                    <div className="flex gap-3">
                                        <Image
                                            className="rounded-full h-11 w-fit"
                                            src={testimonials[0]?.client_img[0] || 'https://placehold.co/40x40'}
                                            width={36}
                                            height={36}
                                            alt="testimonial image"
                                        />
                                        <div className="cont">
                                            <p className="font-semibold">{testimonials[0]?.given_by}</p>
                                            <p className="text-sm">{testimonials[0]?.giver_title}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container py-8">
                <Footer footerData={footerData} />
            </div>
        </>
    );
}
