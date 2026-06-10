import Image from 'next/image';

export default function WorkflowAutomationDiagram() {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="grid grid-cols-[1fr_auto_1fr] gap-x-3 gap-y-5 items-start justify-items-center">
                {/* Row 1: Google Sheets → Webhook */}
                <div className="flex flex-col items-center gap-1.5">
                    <Image
                        src="https://thingsofbrand.com/api/icon/sheets.google.com"
                        alt="Google Sheets"
                        width={36}
                        height={36}
                        className="w-9 h-9 object-contain"
                    />
                    <span className="text-[11px] text-gray-600 leading-tight">Google Sheets</span>
                </div>
                <div className="flex items-center pt-2">
                    <svg width="32" height="14" viewBox="0 0 32 14">
                        <line x1="0" y1="7" x2="24" y2="7" stroke="#A8200d" strokeWidth="2" strokeDasharray="4 3" />
                        <polygon points="24,3 32,7 24,11" fill="#A8200d" />
                    </svg>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                    <Image
                        src="https://stuff.thingsofbrand.com/viasocket.com/images/img0_Webhook-Transparent.svg"
                        alt="Webhook"
                        width={36}
                        height={36}
                        className="w-9 h-9 object-contain"
                    />
                    <span className="text-[11px] text-gray-600 leading-tight">Webhook</span>
                </div>

                {/* Row 2: down arrow under Webhook → Gmail */}
                <div />
                <div />
                <div className="flex justify-center">
                    <svg width="14" height="28" viewBox="0 0 14 28">
                        <line x1="7" y1="0" x2="7" y2="22" stroke="#A8200d" strokeWidth="2" strokeDasharray="4 3" />
                        <polygon points="3,22 7,28 11,22" fill="#A8200d" />
                    </svg>
                </div>

                {/* Row 3: Slack ← Gmail */}
                <div className="flex flex-col items-center gap-1.5">
                    <Image
                        src="https://stuff.thingsofbrand.com/slack.com/images/img668216333e_slack.jpg"
                        alt="Slack"
                        width={36}
                        height={36}
                        className="w-9 h-9 object-contain"
                    />
                    <span className="text-[11px] text-gray-600 leading-tight">Slack</span>
                </div>
                <div className="flex items-center pt-2">
                    <svg width="32" height="14" viewBox="0 0 32 14">
                        <line x1="8" y1="7" x2="32" y2="7" stroke="#A8200d" strokeWidth="2" strokeDasharray="4 3" />
                        <polygon points="8,3 0,7 8,11" fill="#A8200d" />
                    </svg>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                    <Image
                        src="https://thingsofbrand.com/api/icon/gmail.com"
                        alt="Gmail"
                        width={36}
                        height={36}
                        className="w-9 h-9 object-contain"
                    />
                    <span className="text-[11px] text-gray-600 leading-tight">Gmail</span>
                </div>
            </div>
        </div>
    );
}
