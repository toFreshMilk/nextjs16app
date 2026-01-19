// src/app/[tenant]/(main)/contract/actions/contract.actions.ts
'use server';

import { revalidatePath } from 'next/cache';
import { apiPost } from '@/core/services/apiClient';

type ApproveResponse = { ok: boolean };

export async function approveContractAction(formData: FormData) {
  const tenant = String(formData.get('tenant') ?? '').trim();
  const id = String(formData.get('id') ?? '').trim();
  const comment = String(formData.get('comment') ?? '').trim();

  if (!tenant || !id) return;

  await apiPost<ApproveResponse>('/api/contracts/approve', { tenant, id, comment });

  // 화면 전체를 서버에서 다시 렌더링하여 Top/Right 등 동시 최신화
  revalidatePath(`/${tenant}/contract/${id}`);
  revalidatePath(`/${tenant}/contract`);
}

