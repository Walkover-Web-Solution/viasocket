export default function createURL(link) {
    if (link?.startsWith('http')) {
        return link;
    } else {
        const url = process.env.NEXT_PUBLIC_BASE_URL + link;
        return url;
    }
}
