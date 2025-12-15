import { FiGitBranch, FiServer } from 'react-icons/fi';
import { LuBot, LuWrench, LuPuzzle } from 'react-icons/lu';
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
        Icon: LuPuzzle,
        title: 'integrations',
        description: 'Connect with thousands of apps and services seamlessly',
        url: '/integrations',
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
        <section className="pt-16 border-t custom-border">
            <h2 className="h2 mb-12 mx-8 text-">
                Build Intelligent Automations <br /> <span className="text-accent">via viaSocket</span>
            </h2>

            {/* <div className="mx-auto"> */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 border-t custom-border">
                    {automationItems.map(({ Icon, title, description, url }, index) => {
                        const isMdRowEnd = (index + 1) % 2 === 0; // 2 columns on md
                        const isLgRowEnd = (index + 1) % 3 === 0; // 3 columns on lg
                        const isXlLast = index === automationItems.length - 1; // last item on xl (6 columns)

                        let itemClassName = "p-8 flex flex-col gap-4 hover:bg-gray-100 border-r-0 md:border-r lg:border-r xl:border-r border-b custom-border";

                        if (isMdRowEnd) {
                            itemClassName += " md:border-r-0";
                        }

                        if (isLgRowEnd) {
                            itemClassName += " lg:border-r-0";
                        }

                        if (isXlLast) {
                            itemClassName += " xl:border-r-0";
                        }

                        return (
                            <Link
                                key={title}
                                href={url}
                                className={itemClassName}
                                target="_blank"
                            >
                                <Icon size={30} className="text-gray-500" />
                                <h3 className="text-2xl">{title}</h3>
                                <p>{description}</p>
                            </Link>
                        );
                    })}
                </div>
            {/* </div> */}
        </section>
    );
};

export default IntelligentAutomationsSection;
