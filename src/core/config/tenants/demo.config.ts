import { TenantConfig } from '../tenant.config';
import DemoLoginPage from '@/tenants/demo/login/DemoLoginPage';
import DemoDashboardPage from '@/tenants/demo/dashboard/DemoDashboardPage';
import ContractPage from '@/standard/contract/ContractPage'; // Use standard for contract

const config: TenantConfig = {
    id: 'demo',
    name: 'Demo Workspace',
    features: { i18n: true, ai: true },
    theme: { primaryColor: '#3b82f6' },
    components: {
        LoginPage: DemoLoginPage,
        DashboardPage: DemoDashboardPage,
        ContractPage: ContractPage,
    }
};
export default config;
