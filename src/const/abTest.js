export const VARIANT_COOKIE = 'variant';
export const VARIANTS = ['A', 'B', 'C'];
export const VARIANT_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

// Anonymous, cookie-only identity. It is what ties repeat visits to one row in
// the tracking table, so it outlives the variant cookie deliberately: a visitor
// whose variant expired and was reassigned is still the same visitor.
export const VISITOR_ID_COOKIE = 'visitor_id';
export const VISITOR_ID_MAX_AGE = 60 * 60 * 24 * 365; // 1 year
