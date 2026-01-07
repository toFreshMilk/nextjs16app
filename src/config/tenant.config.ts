// src/config/tenant.config.ts

export type TenantCode = 'default' | 'sk';

export interface TenantConfig {
    id: TenantCode;
    name: string;
    theme: {
        primaryColor: string; // Tailwind 클래스나 Hex 코드
    };
    features: {
        showNotices: boolean; // 공지사항 표시 여부
    };
}

const configs: Record<TenantCode, TenantConfig> = {
    default: {
        id: 'default',
        name: 'BuptleBiz (Standard)',
        theme: { primaryColor: 'text-blue-600' },
        features: { showNotices: true },
    },
    sk: {
        id: 'sk',
        name: 'SK Legal Management',
        theme: { primaryColor: 'text-red-600' },
        features: { showNotices: false }, // SK는 공지사항 숨김 요청
    },
};

export const getTenantConfig = (): TenantConfig => {
    const tenantEnv = process.env.NEXT_PUBLIC_TENANT as TenantCode;
    return configs[tenantEnv] || configs.default;
};
