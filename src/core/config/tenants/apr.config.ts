import { TenantConfig } from '../tenant.config';
import AprLoginPage from '@/tenants/apr/login/AprLoginPage';
import DashboardPage from '@/standard/dashboard/DashboardPage'; // Standard Dashboard
import ContractPage from '@/standard/contract/ContractPage'; // Standard Contract

const config: TenantConfig = {
    id: 'apr',
    name: 'APR Corp.',
    features: { i18n: true, ai: false }, // AI Disabled
    theme: { primaryColor: '#e11d48' }, // Rose color
    components: {
        LoginPage: AprLoginPage,
        DashboardPage: DashboardPage,
        ContractPage: ContractPage,
    }
};
export default config;
