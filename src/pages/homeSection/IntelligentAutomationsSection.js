import { FiServer } from 'react-icons/fi';
import { LuBot, LuPuzzle } from 'react-icons/lu';
import { FaCode } from 'react-icons/fa6';
import Link from 'next/link';
const IntelligentAutomationsSection = ({ appCount }) => {
    const automationItems = [
        {
            Icon: LuPuzzle,
            title: 'Automations',
            description: 'Automate advanced workflows across ' + (+appCount + 300) + '+ apps',
            url: '/workflow-automations',
        },
        {
            Icon: LuBot,
            title: 'AI agents',
            description: 'Create any AI assistant in minutes',
            url: '/integrations/category/ai-tools',
        },
        {
            Icon: FiServer,
            title: 'MCP',
            description: 'Connect your AI to any app',
            url: '/mcp',
        },
        {
            Icon: FaCode,
            title: 'Embed',
            description: 'One SDK, thousands of App Integrations',
            url: '/embed',
        },
    ];

    return (
        <section className="border-t custom-border pt-16">
            <h2 className="h2 mb-12 mx-8 text-">
                Build Intelligent Automations <br /> <span className="text-accent">via viaSocket</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t custom-border">
                {automationItems.map(({ Icon, title, description, url }, index) => {
                    const mdBorderClass = index === 1 ? 'md:border-r-0' : 'md:border-r';

                    return (
                        <Link
                            key={title}
                            href={url}
                            className={`p-8 flex flex-col gap-4 hover:bg-gray-100 border-r-0 lg:border-r xl:border-r border-b custom-border last:border-r-0 ${mdBorderClass}`}
                            target="_blank"
                        >
                            <Icon size={30} className="text-gray-500" />
                            <h3 className="text-2xl">{title}</h3>
                            <p>{description}</p>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
};

export default IntelligentAutomationsSection;
