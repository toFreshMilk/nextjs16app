import { NextRequest, NextResponse } from 'next/server';

// 유효한 테넌트 목록 (실제 환경에선 DB/API 연동 가능)
const VALID_TENANTS = new Set(['demo', 'apr', 'handok', 'iic']);
const VALID_ROOT_DOMAINS = ['buptle.com', 'buptlestg.com', 'localhost.com', 'localhost'];

/**
 * 호스트네임에서 테넌트 ID를 추출하고 검증합니다.
 * @returns valid tenant id or null
 */
function detectTenant(hostname: string): string | null {
    const host = hostname.split(':')[0]; // Remove port
    const rootDomain = VALID_ROOT_DOMAINS.find(d => host.endsWith(d));

    // 유효한 루트 도메인이 아니면 접근 불가
    if (!rootDomain) return null;

    const subdomain = host.slice(0, host.length - rootDomain.length);
    const sanitized = subdomain.endsWith('.') ? subdomain.slice(0, -1) : subdomain;

    // [수정] 서브도메인이 없거나(빈값), 'www' 이거나, 화이트리스트에 없으면 -> null (Error)
    if (!sanitized || sanitized === 'www' || !VALID_TENANTS.has(sanitized)) {
        return null;
    }

    return sanitized;
}

export default function proxy(req: NextRequest) {
    const url = req.nextUrl;
    const hostname = req.headers.get('host') || '';

    // 1. Static Asset 등은 무시
    const isStatic = /\.(.*)$/.test(url.pathname) || url.pathname.startsWith('/_next');
    if (isStatic) return NextResponse.next();

    // 2. 테넌트 감지
    const tenant = detectTenant(hostname);

    // 3. 유효하지 않은 테넌트 처리 (서브도메인 없음/오류) -> 에러 페이지 Rewrite
    if (!tenant) {
        // 이미 에러 페이지로 가고 있다면 통과 (무한루프 방지)
        if (url.pathname.startsWith('/not-found') || url.pathname.startsWith('/error')) {
            return NextResponse.next();
        }
        // 404 페이지로 Rewrite (app/not-found.tsx)
        const errorUrl = req.nextUrl.clone();
        errorUrl.pathname = '/not-found';
        return NextResponse.rewrite(errorUrl);
    }

    // 4. URL 경로에 이미 테넌트 ID가 포함된 경우 (예: /demo/dashboard)
    // 사용자가 직접 입력했거나, 잘못된 링크를 탄 경우 -> 제거하고 리다이렉트 (Clean URL)
    const pathSegments = url.pathname.split('/').filter(Boolean);
    if (pathSegments.length > 0 && VALID_TENANTS.has(pathSegments[0])) {
        const newPath = '/' + pathSegments.slice(1).join('/');
        const cleanUrl = new URL(newPath, req.url);
        cleanUrl.search = url.search;

        return NextResponse.redirect(cleanUrl);
    }

    // 5. 정상적인 Clean URL 접근 (예: /dashboard) -> 내부적으로 Tenant 붙여서 Rewrite
    const rewriteUrl = req.nextUrl.clone();
    rewriteUrl.pathname = `/${tenant}${url.pathname}`;

    return NextResponse.rewrite(rewriteUrl);
}
