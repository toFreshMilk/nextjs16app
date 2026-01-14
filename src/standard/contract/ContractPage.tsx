'use client';

import { ContractList } from './components/ContractList';
import { Button } from '@/uikit/form/Button';
import { useAppConfig } from '@/core/contexts/AppConfigContext';

export default function ContractPage() {
  const { config } = useAppConfig();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900">계약 관리</h1>
        <Button style={{ backgroundColor: config.theme.primaryColor }}>
          + 새 계약 작성
        </Button>
      </div>

      <ContractList />
    </div>
  );
}

