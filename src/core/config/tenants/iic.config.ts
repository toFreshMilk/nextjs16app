import type { TenantOverride } from '@/core/config/tenant.config';

export const iicConfig: TenantOverride = {
    key: 'iic',
    displayName: 'IIC BuptleBiz',

    features: {
        export: false,
        analytics: false,
    },

    theme: {
        cssVars: {
            '--brand-primary': '#FF6B00',
            '--brand-primary-weak': '#FFEADB',
            '--brand-bg': '#0F0A06',
            '--brand-surface': '#1A1410',
            '--brand-text': '#FFF5F0',
            '--brand-muted': '#B59080',
        },
    },
};
