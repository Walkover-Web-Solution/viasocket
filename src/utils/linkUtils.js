import { getDoFollowUrl } from '@/utils/axiosCalls';

// In-memory cache for dofollow config
let _dofollowCache = {
  ts: 0,
  rules: [],
};

const FIVE_MIN = 1000 * 60 * 5;

function isHttpUrl(href) {
  return typeof href === 'string' && /^(https?:)?\/\//i.test(href);
}

function getOrigin() {
  if (typeof window !== 'undefined' && window.location) return window.location.origin;
  return '';
}

export function isExternalLink(href) {
  try {
    if (!href) return false;
    if (href.startsWith('#')) return false;
    if (href.startsWith('/')) return false;
    if (!isHttpUrl(href)) return false;
    const origin = getOrigin();
    if (!origin) return true; // on server, assume external for http(s) to be safe
    const url = new URL(href, origin);
    return url.origin !== origin;
  } catch (_) {
    return true;
  }
}

function normalize(str) {
  if (!str || typeof str !== 'string') return '';
  try {
    return str.trim().toLowerCase();
  } catch {
    return '';
  }
}

function matchByRule(href, rule) {
  const nHref = normalize(href);
  if (!nHref) return false;

  const matchType = normalize(rule.match_type) || normalize(rule.matchType) || 'exact';
  const urlVal = normalize(rule.url);
  const domainVal = normalize(rule.domain);
  const patternVal = rule.pattern || rule.regex || '';

  try {
    if (matchType === 'exact' && urlVal) {
      return nHref === urlVal || nHref === normalize(new URL(urlVal, getOrigin()).href);
    }

    if (matchType === 'domain') {
      const testUrl = new URL(nHref, getOrigin());
      const testDomain = testUrl.hostname.replace(/^www\./, '');
      const target = (domainVal || (urlVal && new URL(urlVal, getOrigin()).hostname) || '').replace(/^www\./, '');
      return !!target && testDomain === target;
    }

    if (matchType === 'pattern' && patternVal) {
      const reg = new RegExp(patternVal);
      return reg.test(nHref);
    }

    // Fallback: if url is substring
    if (urlVal && nHref.includes(urlVal)) return true;
  } catch (_) {
    return false;
  }

  return false;
}

async function loadRules(pageUrl) {
  const now = Date.now();
  if (now - _dofollowCache.ts < FIVE_MIN && _dofollowCache.rules?.length) {
    return _dofollowCache.rules;
  }
  try {
    const rows = await getDoFollowUrl(pageUrl);
    const active = (rows || []).filter((r) => {
      // Accept various active flags: do_follow_link, is_active, active
      const flag = r?.do_follow_link ?? r?.is_active ?? r?.active ?? true;
      return !!flag;
    });
    _dofollowCache = { ts: now, rules: active };
    return active;
  } catch (_) {
    _dofollowCache = { ts: now, rules: [] };
    return [];
  }
}

export async function shouldBeDoFollow(href, pageUrl) {
  // Previously: internal links treated as dofollow (no rel). Requirement change:
  // We want SmartLink alone to handle rel for both internal and external links.
  // Keep rules evaluation only for external links. Internal links should not be whitelisted via table.
  if (!isExternalLink(href)) return false; // internal: default to nofollow

  // External links default to nofollow unless whitelisted
  const rules = await loadRules(pageUrl);
  return rules.some((rule) => matchByRule(href, rule));
}

export async function getLinkRelAttribute(href, pageUrl) {
  // Compute allowed using shouldBeDoFollow (internal will return false)
  const allowed = await shouldBeDoFollow(href, pageUrl);
  // Always include security attributes; keep nofollow when not allowed
  return allowed ? 'noopener noreferrer' : 'nofollow noopener noreferrer';
}

export function getLinkRelAttributeSyncFallback(href) {
  // Use when async not possible (initial paint). Default to safe nofollow for all links
  return 'nofollow noopener noreferrer';
}
