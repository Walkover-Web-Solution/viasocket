export default function getPageInfo(params) {
    const pathArray = params?.resolvedUrl?.split('?')[0]?.split('/') || [];
    const qurey = params?.query || {};
    const url = params?.resolvedUrl?.split('?')[0];
    return { pathArray: pathArray, qurey: qurey, url: url };
}
