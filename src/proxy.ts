// src/proxy.ts
import { NextRequest, NextResponse } from 'next/server';

const VALID_TENANTS = new Set(['demo', 'apr', 'handok', 'iic']);
const VALID_ROOT_DOMAINS = ['buptle.com', 'buptlestg.com', 'localhost.com', 'localhost'];

function detectTenant(hostname: string): string | null {
  const host = hostname.split(':')[0];
  const rootDomain = VALID_ROOT_DOMAINS.find(d => host.endsWith(d));
  if (!rootDomain) return null;

  const subdomain = host.slice(0, host.length - rootDomain.length);
  const sanitized = subdomain.endsWith('.') ? subdomain.slice(0, -1) : subdomain;

  if (!sanitized || sanitized === 'www' || !VALID_TENANTS.has(sanitized)) {
    return null;
  }
  return sanitized;
}

export default function proxy(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get('host') || '';

  if (/\.(.*)$/.test(url.pathname) || url.pathname.startsWith('/_next')) return NextResponse.next();

  const tenant = detectTenant(hostname);

  if (!tenant) {
    if (url.pathname.startsWith('/not-found')) return NextResponse.next();
    const errorUrl = req.nextUrl.clone();
    errorUrl.pathname = '/not-found';
    return NextResponse.rewrite(errorUrl);
  }

  const pathSegments = url.pathname.split('/').filter(Boolean);
  if (pathSegments.length > 0 && VALID_TENANTS.has(pathSegments[0])) {
    const newPath = '/' + pathSegments.slice(1).join('/');
    const cleanUrl = new URL(newPath, req.url);
    cleanUrl.search = url.search;
    return NextResponse.redirect(cleanUrl);
  }

  const rewriteUrl = req.nextUrl.clone();
  rewriteUrl.pathname = `/${tenant}${url.pathname}`;
  
  return NextResponse.rewrite(rewriteUrl);
}
