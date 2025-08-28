export function validateTemplateData(templates = []) {
  if (!Array.isArray(templates)) return [];
  return templates.filter((t) => {
    const title = (t?.title ?? t?.name ?? '').toString().trim();
    const url = (t?.templateUrl ?? '').toString().trim();
    return title.length > 0 && url.length > 0;
  });
}
