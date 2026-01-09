export type TenantCode = 'default' | 'sk' | 'lg' | 'naver' | 'saas';

export interface TenantConfig {
    id: string;
    name: string;
    theme: {
        primaryColor: string;
    };
    features: {
        showNotices: boolean;
    };
}

export const configs: Record<string, TenantConfig> = {
    default: {
        id: 'default',
        name: 'LawTle Biz (Standard)',
        theme: { primaryColor: '#2563eb' }, // Blue
        features: { showNotices: true },
    },
    sk: {
        id: 'sk',
        name: 'SK Legal Management',
        theme: { primaryColor: '#dc2626' }, // Red
        features: { showNotices: false },
    },
    lg: {
        id: 'lg',
        name: 'LG Legal Tech',
        theme: { primaryColor: '#a50034' }, // Magenta
        features: { showNotices: true },
    },
};
