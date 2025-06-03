import { sendErrorMessage } from './SendErrorMessage';

export default async function getCombos(pageInfo, pageUrl) {
    if (pageInfo?.appone) {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_INTEGRATION_URL}/recommend/integrations?service=${pageInfo?.appone}${pageInfo?.apptwo && pageInfo?.apptwo != null ? '&service=' + pageInfo.apptwo : ''}`
            );
            const responseData = await response?.json();
            return responseData;
        } catch (error) {
            sendErrorMessage({
                error,
                pageUrl,
                source: `${process.env.NEXT_PUBLIC_INTEGRATION_URL}/recommend/integrations?service=${pageInfo?.appone}${pageInfo?.apptwo && pageInfo?.apptwo != null ? '&service=' + pageInfo.apptwo : ''}`,
            });
            return null;
        }
    }
}
