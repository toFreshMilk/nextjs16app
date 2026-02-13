// src/core/utils/host.util.ts
export function detectTenantFromHostname<TTenant extends string>(
  hostname: string,
  validRootDomains: readonly string[],
  isTenant: (v: string) => v is TTenant,
): TTenant | null {
  const host = hostname.split(':')[0];
  const rootDomain = validRootDomains.find((d) => host.endsWith(d));
  if (!rootDomain) return null;

  const subdomain = host.slice(0, host.length - rootDomain.length);
  const sanitized = subdomain.endsWith('.') ? subdomain.slice(0, -1) : subdomain;
  if (!sanitized || sanitized === 'www' || !isTenant(sanitized)) return null;
  return sanitized;
}
