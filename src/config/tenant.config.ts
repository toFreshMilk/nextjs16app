// src/config/tenant.config.ts

// saas는 빌드 모드를 지칭하는 것이므로 TenantCode에는 실제 고객사 코드만 넣습니다.
export type TenantCode = 'default' | 'sk' | 'naver' | 'lg' | 'handok' | 'iic' | 'yg';

export interface TenantConfig {
    id: TenantCode;
    name: string;
    theme: {
        primaryColor: string; // Hex Code or Tailwind Class
    };
    features: {
        showNotices: boolean;
    };
}

// 빌드 타겟(sk, naver, lg) + SaaS 타겟(handok, iic, yg) 모두 정의
export const configs: Record<TenantCode, TenantConfig> = {
    // [기본]
    default: {
        id: 'default',
        name: 'LawTle Biz (Standard)',
        theme: { primaryColor: '#2563eb' }, // Blue
        features: { showNotices: true },
    },

    // [On-Premise Build Targets] - 보통 별도 설치형
    sk: {
        id: 'sk',
        name: 'SK Legal Management',
        theme: { primaryColor: '#dc2626' }, // Red
        features: { showNotices: false },
    },
    naver: {
        id: 'naver',
        name: 'NAVER Law System',
        theme: { primaryColor: '#03c75a' }, // Green
        features: { showNotices: true },
    },
    lg: {
        id: 'lg',
        name: 'LG Legal Tech',
        theme: { primaryColor: '#a50034' }, // Magenta
        features: { showNotices: true },
    },

    // [SaaS Runtime Targets] - 클라우드에서 서브도메인으로 구분
    handok: {
        id: 'handok',
        name: 'Handok Pharm',
        theme: { primaryColor: '#005596' }, // Navy
        features: { showNotices: true },
    },
    iic: {
        id: 'iic',
        name: 'IIC Consulting',
        theme: { primaryColor: '#f59e0b' }, // Amber
        features: { showNotices: false },
    },
    yg: {
        id: 'yg',
        name: 'YG Entertainment',
        theme: { primaryColor: '#000000' }, // Black
        features: { showNotices: true },
    },
};
