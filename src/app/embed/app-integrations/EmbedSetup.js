export default function EmbedSetup() {
    return (
        <div className="container">
            <div className="max-w-[680px] mb-10">
                <h2 className="h2 mb-2">
                    Set up the embed in two steps
                </h2>
                <p className="text-[15px] text-[#6b7280] leading-[1.7] font-normal">
                    Sign a JWT on your server, then drop a single script tag with a launch button into your frontend. No
                    OAuth boilerplate to wire, no UI to build.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#f9fafb] border border-[#e5e7eb] pt-8 px-8 flex flex-col gap-2 overflow-hidden">
                    <span className="text-[11px] font-bold tracking-[1.4px] uppercase text-[#2563eb] leading-none mb-2">
                        Step 01
                    </span>
                    <h3 className="text-2xl font-medium text-[#0f0f0f] tracking-[-0.4px] leading-[1.25] mb-1">
                        Generate the embed token
                    </h3>
                    <p className="text-sm text-[#6b7280] leading-[1.65] font-normal mb-7 max-w-[500px]">
                        Sign a JWT server-side with your org, project and the user&apos;s ID. The user ID scopes the
                        embed to that one person — their connections, their flows, their data.
                    </p>
                    <div className="bg-[#0d0d14] flex flex-col -mx-8 min-h-[375px] max-h-[375px]">
                        <pre className="font-mono text-[13px] leading-[1.85] text-[#e5e7eb] flex-1 overflow-x-auto m-0 py-[22px] px-7 whitespace-pre">
                            <span className="text-[#86efac] opacity-55 italic">
                                {'// Sign this payload with your access key (HS256)'}
                            </span>
                            {'\n'}
                            <span className="text-[#86efac] opacity-55 italic">
                                {'// (generate JWT on your backend)'}
                            </span>
                            {'\n'}
                            {'\n'}
                            {'\n'}
                            {'{'}
                            {'\n'} <span className="text-[#86efac]">&quot;org_id&quot;</span>:{' '}
                            <span className="text-[#86efac]">&quot;your_org_id&quot;</span>,{'\n'}{' '}
                            <span className="text-[#86efac]">&quot;project_id&quot;</span>:{' '}
                            <span className="text-[#86efac]">&quot;your_project_id&quot;</span>,{'\n'}{' '}
                            <span className="text-[#86efac]">&quot;user_id&quot;</span>:{' '}
                            <span className="text-[#86efac]">&quot;unique_user_id&quot;</span>
                            {'\n'}
                            {'}'}
                        </pre>
                        <div className="flex items-center py-[13px] px-7 bg-[#08111c] border-t border-white/[0.06]">
                            <span className="text-[10.5px] font-bold tracking-[1.4px] uppercase text-white/[0.55] font-sans">
                                JSON Payload
                            </span>
                        </div>
                    </div>
                </div>

                <div className="bg-[#f9fafb] border border-[#e5e7eb] pt-8 px-8 flex flex-col gap-2 overflow-hidden">
                    <span className="text-[11px] font-bold tracking-[1.4px] uppercase text-[#2563eb] leading-none mb-2">
                        Step 02
                    </span>
                    <h3 className="text-2xl font-medium text-[#0f0f0f] tracking-[-0.4px] leading-[1.25] mb-1">
                        Add the embed script
                    </h3>
                    <p className="text-sm text-[#6b7280] leading-[1.65] font-normal mb-7 max-w-[500px]">
                        Paste the script tag and a launch button anywhere in your frontend. The embed opens as a modal,
                        slider, or full-screen — your choice.
                    </p>
                    <div className="bg-[#0d0d14] flex flex-col -mx-8 max-h-[375px]">
                        <pre className="font-mono text-[13px] leading-[1.85] text-[#e5e7eb] flex-1 overflow-x-auto m-0 py-[22px] px-7 whitespace-pre">
                            <span className="text-[#86efac] opacity-55 italic">
                                &lt;!-- Paste into your frontend --&gt;
                            </span>
                            {'\n'}
                            {'\n'}
                            <span className="text-[#fb7185]">&lt;button</span>{' '}
                            <span className="text-[#fbbf24]">id</span>=
                            <span className="text-[#86efac]">&quot;viasocket-embed-open-button&quot;</span>
                            {'\n'} <span className="text-[#fbbf24]">onclick</span>=
                            <span className="text-[#86efac]">&quot;openViasocket()&quot;</span>
                            <span className="text-[#fb7185]">&gt;</span>
                            {'\n'} Open Integrations
                            {'\n'}
                            <span className="text-[#fb7185]">&lt;/button&gt;</span>
                            {'\n'}
                            {'\n'}
                            <span className="text-[#fb7185]">&lt;script</span>
                            {'\n'} <span className="text-[#fbbf24]">id</span>=
                            <span className="text-[#86efac]">&quot;viasocket-embed-main-script&quot;</span>
                            {'\n'} <span className="text-[#fbbf24]">src</span>=
                            <span className="text-[#86efac]">
                                &quot;https://embed.viasocket.com/prod-embedcomponent.js&quot;
                            </span>
                            {'\n'} <span className="text-[#fbbf24]">embedToken</span>=
                            <span className="text-[#86efac]">&quot;YOUR_JWT_TOKEN&quot;</span>
                            <span className="text-[#fb7185]">&gt;</span>
                            {'\n'}
                            <span className="text-[#fb7185]">&lt;/script&gt;</span>
                        </pre>
                        <div className="flex items-center py-[13px] px-7 bg-[#08111c] border-t border-white/[0.06]">
                            <span className="text-[10.5px] font-bold tracking-[1.4px] uppercase text-white/[0.55] font-sans">
                                HTML
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
