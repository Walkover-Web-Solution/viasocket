import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import { Mail, Phone, MessageSquare, Lightbulb } from 'lucide-react';
import Link from 'next/link';
import Footer from '@/components/footer/footer';
import NavbarServer from '../components/navbar/NavbarServer';
import ConditionalNavbar from '@/components/ConditionalLayout/ConditionalNavbar';
import ConditionalFooter from '@/components/ConditionalLayout/ConditionalFooter';
import { getExpertsPageData } from '../lib/data';

export const runtime = 'edge';

export async function generateMetadata() {
    const { metaData } = await getExpertsPageData();

    return {
        title: metaData?.title || 'Experts are Live - viaSocket',
        description: metaData?.description || 'Connect with live automation experts for instant support - viaSocket',
        keywords: metaData?.keywords || '',
        openGraph: {
            title: metaData?.title || 'Experts are Live - viaSocket',
            description:
                metaData?.description || 'Connect with live automation experts for instant support - viaSocket',
            images: metaData?.image ? [{ url: metaData.image }] : undefined,
        },
        twitter: {
            card: 'summary_large_image',
            title: metaData?.title,
            description: metaData?.description,
            images: metaData?.image ? [metaData.image] : undefined,
        },
    };
}

export default async function ExpertAreLivePage() {
    const { metaData, footerData, navbarData } = await getExpertsPageData();

    return (
        <>
            <MetaHeadComp metaData={metaData} page={'/expert-are-live'} />
            <ConditionalNavbar>
                <NavbarServer navbarData={navbarData} utm={'/expert-are-live'} />
            </ConditionalNavbar>

            <div className="global-top-space min-h-[calc(100vh-200px)] flex flex-col items-center justify-center">
                <div className="container flex flex-col items-center justify-center py-12 gap-12">
                    {/* Hero Section */}
                    <div className="flex flex-col items-center gap-6 text-center">
                        <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </span>
                            Experts are online now
                        </div>
                        <h1 className="h1 max-w-3xl">
                            Get instant help from <span className="text-accent">Live Experts</span>
                        </h1>
                        <p className="text-lg text-gray-600 max-w-xl">
                            Stuck with a workflow? Our experts are standing by to help you set up automations,
                            troubleshoot issues, and optimize your processes.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <Link
                                href="https://meet.google.com/hya-tdxd-mip"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-accent"
                            >
                                Join Google Meet
                            </Link>
                            <Link
                                href="https://cal.id/team/viasocket/workflow-setup-discussion"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-outline"
                            >
                                Book a Meeting
                            </Link>
                        </div>
                        <div className="flex items-start gap-3 bg-[#f9f7f2] border border-gray-200 rounded-lg p-4 max-w-lg">
                            <Lightbulb className="w-7 h-7 text-yellow-500 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-sm text-gray-800 font-medium">Heads up! You may need to wait in a short waiting room before being connected to a live expert.</p>
                            </div>
                        </div>
                    </div>

                    {/* Support Options */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
                        <div className="flex flex-col items-center text-center gap-5 border custom-border p-8 bg-white rounded-xl hover:shadow-lg transition-shadow duration-300">
                            <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center">
                                <Phone className="w-7 h-7 text-blue-600" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className="h3 text-xl">Give us a call</h3>
                                <p className="text-gray-600 text-sm">
                                    Prefer a detailed conversation? We're just one call away.
                                </p>
                            </div>
                            <Link href="tel:+13154442439" className="btn btn-outline w-fit text-sm">
                                Call
                            </Link>
                        </div>

                        <div className="flex flex-col items-center text-center gap-5 border custom-border p-8 bg-white rounded-xl hover:shadow-lg transition-shadow duration-300">
                            <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center">
                                <MessageSquare className="w-7 h-7 text-green-600" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className="h3 text-xl">WhatsApp</h3>
                                <p className="text-gray-600 text-sm">
                                    On the go? Drop us a message for a quick reply.
                                </p>
                            </div>
                            <Link
                                href="https://wa.me/+13154442439"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-outline w-fit text-sm"
                            >
                                Start Chat
                            </Link>
                        </div>

                        <div className="flex flex-col items-center text-center gap-5 border custom-border p-8 bg-white rounded-xl hover:shadow-lg transition-shadow duration-300">
                            <div className="w-14 h-14 rounded-full bg-purple-50 flex items-center justify-center">
                                <Mail className="w-7 h-7 text-purple-600" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className="h3 text-xl">Email Support</h3>
                                <p className="text-gray-600 text-sm">
                                    Questions or concerns? Our inbox is always open.
                                </p>
                            </div>
                            <Link href="mailto:support@viasocket.com" className="btn btn-outline w-fit text-sm">
                                Email Support
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <ConditionalFooter>
                <Footer footerData={footerData} />
            </ConditionalFooter>
        </>
    );
}
