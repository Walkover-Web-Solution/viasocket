import Image from 'next/image';

export default function AppFlowDiagram() {
    return (
        <div className="w-full h-full flex items-center justify-center bg-white p-4 select-none">
            {/* Google Sheets Card */}
            <div className="w-[100px] h-[100px] p-2 border rounded bg-white flex flex-col items-center justify-center gap-2">
                <div className="min-w-12 min-h-12 rounded bg-[#FFF5F0] flex items-center justify-center overflow-hidden">
                    <Image src="https://stuff.thingsofbrand.com/google.com/images/img4_googlesheet.png" alt="Google Sheets" width={32} height={32} className="object-contain" />
                </div>
                <span className="text-[10px] font-medium text-gray-700">Google Sheets</span>
            </div>

            {/* Connector 1 */}
            <div className="flex items-center -mx-1 z-10">
                <div className="w-3 h-3 rounded-full border bg-white"></div>
                <div className="w-10 h-0.5 bg-[#FFB89A]"></div>
                <div className="w-3 h-3 rounded-full border bg-white"></div>
            </div>

            {/* Slack Card */}
            <div className="w-[100px] h-[100px] p-2 border rounded bg-white flex flex-col items-center justify-center gap-2">
                <div className="w-12 h-12 rounded bg-[#FFF5F0] flex items-center justify-center overflow-hidden">
                    <Image src="https://stuff.thingsofbrand.com/slack.com/images/img668216333e_slack.jpg" alt="Slack" width={32} height={32} className="object-contain" />
                </div>
                <span className="text-[10px] font-medium text-gray-700">Slack</span>
            </div>

            {/* Connector 2 */}
            <div className="flex items-center -mx-1 z-10">
                <div className="w-3 h-3 rounded-full border bg-white"></div>
                <div className="w-10 h-0.5 bg-[#FFB89A]"></div>
                <div className="w-3 h-3 rounded-full border bg-white"></div>
            </div>

            {/* Notion Card */}
            <div className="w-[100px] h-[100px] p-2 border rounded bg-white flex flex-col items-center justify-center gap-2">
                <div className="w-12 h-12 rounded bg-[#FFF5F0] flex items-center justify-center overflow-hidden">
                    <Image src="https://stuff.thingsofbrand.com/notion.so/images/img667018e3f8_notion.jpg" alt="Notion" width={32} height={32} className="object-contain" />
                </div>
                <span className="text-[10px] font-medium text-gray-700">Notion</span>
            </div>
        </div>
    );
}
