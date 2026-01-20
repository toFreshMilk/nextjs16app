// src/app/[tenant]/(main)/contract/actions/contract.actions.ts
'use server';

import { revalidatePath } from 'next/cache';
import { getTenantService } from '@/core/config/tenant.config';
import type { StandardContractService } from '@/standard/contract/services/contract.service';

export async function approveContractAction(prevState: any, formData: FormData) {
    const tenantId = formData.get('tenantId') as string;
    const contractId = formData.get('contractId') as string;

    if (!tenantId || !contractId) {
        return { success: false, message: 'Missing parameters' };
    }

    try {
        // 1. 테넌트별 서비스 구현체 로드 (타입 지정)
        const service = await getTenantService<StandardContractService>(tenantId, 'ContractService');

        // 2. 서비스 실행
        await service.approve(tenantId, contractId);

        // 3. 페이지 갱신
        revalidatePath(`/${tenantId}/contract`);
        revalidatePath(`/${tenantId}/contract/${contractId}`);

        return { success: true, message: 'Approved successfully' };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Approval failed' };
    }
}
