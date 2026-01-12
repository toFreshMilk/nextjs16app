import { redirect } from 'next/navigation';

export default function LandingPage() {
    // 알 수 없는 도메인 접속 시 demo 대시보드로 유도
    redirect('/demo/dashboard');
}
