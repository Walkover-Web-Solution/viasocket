'use client';

import { useState, useEffect, useCallback } from 'react';
import EmbedBreadcrumbs from '../EmbedBreadcrumbs';
import '@/components/WebhookAnimations/WebhookAnimations.module.scss';
import Link from 'next/link';
import LimitedTimeOffer from '@/app/components/embed/LimitedTimeOffer';
import HeroCtaButtons from '@/app/components/embed/HeroCtaButtons';
import WebhookHeroPreview from './WebhookHeroPreview';

const events = [
    {
        text: 'New Signup',
        iconColor: '#059669',
        iconSvg: 'M12 2L13.4 8.4L20 10L13.4 11.6L12 18L10.6 11.6L4 10L10.6 8.4Z',
    },
    {
        text: 'Order Placed',
        iconColor: '#2563eb',
        iconSvg: 'M3 3h18v18H3V3zm16 16V5H5v14h14zM7 7h10v2H7V7zm0 4h10v2H7v-2zm0 4h7v2H7v-2z',
    },
    {
        text: 'Payment Received',
        iconColor: '#d97706',
        iconSvg:
            'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z',
    },
    {
        text: 'Form Submitted',
        iconColor: '#7c3aed',
        iconSvg:
            'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z',
    },
    {
        text: 'Meeting Booked',
        iconColor: '#db2777',
        iconSvg:
            'M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm-8 4H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z',
    },
];

const scenarios = [
    {
        event: 'order.placed',
        value: '149.00',
        pill: '5 done',
        rows: [
            {
                name: 'Gmail',
                sub: 'Send order receipt',
                img: 'https://thingsofbrand.com/api/icon/gmail.com',
            },
            {
                name: 'Slack',
                sub: 'Notify #sales',
                img: 'https://thingsofbrand.com/api/icon/slack.com',
            },
            {
                name: 'Sheets',
                sub: 'Log order row',
                img: 'https://thingsofbrand.com/api/icon/google.com',
            },
            {
                name: 'HubSpot',
                sub: 'Create deal in pipeline',
                img: 'https://thingsofbrand.com/api/icon/hubspot.com',
            },
            {
                name: 'Notion',
                sub: 'Add order to tracker',
                img: 'https://thingsofbrand.com/api/icon/notion.com',
            },
        ],
    },
    {
        event: 'user.signup',
        value: '0.00',
        pill: '3 done',
        rows: [
            {
                name: 'Mailchimp',
                sub: 'Add to welcome list',
                img: 'https://thingsofbrand.com/api/icon/mailchimp.com',
            },
            {
                name: 'Slack',
                sub: 'Alert #growth',
                img: 'https://thingsofbrand.com/api/icon/slack.com',
            },
            {
                name: 'Airtable',
                sub: 'Create user record',
                img: 'https://thingsofbrand.com/api/icon/airtable.com',
            },
            {
                name: 'HubSpot',
                sub: 'Create contact',
                img: 'https://thingsofbrand.com/api/icon/hubspot.com',
            },
            {
                name: 'Notion',
                sub: 'Log to CRM',
                img: 'https://thingsofbrand.com/api/icon/notion.com',
            },
        ],
    },
    {
        event: 'payment.success',
        value: '499.00',
        pill: '4 done',
        rows: [
            {
                name: 'QuickBooks',
                sub: 'Record invoice',
                img: 'https://thingsofbrand.com/api/icon/quickbooks.com',
            },
            {
                name: 'Slack',
                sub: 'Notify #finance',
                img: 'https://thingsofbrand.com/api/icon/slack.com',
            },
            {
                name: 'Gmail',
                sub: 'Send receipt',
                img: 'https://thingsofbrand.com/api/icon/gmail.com',
            },
            {
                name: 'Stripe',
                sub: 'Update customer',
                img: 'https://thingsofbrand.com/api/icon/stripe.com',
            },
            {
                name: 'Notion',
                sub: 'Log transaction',
                img: 'https://thingsofbrand.com/api/icon/notion.com',
            },
        ],
    },
];

export default function WebhookHero({ appCount }) {
    const [index, setIndex] = useState(0);
    const [fade, setFade] = useState(false);

    const cycle = useCallback(() => {
        setFade(true);
        setTimeout(() => {
            setIndex((prev) => (prev + 1) % events.length);
            setFade(false);
        }, 250);
    }, []);

    useEffect(() => {
        const interval = setInterval(cycle, 3000);
        return () => clearInterval(interval);
    }, [cycle]);

    const scenario = scenarios[index % scenarios.length];

    return (
        <>
            <section className="pt-3 mx-auto bg-transparent relative container max-[768px]:px-6 max-[480px]:px-4">
                <EmbedBreadcrumbs currentPage="Action via Webhook" />
                <div className="relative flex items-center justify-center overflow-hidden bg-[#0A1A38] border border-white/10">
                    {/* Grid overlay */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.12) 1.2px, transparent 1.6px)',
                            backgroundSize: '22px 22px',
                            maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.1) 100%)',
                            WebkitMaskImage:
                                'radial-gradient(ellipse at center, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.1) 100%)',
                        }}
                    />

                    {/* Content */}
                    <div className="relative z-10 p-6 lg:p-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:min-h-[580px] items-center">
                        {/* Left */}
                        <div className="flex flex-col gap-4">
                            <LimitedTimeOffer href="https://viasocket.com/signup?utm_source=/embed/actions-for-ai" />
                            <h1 className="h1 !text-white flex flex-wrap items-center justify-start lg:justify-center gap-1 mb-4">
                                The Fastest Way to Add Intgrations to Your Product
                            </h1>

                            <p className="text-base sm:text-lg md:text-xl text-white mb-6 md:mb-8">
                                Connect your product to {appCount + 300}+ apps with one simple connection. No custom
                                integraton required{' '}
                            </p>

                            <HeroCtaButtons signupHref="https://viasocket.com/signup?utm_source=/embed/actions-via-webhook" className="flex gap-3 sm:gap-4 md:gap-6 items-center justify-start w-full" />
                        </div>

                        {/* Right */}
                        <WebhookHeroPreview scenario={scenario} fade={fade} />
                    </div>
                </div>
            </section>
        </>
    );
}
