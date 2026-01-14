import { redirect } from 'next/navigation';

export default function RootPage() {
  // Proxy를 거치지 않고 직접 도메인 루트로 들어왔을 때의 처리
  // 실제로는 middleware(proxy.ts)가 대부분 처리하지만, 방어 코드로 demo로 보냅니다.
  redirect('/demo/dashboard');
}

