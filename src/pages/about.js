import Footer from '@/components/footer/footer';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import Navbar from '@/components/navbar/navbar';
import { FOOTER_FIELDS, METADATA_FIELDS } from '@/const/fields';
import { getFooterData, getMetaData } from '@/utils/getData';
import React from 'react';

export const runtime = 'experimental-edge';
const arrowIcon = (
    <svg viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg" className="arrow-icon">
        <g className="arrow-head">
            <path d="M1 1C4.5 4 5 4.38484 5 4.5C5 4.61516 4.5 5 1 8" stroke="currentColor" strokeWidth="1.5" />
        </g>
        <g className="arrow-body">
            <path d="M3.5 4.5H0" stroke="currentColor" strokeWidth="1.5" />
        </g>
    </svg>
);

const about = ({ metaData, footerData }) => {
    return (
        <>
            <MetaHeadComp metaData={metaData} page={'/about'} />
            <Navbar footerData={footerData} utm={'/about'} />
            <div className="container">
                <div className="min-h-screen mt-12 flex flex-col gap-16">
                    <div className="about__hero">
                        <h2 className="m-0 h2">Our Purpose on This Planet is Simple:</h2>
                        <h1 className="h1">Bring Your Automation Ideas to Life and Spark New Ones</h1>
                    </div>
                    <div className="cont border custom-border gap-2 p-12 bg-white">
                        <div className="cont gap-1">
                            <h2 className="h2">Always Within Your Reach</h2>
                            <p className="sub__h1">
                                Whether You Need Help or Just Have a Question About Automation, We’re Here for You—From
                                Founders to Support.
                            </p>
                            <div className="flex flex-wrap mt-12">
                                <div className="max-w-[20rem] p-6 bg-white flex flex-col justify-between border custom-border border-r-0">
                                    <div className="talk-to-founders">
                                        <h5 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                            Talk to the founders
                                        </h5>

                                        <p className="font-normal text-gray-500 dark:text-gray-400">
                                            Want to share your thoughts, or just want to learn more about automation,
                                            the founders are here for a chat.
                                        </p>
                                    </div>
                                    <a
                                        href="mailto:pushpendra@walkover.in"
                                        className="inline-flex font-medium items-center text-accent hover:underline link-btn"
                                    >
                                        <span>Email us</span>
                                        {arrowIcon}
                                    </a>
                                </div>
                                <div className="max-w-[20rem] p-6 bg-white flex flex-col justify-between border custom-border border-r-0">
                                    <div className="get-support-now">
                                        <h5 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                            Get support now
                                        </h5>

                                        <p className="font-normal text-gray-500 dark:text-gray-400">
                                            Our support team is ready to assist you with any issues or questions you
                                            have.
                                        </p>
                                    </div>
                                    <a
                                        href="mailto:support@viasocket.com"
                                        className="inline-flex font-medium items-center text-accent hover:underline link-btn"
                                    >
                                        <span>Talk to support</span>
                                        {arrowIcon}
                                    </a>
                                </div>
                                <div className="max-w-[20rem] p-6 bg-white flex flex-col justify-between border custom-border border-r-0">
                                    <div className="book-a-meeting">
                                        <h5 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                            Book a meeting
                                        </h5>

                                        <p className="font-normal text-gray-500 dark:text-gray-400">
                                            Schedule a Call and discuss your needs with us. We're here to help you grow
                                            your business with seamless automation.
                                        </p>
                                    </div>
                                    <a
                                        href="https://cal.id/team/viasocket/superheros?date=2025-06-17&month=2025-06"
                                        className="inline-flex font-medium items-center text-accent hover:underline link-btn"
                                    >
                                        <span>Schedule a Call</span>
                                        {arrowIcon}
                                    </a>
                                </div>
                                <div className="max-w-[20rem] p-6 bg-white flex flex-col justify-between border custom-border">
                                    <div className="join-the-community">
                                        <h5 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                            Join the Community
                                        </h5>

                                        <p className="font-normal text-gray-500 dark:text-gray-400">
                                            Be part of a vibrant community of innovators and automation enthusiasts.
                                            Connect, learn, and share insights.
                                        </p>
                                    </div>
                                    <a
                                        href="https://viasocket.com/community/"
                                        className="inline-flex font-medium items-center text-accent hover:underline link-btn"
                                    >
                                        <span>Join Community</span>
                                        {arrowIcon}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-12 border custom-border">
                        <h2 className="h2">Let’s build a more productive future, together</h2>
                        <div className="mt-8 flex flex-col gap-8">
                            <div className="gap-16 flex-row xl:flex">
                                <div className="paragraph flex flex-col justify-around">
                                    <p className="1">
                                        Eight years ago, I started <strong>viaSocket</strong> with a small, passionate
                                        team and a singular goal:{' '}
                                        <strong>
                                            to put the power of integrations into the hands of every professional
                                        </strong>
                                        . Back then, it felt like a monumental challenge, but today, it’s a journey I’m
                                        incredibly proud of.
                                    </p>

                                    <p className="2">
                                        What keeps me excited every day is witnessing the incredible processes that
                                        people can automate — <strong>without writing a single line of code</strong>.
                                        The creativity and efficiency our users unlock using <strong>viaSocket</strong>{' '}
                                        is what really drives me forward.
                                    </p>
                                    <p className="3">
                                        My team and I welcome both praise and criticism. <strong>Praise</strong>{' '}
                                        reassures us that we’re on the right track, confirming that we’re addressing the
                                        real issue of automating repetitive tasks. <strong>Criticism</strong>, on the
                                        other hand, reminds us that there’s always room for improvement. It motivates us
                                        to continuously simplify and enhance the automation experience for our
                                        customers.
                                    </p>
                                    <p className="4">
                                        Throughout this journey, I’ve come to realize that <strong>viaSocket</strong>,
                                        my team, and I exist because of you — our customers. Without you, none of this
                                        would matter. You’re at the heart of everything we do. Because of you, we get to
                                        wake up every morning and work on a product we love. We get to solve problems
                                        and build tools that help people like you work faster, smarter, and better.
                                    </p>
                                </div>
                                <img
                                    src="https://images.contactout.com/profiles/1d4c2fa861915fecc3f5002b63cd33f9"
                                    alt=""
                                    className="object-cover xl:w-full w-[25rem] h-[336px] mt-8 xl:mt-0"
                                />
                            </div>
                            <p className="5">
                                If there’s ever a moment when something doesn’t seem right — whether it’s a bug, a
                                feature request, or even just a question about automation — please don’t hesitate to
                                reach out.{' '}
                                <strong>
                                    My sole purpose is to be here for you, and I, as one of the founders, am within your
                                    reach
                                </strong>
                                . If anything seems off, please talk to me directly. I’m here for you, personally. I
                                want to hear from you, and so does my team. We’re always ready to listen and help in any
                                way we can.
                            </p>
                            <p className="6">
                                Our mission is simple:{' '}
                                <strong>to empower you to turn your automation ideas into reality</strong>. We want you
                                to feel confident in sharing your ideas with us, knowing that we’re eager to help bring
                                them to life. Whether you're automating a small task or building a complex workflow,
                                we're here to make sure the process is seamless, efficient, and truly works for you.
                            </p>
                            <p className="7">
                                Together, we'll keep pushing the boundaries of what's possible with automation.{' '}
                                <strong>Your success is our success</strong>, and I’m committed to ensuring viaSocket is
                                always there to help you grow, simplify, and succeed.
                            </p>
                            <p className="8">
                                If you ever need a hand, or just want to chat about how we can make things even better,
                                drop me an email or schedule a meeting. I’m just a click away from helping you out!
                            </p>
                        </div>
                    </div>
                    <div className="cont border custom-border gap-12 p-12 bg-[#A8200D]">
                        <h2 className="h2 text-white">Explore more about viaSocket</h2>
                        <div className="flex flex-wrap gap-8">
                            <div className="max-w-[25rem] h-[26vh] p-6 bg-white border custom-border border-r-0 flex flex-col justify-between">
                                <div className="join-our-mission">
                                    <h5 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                        Join our mission
                                    </h5>

                                    <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
                                        We’re on a journey to make automation work for everyone—and we want YOU to be a
                                        part of it! Ready to join our team?
                                    </p>
                                </div>
                                <a
                                    href="https://walkover.in/careers"
                                    className="inline-flex font-medium items-center text-accent hover:underline  link-btn"
                                >
                                    <span>Check Out Job Openings</span>
                                    {arrowIcon}
                                </a>
                            </div>
                            <div className="max-w-[25rem] h-[26vh] p-6 bg-white border custom-border border-r-0 flex flex-col justify-between">
                                <div className="meet-our-awesome">
                                    <h5 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                        Meet our awesome customers
                                    </h5>

                                    <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
                                        See how businesses across the globe are using automation as the backbone of
                                        their success.
                                    </p>
                                </div>
                                <a
                                    href="https://viasocket.com/blog/tag/client-story/"
                                    target="_blank"
                                    className="inline-flex font-medium items-center text-accent hover:underline link-btn"
                                >
                                    <span>Discover Customer Stories</span>
                                    {arrowIcon}
                                </a>
                            </div>
                            <div className="max-w-[25rem] h-[26vh] p-6 bg-white border custom-border border-r-0 flex flex-col justify-between">
                                <div className="partner-with-us">
                                    <h5 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                        Partner with us
                                    </h5>

                                    <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
                                        Become part of our growing network of businesses empowering users with
                                        automation solutions.
                                    </p>
                                </div>
                                <a
                                    href="https://viasocket.com/faq/partners/automation-experts"
                                    className="inline-flex font-medium items-center text-accent hover:underline link-btn"
                                >
                                    <span>Explore Our Partner Program</span>
                                    {arrowIcon}
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="border custom-border gap-12 p-12 bg-white border-b-0">
                        <h2 className="h2">In the news</h2>
                        <ul className="mt-5" style={{ listStyleType: 'square' }}>
                            <li>
                                <a
                                    href="https://techtimesnews.in/in-the-shadow-of-giants-how-an-indian-startup-quietly-solved-the-same-problem-as-anthropic/"
                                    className="text-accent hover:underline"
                                    target="_blank"
                                >
                                    In the Shadow of Giants: How an Indian Startup Quietly Solved the Same Problem as
                                    Anthropic
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="container">
                <Footer footerData={footerData} />
            </div>
        </>
    );
};

export default about;

export async function getServerSideProps(context) {
    const { req } = context;
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const pageUrl = `${protocol}://${req.headers.host}${req.url}`;

    const metaData = await getMetaData(METADATA_FIELDS, `filter=name='/about'`, pageUrl);
    const footerData = await getFooterData(FOOTER_FIELDS, '', pageUrl);
    return {
        props: {
            footerData: footerData || [],
            metaData: (metaData?.length > 0 && metaData[0]) || {},
        },
    };
}
