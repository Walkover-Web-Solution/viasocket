import { Shield, Globe, Lock, Eye, Server, AlertTriangle } from 'lucide-react';

export const securityGridData = [
    {
        title: 'SOC 2 (Type II)',
        description:
            "Your workflow's data is handled with the highest level of security, privacy, and confidentiality.",
        iconName: 'shield-alt',
        icon: Shield,
    },
    {
        title: 'ISO Certified',
        description:
            'We consistently meet international standards to deliver reliable and secure solutions for your business.',
        iconName: 'certificate',
        icon: Globe,
    },
    {
        title: 'GDPR & CCPA Compliance',
        description: 'Your data remains private and entirely under your control, at all times.',
        iconName: 'user-shield',
        icon: Lock,
    },
    {
        title: 'End-to-End Observability',
        description:
            "Gain full visibility into your data's journey with detailed audit logs, real-time analytics, and proactive alerts.",
        iconName: 'eye',
        icon: Eye,
    },
    {
        title: '99.99% Uptime & Enterprise SLA',
        description: 'Stay worry-free with 99.99% uptime and fast, reliable support when you need it most.',
        iconName: 'clock',
        icon: Server,
    },
    {
        title: 'Error Handling & Recovery',
        description:
            'Stay ahead of issues with smart alerts and AI-powered troubleshooting, keeping your workflows running smoothly.',
        iconName: 'bug',
        icon: AlertTriangle,
    },
];

export default securityGridData;
