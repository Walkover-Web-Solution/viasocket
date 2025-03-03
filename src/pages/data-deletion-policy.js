import Footer from '@/components/footer/footer';
import Navbar from '@/components/navbar/navbar';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import { getFooterData, getMetaData, getNavData } from '@/utils/getData';
import { FOOTER_FIELDS, METADATA_FIELDS, NAVIGATION_FIELDS } from '@/const/fields';

export const runtime = 'experimental-edge';

export async function getStaticProps() {
    const navData = await getNavData(NAVIGATION_FIELDS);
    const footerData = await getFooterData(FOOTER_FIELDS);
    const metaData = await getMetaData(METADATA_FIELDS, `filter=name='/data-deletion-policy'`);
    return {
        props: {
            navData: navData || [],
            footerData: footerData || [],
            metaData: (metaData?.length > 0 && metaData[0]) || {},
        },
    };
}

export default function DataDeletionPolicy({ navData, footerData, metaData }) {
    return (
        <>
            <MetaHeadComp metaData={metaData} page={'/data-deletion-policy'} />

            <div className="container">
                <Navbar navData={navData} utm={'/data-deletion-policy'} />
            </div>
            <div className="container mb-4 mt-28">
                <div data-custom-class="body" className="cont gap-6">
                    <div>
                        <strong>
                            <h1 style={{ fontSize: '26px' }}>
                                <span data-custom-class="title">Data Deletion Policy</span>
                            </h1>
                        </strong>
                        <span data-custom-class="body_text">
                            At viaSocket, we respect your privacy and are committed to ensuring that your data is
                            handled securely and transparently. This Data Deletion Policy outlines our practices
                            regarding data usage, retention, and deletion to give you complete clarity.
                        </span>
                    </div>

                    <div></div>
                    <div>
                        <strong>1. Scope of Policy</strong>
                        <p data-custom-class="body_text">
                            This policy applies to all data processed by viaSocket in connection with workflows and
                            integrations created by our users.
                        </p>
                    </div>
                    <div className="flex flex-col gap-3">
                        <strong>2. Our Data Practices</strong>
                        <p data-custom-class="body_text">
                            <strong>Workflow Content</strong>
                            <br />
                            Workflow Content refers to the data transferred in and out of workflows during their
                            execution. We do not store or access this data. It is temporarily processed solely for the
                            purpose of integrating apps and enabling workflows.
                        </p>
                        <p data-custom-class="body_text">
                            <strong>Workflow Logs</strong>
                            <br />
                            Workflow Logs include metadata about workflows, such as the workflow name, dates and times
                            of workflow runs, and workflow status. These logs are retained for 7 days to allow
                            troubleshooting and are then archived.
                        </p>
                        <p data-custom-class="body_text">
                            <strong>Workflow Metrics</strong>
                            <br />
                            Workflow Metrics consist of statistical metadata about workflows, such as the count of
                            workflow invocations. We retain only this aggregate statistical information and do not store
                            any detailed data or content related to workflows.
                        </p>
                        <p data-custom-class="body_text">
                            If you request data deletion, all relevant logs and content are instantly removed, and you
                            are notified immediately upon completion.
                        </p>
                    </div>
                    <div>
                        <strong>3. How to Request Data Deletion</strong>
                        <p data-custom-class="body_text">To request the deletion of your data, you may:</p>
                        <ul className="list-disc pl-4">
                            <li>
                                Contact Support: Send an email to{' '}
                                <a className="text-link" href="mailTo:support@viasocket.com">
                                    support@viasocket.com
                                </a>{' '}
                                with the subject line "Data Deletion Request."
                            </li>
                            <li>
                                Provide Information: Include the following details in your email:
                                <ul className="list-disc pl-4">
                                    <li>Your registered email address</li>
                                    <li>Workspace name</li>
                                    <li>A brief description of the data you wish to delete</li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <strong>4. Verification Process</strong>
                        <p data-custom-class="body_text">
                            To ensure the security of your account and prevent unauthorized requests, we may:
                        </p>
                        <ul className="list-disc pl-4">
                            <li>Request verification of your identity</li>
                            <li>Confirm your ownership of the workspace associated with the request</li>
                        </ul>
                    </div>
                    <div>
                        <strong>5. Processing Timeline</strong>
                        <p data-custom-class="body_text">Once your request has been verified, we will:</p>
                        <ul className="list-disc pl-4">
                            <li>Instantly delete the specified data</li>
                            <li>Notify you immediately upon completion</li>
                        </ul>
                    </div>
                    <div>
                        <strong>6. Retention Periods</strong>
                        <p data-custom-class="body_text">
                            Workflow data is retained for 7 days by default and then archived for 7 days. Archived data
                            is not used actively in the system.
                        </p>
                        <p data-custom-class="body_text">
                            If you do not submit a deletion request, data is retained as outlined in our Privacy Policy
                            to improve services and comply with legal requirements.
                        </p>
                    </div>
                    <div>
                        <strong>7. Limitations</strong>
                        <p data-custom-class="body_text">Certain data may not be eligible for deletion if:</p>
                        <ul className="list-disc pl-4">
                            <li>It is required to comply with legal obligations</li>
                            <li>It is necessary for resolving disputes or enforcing agreements</li>
                            <li>It is part of anonymized datasets that cannot identify you</li>
                        </ul>
                    </div>
                    <div>
                        <strong>8. Effect of Deletion</strong>
                        <p data-custom-class="body_text">
                            Deleting your data will impact your ability to use viaSocket services. Once data is deleted:
                        </p>
                        <ul className="list-disc pl-4">
                            <li>It cannot be recovered</li>
                            <li>
                                Any associated workflows or integrations relying on that data will cease to function
                            </li>
                        </ul>
                    </div>
                    <div>
                        <strong>9. Changes to This Policy</strong>
                        <p data-custom-class="body_text">
                            We may update this policy periodically to reflect changes in our practices or for
                            operational, legal, or regulatory reasons. Any updates will be posted on this page with the
                            date of revision.
                        </p>
                    </div>
                    <div>
                        <p data-custom-class="body_text">Last Updated: 10/01/2025</p>
                        <p data-custom-class="body_text">
                            For questions or concerns about this policy, please contact us at{' '}
                            <a className="text-link" href="mailTo:support@viasocket.com">
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
