const DEFAULT_SITE_ORIGIN = "https://<your-deployment>.vercel.app";

function normalizeOrigin(value) {
  if (!value) return null;
  const trimmed = String(value).trim();
  if (!trimmed) return null;

  try {
    const url = new URL(trimmed);
    return url.origin;
  } catch {
    return null;
  }
}

export function getConfiguredPublicSiteOrigin({ includeServerEnv = true } = {}) {
  const candidates = [
    includeServerEnv ? process.env.MCP_PUBLIC_BASE_URL : null,
    process.env.NEXT_PUBLIC_SITE_URL,
    includeServerEnv ? process.env.SITE_URL : null
  ];

  for (const candidate of candidates) {
    const origin = normalizeOrigin(candidate);
    if (origin) return origin;
  }

  return null;
}

export function getPublicSiteOrigin({ fallbackOrigin, includeServerEnv = true } = {}) {
  return (
    getConfiguredPublicSiteOrigin({ includeServerEnv }) ||
    normalizeOrigin(fallbackOrigin) ||
    DEFAULT_SITE_ORIGIN
  );
}

export function getPublicMcpUrl(options = {}) {
  return `${getPublicSiteOrigin(options)}/api/mcp`;
}

export function getPublicOpenClawBaseUrl(options = {}) {
  return `${getPublicSiteOrigin(options)}/api/openclaw`;
}
