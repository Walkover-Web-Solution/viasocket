export default function getRealRouteFromDataUrl(reqUrl) {
  if (reqUrl.startsWith("/_next/data/")) {
    const withoutPrefix = reqUrl.replace(/^\/_next\/data\/[^/]+/, "");
    return withoutPrefix.replace(/\.json$/, "") || "/";
  }
  return reqUrl;
}
