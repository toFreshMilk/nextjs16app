// src/standard/contract/components/ContractMain.tsx
'use client';

import { ComponentType } from 'react';
import { useAppConfig } from '@/core/contexts/AppConfigContext';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCoreTranslation } from '@/core/hooks/useCoreTranslation';
import { Button } from '@/uikit/form/Button';

function buildUrl(pathname: string, params: URLSearchParams) {
  const qs = params.toString();
  return qs ? `${pathname}?${qs}` : pathname;
}

type TabKey = 'all' | 'draft' | 'review' | 'active';

export interface ContractMainProps {
  contracts: {
    id: number | string;
    title: string;
    status: string;
  }[];
  ListComponent: ComponentType<{ contracts?: any[] }>;
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
      <div className="flex items-end justify-between">
        <div>
          <div className="text-sm text-slate-500">
            {t('main.summary_total_label')} : <span className="font-bold text-slate-900">{filtered.length}</span>{' '}
            {t('main.summary_count_unit')}
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">{t('title')}</h1>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Button variant="outline" tone="slate" uniqueClassName="ui-standard-main-show-fields">
            {t('main.actions.show_fields')}
          </Button>
          <Button variant="outline" tone="slate" uniqueClassName="ui-standard-main-per-page">
            {t('main.actions.per_page_10')}
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-3 flex gap-2">
        {tabs.map((x) => (
          <Button
            key={x.k}
            shape="xl"
            variant={tab === x.k ? 'solid' : 'ghost'}
            tone={tab === x.k ? 'slate' : 'slate'}
            uniqueClassName={`ui-standard-main-tab-${x.k}`}
            style={tab === x.k ? { backgroundColor: config.theme.primaryColor } : undefined}
            onPress={() => {
              const next = new URLSearchParams(searchParams.toString());
              next.set('tab', x.k);
              router.replace(buildUrl(pathname, next));
            }}
          >
            {x.label}
          </Button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-3">
        {ListComponent ? (
          <ListComponent contracts={filtered} />
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="text-sm text-slate-500">{t('main.list_component_load_failed')}</div>
          </div>
        )}
      </div>
    </section>
  );
}
