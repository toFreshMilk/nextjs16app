import type { TenantOverride } from '@/core/config/tenant.config';

export const aprConfig: TenantOverride = {
    key: 'apr',
    displayName: 'APR BuptleBiz',

    topMenus: [
        { key: 'dashboard', label: 'APR Dashboard', path: '/dashboard', order: 1 },
        { key: 'contract', label: 'Contract Management', path: '/contract', order: 2 },
    ],

    pages: [
        {
            key: 'dashboard',
            component: () => import('@/tenants/apr/dashboard/AprDashboardPage'),
        },
        {
            key: 'contract',
            component: () => import('@/tenants/apr/contract/AprContractPage'),
        },
        {
            key: 'login',
            component: () => import('@/tenants/apr/login/AprLoginPage'),
        },
    ],

    features: {
        email: true,
        ai: true,
        i18n: true,
        notification: true,
        search: true,
        chat: true,
        analytics: true,
    },

    theme: {
        cssVars: {
            '--brand-primary': '#EA002C',
            '--brand-primary-weak': '#FFE5EA',
            '--brand-bg': '#0B0B0F',
            '--brand-surface': '#1A1A24',
            '--brand-text': '#F5F7FF',
            '--brand-muted': '#A8B0C2',
        },
        inlineCss: `
      [data-tenant="apr"] .page-title {
        border-left: 4px solid #EA002C;
        padding-left: 16px;
      }
    `,
    },
};
