import { TenantConfig } from '../tenant.config';

const config: TenantConfig = {
  id: 'demo',
  name: 'Buptle Demo',
  features: { i18n: true, ai: true, sso: true },
  theme: { primaryColor: '#8b5cf6' },

  // Demo는 Standard를 유지하고, 눈에 띄는 "부분 UI"만 교체하여 데모임을 표시
  components: {
    WorkspaceBanner: () => import('@/tenants/demo/components/WorkspaceBanner'),
  },
  
  // Demo는 데이터도 가짜 데이터를 보여주기 위해 서비스도 오버라이드
  services: {
    DashboardService: () => import('@/tenants/demo/dashboard/services/dashboard.service'),
  }
};
export default config;

