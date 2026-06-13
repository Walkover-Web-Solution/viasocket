export default function WebhookSetup() {
    return (
        <div className="container">
            <div className="border bg-white p-8 md:p-12">
                <h2 className="h2">Set up the embed in two steps</h2>
                <p className="sub__h1 mt-6">
                    Generate a webhook URL for each user and sent events from your application. That's it.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                    <div className="border p-6 flex flex-col h-full bg-[#FAFAFA]">
                        <span className="text-xs font-bold tracking-wider text-accent mb-3">STEP 01</span>
                        <h3 className="text-2xl font-medium">Get the user's webhook URL</h3>
                        <p className="text-gray-600 mb-4">Genrate a unique webhook URL for each user.</p>
                        <div className="bg-[#0B1220] overflow-hidden flex flex-col flex-1 mt-auto">
                            <pre className="px-6 py-5 text-[12px] leading-6 font-mono overflow-x-auto text-gray-200 flex-1">
                                <span className="text-[#86efac] opacity-55 italic">
                                    {'// Sign this payload with your secret key'}
                                </span>
                                {'\n'}
                                <span className="text-[#86efac] opacity-55 italic">{'// (generate JWT on your backend)'}</span>
                                {'\n\n\n'}
                                {'{'}
                                {'\n'} <span className="text-[#86efac]">&quot;org_id&quot;</span>:{' '}
                                <span className="text-[#86efac]">&quot;57716&quot;</span>,{'\n'} <span className="text-[#86efac]">&quot;project_id&quot;</span>:{' '}
                                <span className="text-[#86efac]">&quot;projA3H7YIf4&quot;</span>,{'\n'} <span className="text-[#86efac]">&quot;unique_identifier&quot;</span>:{' '}
                                <span className="text-[#86efac]">&quot;&lt;unique_id_per_user&gt;&quot;</span>
                                {'\n'}
                                {'}'}
                                {'\n'}
                                {'\n'}
                                <span className="text-[#86efac] opacity-55 italic">{'// Webhook URL format:'}</span>
                                {'\n'}
                                <span className="text-[#86efac] opacity-55 italic">
                                    {'// https://flow.viasocket.com/webhook/{token}'}
                                </span>
                            </pre>
                            <div className="px-6 py-2 text-[11px] tracking-wider text-gray-500 border-t border-white/5">
                                JSON PAYLOAD
                            </div>
                        </div>
                    </div>

                    <div className="border p-6 flex flex-col h-full bg-[#FAFAFA]">
                        <span className="text-xs font-bold tracking-wider text-accent mb-3">STEP 02</span>
                        <h3 className="text-2xl font-medium">POST your event</h3>
                        <p className="text-gray-600 mb-4">POST data to the webhook URL and trigger connected workflows.</p>
                        <div className="bg-[#0B1220] overflow-hidden flex flex-col flex-1 mt-auto">
                            <pre className="px-6 py-5 text-[12px] leading-6 font-mono overflow-x-auto text-gray-200 flex-1">
                                <span className="text-[#86efac] opacity-55 italic">{'# Trigger from anywhere on your server'}</span>
                                {'\n\n\n'}
                                <span className="text-red-400">curl</span> -X POST {'\n'}  <span className="text-[#86efac]">
                                    &quot;https://flow.viasocket.com/webhook/YOUR_TOKEN&quot;
                                </span>
                                {'\n'}  -H <span className="text-amber-300">&apos;Content-Type: application/json&apos;</span>{'\n'}  -d{' '}
                                <span className="text-[#86efac]">
                                    &apos;{'\n'} &quot;event&quot;: &quot;order.placed&quot;,{'\n'} &quot;user_id&quot;:
                                    &quot;usr_123&quot;,
                                    {'\n'} &quot;amount&quot;: 49.99{'\n'} &apos;
                                </span>
                            </pre>
                            <div className="px-6 py-2 text-[11px] tracking-wider text-gray-500 border-t border-white/5">
                                cURL
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
