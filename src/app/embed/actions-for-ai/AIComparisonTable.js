export default function AIComparisonTable({ appCount = 0 }) {
    const rows = [
        {
            label: 'Apps available',
            vs: `${appCount + 300}+ apps`,
            paragon: '~500 toolkits',
            prismatic: '1,000+ actions',
            zapier: '9,000+ apps',
            build: 'Build each one',
        },
        {
            label: 'Starting cost',
            vs: 'Free, then $99/mo',
            paragon: 'Free, then $29/mo',
            prismatic: 'Sales call required',
            zapier: 'Zapier plan + 2 tasks per call',
            build: 'Development team required',
        },
        {
            label: 'Time to ship',
            vs: '30 minutes',
            paragon: 'Hours (SDK + framework wiring)',
            prismatic: 'Days (SDK + integration config)',
            zapier: '1–2 hours',
            build: '4–6 weeks per workflow',
        },
        {
            label: 'End-user-built workflows as AI tools',
            vs: 'Yes, in a visual builder',
            paragon: 'Developer-built only (Recipes via Python)',
            prismatic: 'Developer-built only',
            zapier: 'No, single actions only',
            build: 'Build it yourself',
        },
        {
            label: 'Built for embedded use',
            vs: 'Yes, single script tag, JWT auth',
            paragon: 'Partial, SDK-led, not embed-led',
            prismatic: 'Yes, embedded UI components',
            zapier: 'No, requires user-side Zapier accounts',
            build: 'Yes',
        },
    ];

    const cell = 'p-3 text-left align-top border-b border-r';
    const headCell = `${cell} text-sm font-medium text-gray-900 tracking-tight whitespace-nowrap`;
    const firstCol = 'sticky left-0 z-[2] bg-white min-w-[148px] font-semibold text-sm text-gray-900';

    return (
        <section className="container" id="compare">
            <div className="mb-10">
                <div className="text-xs font-medium text-accent uppercase tracking-wider mb-3">Compare</div>
                <h2 className="text-2xl md:text-3xl font-medium text-gray-900">How Actions for AI compares</h2>
                <p className="text-base text-gray-500">
                    Three other embedded tool platforms, and the alternative of building it yourself.
                </p>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full min-w-[820px] border-collapse text-sm leading-[1.55] text-gray-700">
                    <thead>
                        <tr>
                            <th
                                scope="col"
                                className={`${cell} ${firstCol} text-xs font-medium text-gray-500 tracking-wider uppercase`}
                            ></th>
                            <th
                                scope="col"
                                className={`${headCell} !bg-[#fef2f1] border-t-[2.5px] border-t-[#a8200d] !text-accent`}
                            >
                                viaSocket
                                <br />
                                Actions for AI
                            </th>
                            <th scope="col" className={`${headCell} bg-white`}>
                                Composio
                            </th>
                            <th scope="col" className={`${headCell} bg-white`}>
                                Paragon ActionKit
                            </th>
                            <th scope="col" className={`${headCell} bg-white`}>
                                Zapier MCP{' '}
                            </th>
                            <th scope="col" className={`${headCell} bg-white border-r-0`}>
                                Build in-house
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, i) => (
                            <tr key={i} className="even:bg-gray-50">
                                <th scope="row" className={`${cell} ${firstCol}`}>
                                    {row.label}
                                </th>
                                <td className={`${cell} bg-[#fef2f1]`}>{row.vs}</td>
                                <td className={`${cell}`}>{row.paragon}</td>
                                <td className={`${cell}`}>{row.prismatic}</td>
                                <td className={`${cell}`}>{row.zapier}</td>
                                <td className={`${cell} border-r-0`}>{row.build}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
