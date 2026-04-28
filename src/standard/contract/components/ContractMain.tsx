// src/standard/contract/components/ContractMain.tsx
'use client';

import { type ComponentType } from 'react';
import { useAppConfig } from '@/core/contexts/AppConfigContext';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCoreTranslation } from '@/core/hooks/useCoreTranslation';
import ContractMainHeader from './main/ContractMainHeader';
import ContractMainTabs from './main/ContractMainTabs';
import ContractMainSummary from './main/ContractMainSummary';
import ContractMainBody from './main/ContractMainBody';

function buildUrl(pathname: string, params: URLSearchParams) {
  const qs = params.toString();
  return qs ? `${pathname}?${qs}` : pathname;
}

type TabKey = 'all' | 'draft' | 'review' | 'active';
type ContractItem = {
  id: number | string;
  title: string;
  status: string;
};

export interface ContractMainProps {
  contracts: ContractItem[];
  ListComponent: ComponentType<{ contracts?: ContractItem[] }>;
}

export default function ContractMain({ contracts, ListComponent }: ContractMainProps) {
  const { t } = useCoreTranslation('contract');

  const { config } = useAppConfig();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get('q') ?? '';
  const tab = (searchParams.get('tab') ?? 'all') as TabKey;

  const q = query.trim().toLowerCase();

  const filtered = contracts.filter((c) => {
    const matchQ = !q || c.title.toLowerCase().includes(q);
    const matchTab =
      tab === 'all' ||
      (tab === 'draft' && c.status.toLowerCase() === 'draft') ||
      (tab === 'review' && c.status.toLowerCase() === 'review') ||
      (tab === 'active' && c.status.toLowerCase() === 'active');
    return matchQ && matchTab;
  });

  const tabs: { k: TabKey; label: string }[] = [
    { k: 'all', label: t('main.tabs.all') },
    { k: 'draft', label: t('main.tabs.draft') },
    { k: 'review', label: t('main.tabs.review') },
    { k: 'active', label: t('main.tabs.active') },
  ];

  return (
    <section className="flex-1 space-y-4">
      <ContractMainHeader filteredCount={filtered.length} />

      <ContractMainTabs
        tabs={tabs}
        activeTab={tab}
        primaryColor={config.theme.primaryColor}
        onSelect={(k) => {
          const next = new URLSearchParams(searchParams.toString());
          next.set('tab', k);
          router.replace(buildUrl(pathname, next));
        }}
      />

      <ContractMainSummary
        filtered={filtered}
        chartColor={config.theme.primaryColor}
        onBarClick={(status) => {
          const next = new URLSearchParams(searchParams.toString());
          if (status && status !== 'all') next.set('tab', status);
          router.replace(buildUrl(pathname, next));
        }}
        onRowClick={(id) => router.push(`${pathname}/${id}`)}
      />

      <ContractMainBody filtered={filtered} ListComponent={ListComponent} />
    </section>
  );
}
