/**
 * App marks for the /front-page sections, resolved from the site's own app
 * catalogue rather than a third-party icon CDN.
 *
 * Content carries an `icon` slug beside each app label. The slug is matched
 * against the catalogue's names with punctuation and spacing removed, so
 * 'googlesheets' finds 'Google Sheets'. A slug that is not in the catalogue
 * resolves to null and the caller draws its own placeholder — a missing mark
 * costs nothing, because these are samples rather than a list.
 */

const normalize = (value) => (value || '').toLowerCase().replace(/[^a-z0-9]/g, '');

export const buildIconMap = (apps = []) => {
    const map = new Map();
    apps.forEach((app) => {
        const key = normalize(app?.name);
        if (key && app?.iconurl && !map.has(key)) map.set(key, app.iconurl);
    });
    return map;
};

export const resolveIcon = (map, slug, label) => map?.get(normalize(slug)) || map?.get(normalize(label)) || null;
