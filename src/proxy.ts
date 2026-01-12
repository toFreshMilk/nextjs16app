import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { isKnownTenantKey } from '@/core/config/tenant.config';

function parseSubdomain(hostname: string): string | null {
    if (hostname.includes('.localhost')) {
        const sub = hostname.split('.localhost')[0];
        return sub || null;
    }

    if (hostname.includes('.buptle.com') || hostname.includes('.buptlestg.com')) {
        const parts = hostname.split('.');
        return parts.length >= 3 ? parts[0] : null;
    }

    return null;
}

export function proxy(request: NextRequest): NextResponse {
    const { pathname } = request.nextUrl;

    // 정적 파일 패스
    if (pathname.includes('.')) {
        return NextResponse.next();
    }

    const hostname = (request.headers.get('host') || '').split(':')[0];
    const subdomain = parseSubdomain(hostname);
    const firstSeg = pathname.split('/').filter(Boolean)[0];

    console.log('🔍 Proxy Debug:', {
        hostname,
        subdomain,
        pathname,
        firstSeg,
    });

    // ✅ Case 1: 이미 /[tenant]/xxx 형태 → tenant가 subdomain과 일치하는지 확인
    if (firstSeg && isKnownTenantKey(firstSeg)) {
        // Mismatch: apr.localhost/handok/contract
        if (subdomain && subdomain !== firstSeg) {
            console.log('⚠️ Mismatch detected! Redirecting...');
            // pathname에서 tenant 제거: /handok/contract → /contract
            const cleanPath = pathname.replace(`/${firstSeg}`, '') || '/';
            return NextResponse.redirect(new URL(cleanPath, request.url));
        }
        // Match: handok.localhost/handok/contract → 그대로 진행
        return NextResponse.next();
    }

    // ✅ Case 2: Known tenant subdomain → rewrite
    if (subdomain && isKnownTenantKey(subdomain)) {
        const target = pathname === '/' ? `/${subdomain}/dashboard` : `/${subdomain}${pathname}`;
        console.log('✅ Rewrite to:', target);
        return NextResponse.rewrite(new URL(target, request.url));
    }

    // ✅ Case 3: Fallback to demo
    if (pathname === '/') {
        console.log('✅ Fallback to: /demo/dashboard');
        return NextResponse.rewrite(new URL('/demo/dashboard', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
