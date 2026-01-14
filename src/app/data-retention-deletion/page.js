import Footer from '@/components/footer/footer';
import NavbarServer from '../components/navbar/NavbarServer';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import { getDataRetentionDeletionPageData } from '../lib/data';

export const runtime = 'edge';

export async function generateMetadata() {
    const { metaData } = await getDataRetentionDeletionPageData();

    return {
        title: metaData?.title || 'Data Retention and Deletion Policy - viaSocket',
        description: metaData?.description || 'Data Retention and Deletion Policy - viaSocket',
        keywords: metaData?.keywords || '',
        openGraph: {
            title: metaData?.title || 'Data Retention and Deletion Policy - viaSocket',
            description: metaData?.description || 'Data Retention and Deletion Policy - viaSocket',
            images: metaData?.image ? [{ url: metaData.image }] : undefined,
        },
        twitter: {
            card: 'summary_large_image',
            title: metaData?.title,
            description: metaData?.description,
            images: metaData?.image ? [metaData.image] : undefined,
        },
    };
}

export default async function DataRetentionDeletionPolicyPage() {
    const { footerData, metaData, navbarData } = await getDataRetentionDeletionPageData();

    return (
        <>
            <MetaHeadComp metaData={metaData} page={'/data-retention-deletion-policy'} />
            <NavbarServer navbarData={navbarData} utm={'/data-retention-deletion-policy'} />

            <div className="container mb-4 mt-12 flex flex-col gap-16 global-top-space">
                <h1 className="h1">
                    <span className="text-accent">Data</span> Retention and Deletion Policy
                </h1>
                <div data-custom-class="body" className="cont gap-6 bg-white p-12 border custom-border">
                    <span data-custom-class="body_text">
                        At viaSocket, we prioritize the security and privacy of your data. This Data Retention and
                        Deletion Policy outlines how we manage, retain, and delete your data to ensure transparency and
                        clarity in our practices.
                    </span>
                    <div>
                        <strong>1. Scope of Policy</strong>
                        <p data-custom-class="body_text">
                            This policy applies to all data processed by viaSocket related to workflows and integrations
                            created by our users
                        </p>
                    </div>
                    <div className="flex flex-col gap-3">
                        <strong>2. Data Retention Practices</strong>
                        <p data-custom-class="body_text">
                            <strong>Workflow Content</strong>
                            <br />
                            Workflow Content refers to the data transferred through workflows during execution. We do
                            not store or retain this data. It is temporarily processed only to integrate apps and
                            facilitate workflow execution.
                        </p>
                        <p data-custom-class="body_text">
                            <strong>Workflow Logs</strong>
                            <br />
                            Workflow Logs include metadata like workflow names, execution dates, times, and statuses.
                            These logs are retained for a period of 15 days for troubleshooting purposes and are
                            archived after this period.
                        </p>
                        <p data-custom-class="body_text">
                            <strong>Workflow Metrics</strong>
                            <br />
                            Workflow Metrics include aggregated statistics about workflows, such as the number of
                            invocations. Only statistical data is retained, and no detailed workflow content or data is
                            stored.
                        </p>
                    </div>
                    <div>
                        <strong>3. Data Deletion Process</strong>
                        <p data-custom-class="body_text">
                            To request the deletion of your data, you can follow these steps:
                        </p>
                        <ul className="list-disc pl-4">
                            <li>
                                Contact Support: Send an email to{' '}
                                <a className="text-link" href="mailto:support@viasocket.com">
                                    support@viasocket.com
                                </a>{' '}
                                with the subject line "Data Deletion Request."
                            </li>
                            <li>
                                Provide Information: Include the following details in your request:
                                <ul className="list-disc pl-4">
                                    <li>Registered email address</li>
                                    <li>Workspace name</li>
                                    <li>Brief description of the data to be deleted</li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <strong>4. Verification Process</strong>
                        <p data-custom-class="body_text">
                            For security and to prevent unauthorized data deletion requests, we may ask for:
                        </p>
                        <ul className="list-disc pl-4">
                            <li>Verification of your identity.</li>
                            <li>Confirmation of workspace ownership linked to the data request.</li>
                        </ul>
                    </div>
                    <div>
                        <strong>5. Data Deletion Timeline</strong>
                        <p data-custom-class="body_text">Once your request is verified:</p>
                        <ul className="list-disc pl-4">
                            <li>We will immediately delete the specified data.</li>
                            <li>You will receive a notification confirming the deletion completion.</li>
                        </ul>
                    </div>
                    <div>
                        <strong>6. Retention Periods</strong>
                        <p data-custom-class="body_text">
                            Workflow Data: Retained for 7 days and then archived for an additional 7 days. Archived data
                            is not actively used in the system.
                        </p>
                        <p data-custom-class="body_text">
                            If no deletion request is made, data is retained as per our Privacy Policy to enhance our
                            services and meet legal obligations.
                        </p>
                    </div>
                    <div>
                        <strong>7. Data Deletion Limitations</strong>
                        <p data-custom-class="body_text">
                            Certain data may not be eligible for deletion in cases where:
                        </p>
                        <ul className="list-disc pl-4">
                            <li>It is required to comply with legal obligations.</li>
                            <li>It is necessary for resolving disputes or enforcing agreements.</li>
                            <li>It forms part of anonymized datasets that cannot be traced back to you.</li>
                        </ul>
                    </div>
                    <div>
                        <strong>8. Impact of Data Deletion</strong>
                        <p data-custom-class="body_text">After data deletion:</p>
                        <ul className="list-disc pl-4">
                            <li>The data cannot be recovered.</li>
                            <li>Any workflows or integrations relying on the deleted data will no longer function.</li>
                            <li>Historical reports and analytics may be affected.</li>
                        </ul>
                    </div>
                    <div>
                        <strong>9. Contact Information</strong>
                        <p data-custom-class="body_text">
                            For any questions or concerns about this policy, please contact us at{' '}
                            <a className="text-link" href="mailto:support@viasocket.com">
                                support@viasocket.com
                            </a>
                            .
                        </p>
                    </div>
                </div>
            </div>
            <div className="container py-16">
                <Footer footerData={footerData} />
            </div>
        </>
    );
}
