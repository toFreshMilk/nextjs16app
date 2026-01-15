// Server Component 예시
import { getTenantService } from '@/core/config/tenant.config';

export default async function ContractPage({ params }: any) {
  // 실제 런타임에는 config 주입된 params가 아닐 수 있으므로 주의 필요하지만 구조상 예시
  // 상위 layout이나 page에서 tenant를 context나 props로 넘겨야 함. 
  // 여기서는 클라이언트 컴포넌트 전환이 낫지만 Server Component Logic 보여주기 위함.
  
  // 실제로는:
  return (
    <div className="p-6">
       <h1 className="text-2xl font-bold mb-4">계약 관리 (Standard)</h1>
       <div className="bg-white p-4 rounded shadow">
         <div className="border-b py-2 font-bold">목록</div>
         <div className="py-2">표준 계약서 A</div>
         <div className="py-2">비밀 유지 서약서</div>
       </div>
    </div>
  );
}

