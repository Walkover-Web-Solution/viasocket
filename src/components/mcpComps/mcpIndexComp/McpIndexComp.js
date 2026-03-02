import McpIndexClientComp from './McpIndexClientComp';
import NavbarServer from '@/app/components/navbar/NavbarServer';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import Script from 'next/script';

export default function McpIndexComp({
    pageInfo,
    integrationsInfo,
    footerData,
    apps,
    blogsData,
    categoryData,
    categories,
    mcpSteps,
    faqData,
    tableData,
    featuresData,
    keyPointData,
    metaData,
    appCount,
    navbarData,
}) {
    {
        return (
            <div className="cont pb-4 lg:gap-12 md:gap-12 gap-12">
                <MetaHeadComp metaData={metaData} page={'/mcp'} />
                <Script id="twitter-conversion-tracking" strategy="afterInteractive">
                    {`
                        twq('event', 'tw-pnuam-pnugc', {
                            email_address: null,
                            phone_number: null
                        });
                    `}
                </Script>

                <NavbarServer navbarData={navbarData} utm={'/mcp'} />
                <McpIndexClientComp
                    pageInfo={pageInfo}
                    integrationsInfo={integrationsInfo}
                    footerData={footerData}
                    apps={apps}
                    blogsData={blogsData}
                    categoryData={categoryData}
                    categories={categories}
                    mcpSteps={mcpSteps}
                    faqData={faqData}
                    tableData={tableData}
                    featuresData={featuresData}
                    keyPointData={keyPointData}
                    appCount={appCount}
                />
            </div>
        );
    }
}