import { FiGitBranch, FiServer } from 'react-icons/fi';
import { LuBot, LuWrench } from 'react-icons/lu';
import { FaCode } from 'react-icons/fa6';
import Link from 'next/link';

const automationItems = [
    {
        Icon: FiGitBranch,
        title: 'Automations',
        description: 'Build powerful automation workflows',
        url: '/workflow-automations',
    },
    {
        Icon: LuBot,
        title: 'AI agents',
        description: 'Deploy intelligent agents that work autonomously',
        url: '/integrations/category/ai-tools',
    },
    {
        Icon: FiServer,
        title: 'MCP',
        description: 'Model Context Protocol for advanced AI integrations',
        url: '/mcp',
    },
    {
        Icon: LuWrench,
        title: 'Plugin Builder',
        description: 'Create custom plugins tailored to your needs',
        url: '/help/plugin-builder',
    },
    {
        Icon: FaCode,
        title: 'Embed',
        description: 'Integrate viaSocket directly into your applications',
        url: '/embed',
    },
];

const IntelligentAutomationsSection = () => {
    return (
        <section className="mt-16 container">
            <h2 className="h2 mb-12 mx-8 text-">
                Build Intelligent Automations <br /> <span className="text-accent">via viaSocket</span>
            </h2>

            <div className="mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 border border-gray-200 divide-y sm:divide-y-0 sm:divide-x overflow-hidden border-b-0 border-x-0">
                    {automationItems.map(({ Icon, title, description, url }) => (
                        <Link
                            key={title}
                            href={url}
                            className="p-8 flex flex-col gap-4 justify-between hover:bg-gray-100"
                            target='_blank'
                        >
                            <Icon size={30} className="text-gray-500" />
                            <h3 className="text-2xl">{title}</h3>
                            <p>{description}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default IntelligentAutomationsSection;
