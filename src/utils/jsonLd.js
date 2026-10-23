// Serialises structured data for a <script type="application/ld+json"> tag. JSON.stringify leaves
// "<" as is, so content from table-api or the admin containing "</script>" could close the tag
// early. The escaped form (backslash-u003c) is the same character to a JSON parser and can't end
// the script (OPEN_QUESTIONS S-09).
export const serializeJsonLd = (data) => JSON.stringify(data).replace(/</g, '\\u003c');
