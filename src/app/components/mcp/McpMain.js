import McpAppComp from '@/components/mcpComps/mcpAppComp/McpAppComp';
import McpIndexComp from '@/components/mcpComps/mcpIndexComp/McpIndexComp';
import React from 'react'

const McpMain = (props) => {
    const { data } = props;
    if (data.mcpInfo?.appone) {
        // App-specific MCP page
        return (
            <div className="cont md:gap-20 sm:gap-16 gap-12">
                <McpAppComp
                    appOneDetails={data.appOneDetails}
                    combosData={data.combosData}
                    pageInfo={data.pageInfo}
                    integrationsInfo={data.mcpInfo}
                    faqData={data.faqData}
                    footerData={data.footerData}
                    blogsData={data.blogsData}
                    metaData={data.metaData}
                    apps={data.apps}
                    mcpAppSteps={data.mcpAppSteps}
                    mcpPromptData={data.mcpPromptData}
                    mcpAIIntegrationData={data.mcpAIIntegrationData}
                    navbarData={data.navbarData}
                />
            </div>
        );
    } else {
        // MCP index page
        return (
            <div className="cont md:gap-20 sm:gap-16 gap-12 xl:gap-14">
                <McpIndexComp
                    pageInfo={data.pageInfo}
                    integrationsInfo={data.mcpInfo}
                    footerData={data.footerData}
                    apps={data.apps}
                    blogsData={data.blogsData}
                    categoryData={data.categoryData}
                    categories={data.categories}
                    mcpSteps={data.mcpSteps}
                    faqData={data.faqData}
                    tableData={data.tableData}
                    featuresData={data.featuresData}
                    keyPointData={data.keyPointData}
                    metaData={data.metaData}
                    appCount={data.appCount}
                    navbarData={data.navbarData}
                />
            </div>
        );
    }
}

export default McpMain