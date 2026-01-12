import type { TenantOverride } from '@/core/config/tenant.config';

export const handokConfig: TenantOverride = {
    key: 'handok',
    displayName: 'Handok BuptleBiz',

    topMenus: [
        { key: 'dashboard', label: 'Handok Dashboard', path: '/dashboard', order: 1 },
    ],

    pages: [
        {
            key: 'dashboard',
            component: () => import('@/tenants/handok/dashboard/HandokDashboardPage'),
        },
    ],

    features: {
        ai: false,
        chat: false,
    },

    theme: {
        cssVars: {
            '--brand-primary': '#00A651',
            '--brand-primary-weak': '#E0F7EA',
            '--brand-bg': '#0A0F0A',
            '--brand-surface': '#141A14',
            '--brand-text': '#F0F5F0',
            '--brand-muted': '#A0B5A0',
        },
        inlineCss: `
      [data-tenant="handok"] .page-title {
        border-left: 4px solid #00A651;
        padding-left: 16px;
      }
    `,
    },
};
