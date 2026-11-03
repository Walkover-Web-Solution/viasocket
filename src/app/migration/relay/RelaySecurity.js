const SECURITY =
    'viaSocket is SOC 2 Type II certified, ISO certified, and GDPR and CCPA compliant. All traffic runs over HTTPS behind Cloudflare with DDoS protection and a web firewall. The platform carries a 99.99% uptime SLA.';

export default function RelaySecurity() {
    return (
        <div className="container pt-12 pb-4">
            <h2 className="h2 mb-4">Security and compliance</h2>
            <p className="text-gray-800 max-w-3xl">{SECURITY}</p>
        </div>
    );
}
