// src/core/services/serviceAction.ts
'use server';

import { revalidatePath } from 'next/cache';
import { getTenantService } from '@/core/config/tenant.config';
import type { ServiceKey } from '@/core/config/tenant.types';

// 보안을 위해 실행 가능한 메서드를 제한하고 싶다면 여기에 추가 (선택사항)
// const ALLOWED_METHODS = new Set(['approve', 'reject', 'create', 'update']);

export async function executeServiceAction(prevState: any, formData: FormData) {
  // 1. FormData 파싱
  const tenantId = formData.get('tenantId') as string;
  const serviceKey = formData.get('serviceKey') as ServiceKey;
  const methodName = formData.get('methodName') as string;
  const revalidateUrl = formData.get('revalidateUrl') as string;
  const argsJson = formData.get('args') as string;

  // 필수값 검증
  if (!tenantId || !serviceKey || !methodName) {
    return {
      success: false,
      message: 'Missing required parameters (tenantId, serviceKey, methodName)',
    };
  }

  try {
    // 2. 인자 파싱 (JSON 배열)
    // 예: [tenantId, contractId, { status: 'Active' }]
    const args = argsJson ? JSON.parse(argsJson) : [];
    if (!Array.isArray(args)) {
      throw new Error('Arguments must be an array');
    }

    // 3. 서비스 로드 (타입은 동적이므로 any)
    const service = await getTenantService<any>(tenantId, serviceKey);

    // 4. 메서드 존재 여부 확인
    if (!service || typeof service[methodName] !== 'function') {
      throw new Error(`Method '${methodName}' not found in service '${serviceKey}'`);
    }

    // 5. 실제 서비스 메서드 실행
    // await service.approve(tenantId, contractId) 와 동일
    const result = await service[methodName](...args);

    // 6. 성공 시 페이지 갱신
    //  router.refresh(); // 현재 페이지만 갱신 (빠름) 이거랑 조절해서 써야함.
    if (revalidateUrl) {
      const paths = revalidateUrl
        .split(',')
        .map((p) => p.trim())
        .filter(Boolean);
      for (const path of paths) {
        revalidatePath(path);
      }
    }

    // 서비스 메서드가 리턴한 값이 있다면 포함해서 응답
    return {
      success: true,
      message: 'Action executed successfully',
      data: result,
    };
  } catch (error) {
    console.error(`[ServiceAction Error] ${serviceKey}.${methodName}:`, error);
    // 보안상 상세 에러는 숨기고 일반적인 메시지만 내려줄 수도 있음
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}
