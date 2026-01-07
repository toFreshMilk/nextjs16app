'use client';

import { createContext, useContext, ReactNode } from 'react';
import { TenantConfig, configs } from '@/config/tenant.config';

const Context = createContext<TenantConfig | null>(null);

interface Props {
    children: ReactNode;
    detectedTenantId?: string; // Middleware에서 넘어온 값 (SaaS용)
}

export function AppConfigProvider({ children, detectedTenantId }: Props) {
    const buildEnv = process.env.NEXT_PUBLIC_TENANT;

    let targetId = 'default';

    // [핵심 우선순위 로직]

    // Case 1: 온프레미스 빌드 (sk, naver, lg)
    // 환경변수가 있고 'saas'가 아니라면, 서브도메인 무시하고 무조건 빌드 타겟 사용
    if (buildEnv && buildEnv !== 'saas') {
        targetId = buildEnv;
    }
        // Case 2: SaaS 런타임 (handok, iic, yg)
    // 빌드 변수가 'saas'이거나 없으면, 미들웨어가 감지한 ID 사용
    else if (detectedTenantId) {
        targetId = detectedTenantId;
    }

    // Config 매핑 (매핑되는 키가 없으면 default로 안전하게 처리)
    const config = configs[targetId as keyof typeof configs] || configs.default;

    return (
        <Context.Provider value={config}>
            <div
                style={{ display: 'contents', '--primary-color': config.theme.primaryColor } as React.CSSProperties}
            >
                {children}
            </div>
        </Context.Provider>
    );
}

export const useAppConfig = () => {
    const context = useContext(Context);
    if (!context) {
        throw new Error('useAppConfig must be used within AppConfigProvider');
    }
    return context;
};
