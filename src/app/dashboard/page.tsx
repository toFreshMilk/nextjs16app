import DashboardFeature from '@/features/dashboard';

export const metadata = {
    title: 'Dashboard | BuptleBiz',
};

export default function DashboardPage() {
    // 여기에 서버 사이드 데이터 fetching 로직이 들어갈 수도 있음
    return <DashboardFeature />;
}
