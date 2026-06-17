export default function EmbedSetup() {
    return (
        <div className="container">
            <div className="border bg-white p-8 md:p-12">
                <h2 className="h2">Set up the embed in two steps</h2>
                <p className="sub__h1 mt-6">
                    Create a user token and add one script tag. Your users can start connecting apps in minuts
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                    <div className="border p-6 flex flex-col h-full bg-[#FAFAFA]">
                        <span className="text-xs font-bold tracking-wider text-accent mb-3">STEP 01</span>
                        <h3 className="text-2xl font-medium">Generate the embed token</h3>
                        <p className="text-gray-600 mb-4">Generate a secure token for each user.</p>
                        <div className="bg-[#0B1220] overflow-hidden flex flex-col flex-1 mt-auto">
                            <pre className="px-6 py-5 text-[12px] leading-6 font-mono overflow-x-auto text-gray-200 flex-1">
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
                                <span className="text-[#86efac]">&quot;unique_identifier&quot;</span>:{' '}
                                <span className="text-[#86efac]">&quot;unique_user_id&quot;</span>
                                {'\n'}
                                {'}'}
                            </pre>
                            <div className="px-6 py-2 text-sm tracking-wider text-gray-500 border-t border-white/5">
                                JSON PAYLOAD
                            </div>
                        </div>
                    </div>

                    <div className="border p-6 flex flex-col h-full bg-[#FAFAFA]">
                        <span className="text-xs font-bold tracking-wider text-accent mb-3">STEP 02</span>
                        <h3 className="text-2xl font-medium">Add the embed script</h3>
                        <p className="text-gray-600 mb-4">Add the script to your application and launch the embed anywhere in your UI.</p>
                        <div className="bg-[#0B1220] overflow-hidden flex flex-col flex-1 mt-auto">
                            <pre className="px-6 py-5 text-[12px] leading-6 font-mono overflow-x-auto text-gray-200 flex-1">
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
                            <div className="px-6 py-2 text-sm tracking-wider text-gray-500 border-t border-white/5">
                                HTML
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
