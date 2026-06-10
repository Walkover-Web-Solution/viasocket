import Image from 'next/image';

const APPS = [
    { src: 'https://thingsofbrand.com/api/icon/slack.com', alt: 'Slack', angle: -90 },     // top
    { src: 'https://thingsofbrand.com/api/icon/gmail.com', alt: 'Gmail', angle: -30 },     // top right
    { src: 'https://thingsofbrand.com/api/icon/hubspot.com', alt: 'HubSpot', angle: 30 },   // bottom right
    { src: 'https://thingsofbrand.com/api/icon/shopify.com', alt: 'Shopify', angle: 90 },  // bottom
    { src: 'https://thingsofbrand.com/api/icon/google.com', alt: 'Google Drive', angle: 150 }, // bottom left
    { src: 'https://thingsofbrand.com/api/icon/notion.com', alt: 'Notion', angle: 210 },    // top left
];

export default function ConnectToolsDiagram() {
    const cx = 100;
    const cy = 100;
    const r = 58;

    return (
        <div className="relative w-full h-full flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet">
                {/* Connection lines from center to each app */}
                {APPS.map((app) => {
                    const rad = (app.angle * Math.PI) / 180;
                    const x2 = cx + r * Math.cos(rad);
                    const y2 = cy + r * Math.sin(rad);
                    return (
                        <line
                            key={app.alt}
                            x1={cx}
                            y1={cy}
                            x2={x2}
                            y2={y2}
                            stroke="#A8200d"
                            strokeWidth="1"
                            strokeDasharray="3 2.5"
                        />
                    );
                })}
            </svg>

            {/* Center link icon */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                    </svg>
                </div>
            </div>

            {/* App icons in circle */}
            {APPS.map((app) => {
                const rad = (app.angle * Math.PI) / 180;
                const x = 50 + 29 * Math.cos(rad); // % position
                const y = 50 + 29 * Math.sin(rad); // % position
                return (
                    <div
                        key={app.alt}
                        className="absolute z-10"
                        style={{
                            left: `${x}%`,
                            top: `${y}%`,
                            transform: 'translate(-50%, -50%)',
                        }}
                    >
                        <div className="bg-white rounded-full border border-gray-100 p-2 shadow-sm">
                            <Image
                                src={app.src}
                                alt={app.alt}
                                width={32}
                                height={32}
                                className="w-8 h-8 object-contain"
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
