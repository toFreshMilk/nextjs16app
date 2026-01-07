'use client';

import dynamic from 'next/dynamic';

const DashboardFeature = dynamic(() => {
    // 1. 빌드 타임에 SK 환경변수가 감지되면 SK 전용 파일을 로드
    if (process.env.NEXT_PUBLIC_TENANT === 'sk') {
        return import('@/tenants/sk/features/dashboard/SkDashboard');
    }

    // 2. 그 외(Hanwha, Lotte, Default)는 모두 표준 구현체 사용
    return import('./layouts/DefaultDashboard');
}, {
    loading: () => <div className="p-10">Loading Dashboard Features...</div>
});

export default DashboardFeature;
