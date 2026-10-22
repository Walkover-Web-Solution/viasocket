// The admin panel (viasocket-admin on Embarko): the website reads its redirects and the copy for
// /integrations/{app} from its public API. NEXT_PUBLIC_ADMIN_URL overrides it (e.g. a local admin).
// Both uses fall back to what the site has in its own code when the admin can't be reached.
export const ADMIN_URL = (process.env.NEXT_PUBLIC_ADMIN_URL || 'https://viasocket-admin.embarko.app').replace(/\/+$/, '');
