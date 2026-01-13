import { NextRequest, NextResponse } from 'next/server';

// 유효한 테넌트 목록
const VALID_TENANTS = new Set(['demo', 'apr']);
const VALID_ROOT_DOMAINS = ['buptle.com', 'buptlestg.com', 'localhost.com', 'localhost'];

// 헬퍼 함수: 테넌트 감지
function detectTenant(hostname: string): string | null {
    const host = hostname.split(':')[0];
    const rootDomain = VALID_ROOT_DOMAINS.find(d => host.endsWith(d));

    if (!rootDomain) return null;

    const subdomain = host.slice(0, host.length - rootDomain.length);
    const sanitized = subdomain.endsWith('.') ? subdomain.slice(0, -1) : subdomain;

    if (!sanitized || sanitized === 'www') return 'demo';
    if (VALID_TENANTS.has(sanitized)) return sanitized;

    return null;
}

// Next.js 16 Proxy Entrypoint
export default function proxy(req: NextRequest) {
    const url = req.nextUrl;
    const hostname = req.headers.get('host') || '';

    // 1. Static Asset 등은 무시 (config.matcher 역할)
    const isStatic = /\.(.*)$/.test(url.pathname) || url.pathname.startsWith('/_next');
    if (isStatic) return NextResponse.next();

    // 2. 테넌트 감지
    const tenant = detectTenant(hostname);

    // 3. 유효하지 않은 테넌트 처리
    if (!tenant) {
        if (url.pathname.startsWith('/not-found') || url.pathname.startsWith('/error')) {
            return NextResponse.next();
        }
        // 404 페이지로 Rewrite
        const errorUrl = req.nextUrl.clone();
        errorUrl.pathname = '/not-found';
        return NextResponse.rewrite(errorUrl);
    }

    // 4. API 경로는 건너뜀 (선택 사항)
    if (url.pathname.startsWith('/api')) return NextResponse.next();

    // 5. 이미 Rewrite된 경로인지 확인 (무한 루프 방지)
    // url.pathname이 이미 /[tenant] 로 시작하면 건너뜀
    if (url.pathname.startsWith(`/${tenant}`)) return NextResponse.next();

    // 6. Rewrite 실행: /dashboard -> /demo/dashboard
    const rewriteUrl = req.nextUrl.clone();
    rewriteUrl.pathname = `/${tenant}${url.pathname}`;

    return NextResponse.rewrite(rewriteUrl);
}
