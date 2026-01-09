import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Next.js 16: middleware 대신 proxy라는 이름의 함수를 export 해야 합니다.
export function proxy(request: NextRequest) {
    const host = request.headers.get('host') || '';
    const subdomain = host.split('.')[0];
    let tenantId = 'default';

    if (subdomain && subdomain !== 'localhost' && subdomain !== 'www') {
        tenantId = subdomain;
    }

    const response = NextResponse.next();
    response.headers.set('x-tenant-id', tenantId);
    return response;
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
