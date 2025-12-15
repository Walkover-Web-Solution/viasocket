export default function getPageInfo(params, realPath='') {
    const pathArray = realPath?.split('?')[0]?.split('/') || [];
    const qurey = params?.query || {};
    const url = realPath?.split('?')[0];
    return { pathArray: pathArray, qurey: qurey, url: url };
}
