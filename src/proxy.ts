import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { isKnownTenantKey } from '@/core/config/tenant.config';

type HostParts = { fullHost: string; hostname: string; subdomain: string | null };

function parseHost(hostHeader: string | null): HostParts {
    const fullHost = hostHeader ?? '';
    const hostname = fullHost.split(':')[0] ?? '';

    // ✅ localhost 자체만 로컬로 인식
    const isLocalhost = hostname === 'localhost';

    // IP 주소 체크
    const isIPAddress = /^\d{1,3}(\.\d{1,3}){3}$/.test(hostname);

    // .local 도메인 (localhost 제외)
    const isLocalDomain = hostname.endsWith('.local') && hostname !== 'localhost';

    // 로컬 환경이지만 서브도메인이 없는 경우
    if (isLocalhost || isIPAddress || isLocalDomain) {
        return { fullHost, hostname, subdomain: null };
    }

    // ✅ subdomain.localhost 패턴 처리
    if (hostname.endsWith('.localhost')) {
        const parts = hostname.split('.');
        // ['handok', 'localhost'] → subdomain = 'handok'
        const subdomain = parts.length >= 2 ? parts[0] : null;
        return { fullHost, hostname, subdomain };
    }

    // 일반 도메인 (예: apr.buptle.com)
    const parts = hostname.split('.').filter(Boolean);
    return { fullHost, hostname, subdomain: parts.length >= 3 ? parts[0] : null };
}

function buildRewriteTarget(pathname: string, subdomain: string | null): string | null {
    const firstSeg = pathname.split('/').filter(Boolean)[0];

    if (firstSeg && isKnownTenantKey(firstSeg)) {
        return null;
    }

    if (subdomain && isKnownTenantKey(subdomain)) {
        if (pathname === '/') return `/${subdomain}/dashboard`;
        return `/${subdomain}${pathname}`;
    }

    if (subdomain || pathname === '/') {
        if (pathname === '/') return '/demo/dashboard';
        return `/demo${pathname}`;
    }

    return null;
}

export function proxy(request: NextRequest): NextResponse {
    const { pathname } = request.nextUrl;

    if (pathname.includes('.')) {
        return NextResponse.next();
    }

    const host = parseHost(request.headers.get('host'));
    const target = buildRewriteTarget(pathname, host.subdomain);

    // ✅ 디버깅 로그
    console.log('🔍 Proxy Debug:', {
        host: request.headers.get('host'),
        subdomain: host.subdomain,
        pathname,
        target,
    });

    if (target) {
        return NextResponse.rewrite(new URL(target, request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
