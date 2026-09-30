const GROUPS = [
    {
        title: 'Understand it',
        links: [
            ['#why', 'Why this exists'],
            ['#what', 'What viaSocket does'],
            ['#benefits', 'Why use it'],
        ],
    },
    {
        title: 'Build it',
        links: [
            ['#ways', 'Two ways to set up'],
            ['#s1', '1. Create an embed'],
            ['#s2', '2. Install the SDK'],
            ['#s3', '3. Sign an embed token'],
            ['#s4', '4. Find the app'],
            ['#s5', '5. Connect the app'],
            ['#s6', '6. Enable the app'],
            ['#s7', '7. Choose an action'],
            ['#s8', '8. Build inputData'],
            ['#s9', "9. Get the app's values"],
            ['#s10', '10. Run the action'],
        ],
    },
];

export function Toc() {
    return (
        <nav aria-label="On this page" className="hidden lg:block sticky top-0 py-10 max-h-screen overflow-y-auto">
            {GROUPS.map((g) => (
                <div key={g.title}>
                    <h2 className="font-docs-mono text-[11px] tracking-[0.1em] uppercase text-docs-muted m-0 mb-3 font-medium">{g.title}</h2>
                    <ol className="list-none m-0 mb-5 p-0 flex flex-col gap-[7px]">
                        {g.links.map(([href, label]) => (
                            <li key={href}>
                                <a href={href} className="text-docs-muted no-underline text-[13.5px] leading-[1.4] block border-l-2 border-docs-rule pl-[11px] hover:text-docs-accent hover:border-docs-accent">
                                    {label}
                                </a>
                            </li>
                        ))}
                    </ol>
                </div>
            ))}
        </nav>
    );
}
