export default function getAppDetails(combos, app) {
    if (!combos?.plugins || !combos.plugins[app]) {
        return null; // or handle the missing plugin case as needed
    }
    return combos?.plugins[app];
}
