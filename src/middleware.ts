import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const buildTarget = process.env.NEXT_PUBLIC_TENANT;

    // 1. [On-Premise 보호]
    // 빌드 타겟이 특정 고객사(sk, naver 등)로 고정되어 있다면
    // 서브도메인 파싱 로직을 아예 수행하지 않고 통과시킵니다.
    // (saas가 아니고, 값이 존재하는 경우)
    if (buildTarget && buildTarget !== 'saas') {
        return NextResponse.next();
    }

    // 2. [SaaS 로직]
    // 빌드 타겟이 'saas'이거나 없을 경우에만 서브도메인을 확인합니다.
    const host = request.headers.get('host') || '';
    const subdomain = host.split('.')[0];

    // localhost, www 등은 default로 처리
    // 예: handok.lawtle.com -> handok
    // 예: handok.localhost:3000 -> handok
    let tenantId = 'default';
    if (subdomain && subdomain !== 'localhost' && subdomain !== 'www') {
        tenantId = subdomain;
    }

    // 3. 헤더 주입
    const response = NextResponse.next();
    response.headers.set('x-tenant-id', tenantId);

    return response;
}

// 모든 경로에 대해 미들웨어 실행 (필요에 따라 static 파일 제외 가능)
export const config = {
    matcher: '/:path*',
};
