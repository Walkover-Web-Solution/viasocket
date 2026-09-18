import McpHeadComp from '../mcpHeadComp/McpHeadComp';
import NavbarServer from '@/app/components/navbar/NavbarServer';
import FooterServer from '@/components/footer/FooterServer';
import McpAppClientComp from './McpAppClientComp';

export default function McpAppComp({
    appOneDetails,
    combosData,
    pageInfo,
    integrationsInfo,
    faqData,
    footerData,
    blogsData,
    metaData,
    apps,
    mcpAppSteps,
    mcpPromptData,
    mcpAIIntegrationData,
    navbarData,
}) {
    return (
        <>
            <div className="cont md:gap-20 sm:gap-16 gap-12">
                <McpHeadComp metaData={metaData} page={'/mcp/appName'} appName={appOneDetails?.name} />
                <div className="cont gap-6">
                    <NavbarServer navbarData={navbarData} utm={'/mcp'} />
                    <McpAppClientComp
                        appOneDetails={appOneDetails}
                        combosData={combosData}
                        pageInfo={pageInfo}
                        integrationsInfo={integrationsInfo}
                        faqData={faqData}
                        blogsData={blogsData}
                        apps={apps}
                        mcpAppSteps={mcpAppSteps}
                        mcpPromptData={mcpPromptData}
                        mcpAIIntegrationData={mcpAIIntegrationData}
                        footer={<FooterServer footerData={footerData} />}
                    />
                </div>
            </div>
        </>
    );
}
