export default function ComparisonTable() {
    const rows = [
        {
            label: 'Apps available',
            vs: '2,200+ apps',
            paragon: '130+ apps',
            prismatic: '1,000+ apps',
            zapier: '9,000+ apps',
            build: 'Build each one',
        },
        {
            label: 'Starting cost',
            vs: 'Start Free, then $99/mo',
            paragon: 'Sales call required',
            prismatic: '~$500/mo, no free tier',
            zapier: 'Zapier plan + per-task billing',
            build: 'Development team required',
        },
        {
            label: 'Time to ship',
            vs: '30 minutes',
            paragon: 'Days',
            prismatic: 'Days to weeks',
            zapier: '1–2 hours',
            build: '4–6 weeks per workflow',
        },
        {
            label: 'Full white-label',
            vs: 'Yes',
            paragon: 'Partial',
            prismatic: 'Yes',
            zapier: 'Zapier branding remains',
            build: 'Yes',
        },
        {
            label: 'Multi-step flows as single AI tools',
            vs: 'Yes',
            paragon: 'No',
            prismatic: 'No',
            zapier: 'No',
            build: 'Build it yourself',
        },
    ];

    const cell = 'p-3 text-left align-top border-b border-r';
    const headCell = `${cell} text-sm font-medium text-gray-900 tracking-tight bg-white whitespace-nowrap`;
    const firstCol =
        'sticky left-0 z-[2] bg-white min-w-[148px] font-semibold text-[12px] text-gray-900';

    return (
        <section className="container" id="compare">
            <div className="mb-10">
                <div className="text-xs font-medium text-accent uppercase tracking-wider mb-3">Compare</div>
                <h2 className="text-3xl font-medium text-gray-900">
                    How App Integrations compares
                </h2>
                <p className="text-base text-gray-500"  >
                    Three other embedded iPaaS platforms — and the alternative of building it yourself.
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
                                className={`${headCell} bg-gray-100 border-t-[2.5px] border-t-[#a8200d] text-gray-900`}
                            >
                                viaSocket
                                <br />
                                App Integrations
                            </th>
                            <th scope="col" className={headCell}>
                                Paragon
                            </th>
                            <th scope="col" className={headCell}>
                                Prismatic
                            </th>
                            <th scope="col" className={headCell}>
                                Zapier Embed
                            </th>
                            <th scope="col" className={`${headCell} border-r-0`}>
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
                                <td className={`${cell} bg-gray-100`}>{row.vs}</td>
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
