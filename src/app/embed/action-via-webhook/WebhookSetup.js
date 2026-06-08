export default function WebhookSetup() {
    return (
        <section id="how" className="sec-white container">
            <div className="max-w-[680px] mb-10">
                <h2 className="text-4xl font-medium tracking-tight leading-tight text-gray-900 mb-3.5">
                    Set up the embed in two steps
                </h2>
                <p className="text-[15px] text-gray-500 leading-relaxed font-normal">
                    Sign a JWT on your server to get a user-scoped webhook URL, then POST your events to it. No OAuth
                    boilerplate, no webhook infrastructure to maintain.
                </p>
            </div>

            <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
                {/* Card 1: Generate JWT / get webhook URL */}
                <div className="bg-white border border-gray-200 p-8 pt-8 flex flex-col gap-2 overflow-hidden">
                    <span className="text-[11px] font-bold tracking-[1.4px] uppercase text-green-600 leading-none mb-2">
                        Step 01
                    </span>
                    <h3 className="text-2xl font-medium text-gray-900 tracking-tight leading-snug mb-1">
                        Get the user's webhook URL
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed font-normal mb-7 max-w-[500px]">
                        Sign a JWT server-side with your org, project and a unique identifier to generate a per-user
                        webhook endpoint.
                    </p>
                    <div className="bg-[#0d0d14] flex flex-col -mx-8 min-h-[280px]">
                        <pre className="font-mono text-[13px] leading-[1.85] text-gray-200 flex-1 overflow-x-auto m-0 p-5 px-7">
                            <span className="text-green-300/55 italic">{'// Sign this payload with your secret key'}</span>
                            {'\n'}
                            <span className="text-green-300/55 italic">{'// (generate JWT on your backend)'}</span>
                            {'\n\n\n'}
                            {'{'}\n{"  "}
                            <span className="text-green-300">&quot;org_id&quot;</span>:{"            "}
                            <span className="text-green-300">&quot;57716&quot;</span>,\n{"  "}
                            <span className="text-green-300">&quot;project_id&quot;</span>:{"        "}
                            <span className="text-green-300">&quot;projA3H7YIf4&quot;</span>,\n{"  "}
                            <span className="text-green-300">&quot;unique_identifier&quot;</span>:{" "}
                            <span className="text-green-300">&quot;&lt;unique_id_per_user&gt;&quot;</span>\n{'}'}\n\n
                            <span className="text-green-300/55 italic">{'// Webhook URL format:'}</span>
                            {'\n'}
                            <span className="text-green-300/55 italic">{'// https://flow.viasocket.com/webhook/{token}'}</span>
                        </pre>
                        <div className="flex items-center px-7 py-3 bg-[#08111c] border-t border-white/[0.06]">
                            <span className="text-[10.5px] font-bold tracking-[1.4px] uppercase text-white/55 font-sans">
                                JSON Payload
                            </span>
                        </div>
                    </div>
                </div>

                {/* Card 2: POST to webhook */}
                <div className="bg-white border border-gray-200 p-8 pt-8 flex flex-col gap-2 overflow-hidden">
                    <span className="text-[11px] font-bold tracking-[1.4px] uppercase text-green-600 leading-none mb-2">
                        Step 02
                    </span>
                    <h3 className="text-2xl font-medium text-gray-900 tracking-tight leading-snug mb-1">
                        POST your event
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed font-normal mb-7 max-w-[500px]">
                        Send a plain HTTP POST from your server with any JSON payload. viaSocket routes it to every
                        automation the user has set up.
                    </p>
                    <div className="bg-[#0d0d14] flex flex-col -mx-8 min-h-[280px]">
                        <pre className="font-mono text-[13px] leading-[1.85] text-gray-200 flex-1 overflow-x-auto m-0 p-5 px-7">
                            <span className="text-green-300/55 italic">{'# Trigger from anywhere on your server'}</span>
                            {'\n\n\n'}
                            <span className="text-rose-400">curl</span> -X POST \n{"  "}
                            <span className="text-green-300">&quot;https://flow.viasocket.com/webhook/YOUR_TOKEN&quot;</span> \n{"  "}
                            -H <span className="text-amber-400">&apos;Content-Type: application/json&apos;</span> \n{"  "}
                            -d{' '}
                            <span className="text-green-300">
                                &apos;{"\n"}    &quot;event&quot;: &quot;order.placed&quot;,{"\n"}    &quot;user_id&quot;: &quot;usr_123&quot;,
                                {"\n"}    &quot;amount&quot;: 49.99{"\n"}  &apos;
                            </span>
                        </pre>
                        <div className="flex items-center px-7 py-3 bg-[#08111c] border-t border-white/[0.06]">
                            <span className="text-[10.5px] font-bold tracking-[1.4px] uppercase text-white/55 font-sans">
                                cURL
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
