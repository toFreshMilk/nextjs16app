// src/core/i18n/server.ts
import 'server-only';

import { cache } from 'react';
import { deepMerge, type Dict } from '@/core/utils/object.util';
import { buildNsOwnerKey, parseNsOwnerKey, type NamespaceOwnerMap as I18nNamespaceOwnerMap } from '@/core/utils/text.util';
import type { I18nResourceStore } from './types';

/**
 * Namespace -> owner(모듈 루트) 매핑을 호출부에서 주입받습니다.
 * - 예: common   => shared
 * - 예: contract => contract
 *
 * Core는 "namespace 이름"에 대해 하드코딩하지 않고,
 * 주입된 owner를 기준으로 standard/ 및 tenants/ 경로에서 리소스를 합칩니다.
 */
export type NamespaceOwnerMap = I18nNamespaceOwnerMap;

async function safeImport<T>(importer: () => Promise<{ default: T }>): Promise<T> {
  try {
    const mod = await importer();
    return (mod?.default ?? ({} as T)) as T;
  } catch {
    return {} as T;
  }
}

/**
 * standard 번역 + tenant override 번역을 병합하여 반환
 * standard:
 *  - src/standard/{owner}/locales/{lang}/{ns}.json
 * tenants:
 *  - src/tenants/{tenant}/{owner}/locales/{lang}/{ns}.json
 */
async function loadMergedResource(lang: string, ns: string, tenant: string, owner: string): Promise<Dict> {
  const base = await safeImport<Dict>(() => import(`@/standard/${owner}/locales/${lang}/${ns}.json`));
  const override = await safeImport<Dict>(() => import(`@/tenants/${tenant}/${owner}/locales/${lang}/${ns}.json`));
  return deepMerge(base, override);
}

async function buildResourceStore(lang: string, tenant: string, nsOwnerKey: string) {
  const pairs = parseNsOwnerKey(nsOwnerKey);
  const store: I18nResourceStore = {
    [lang]: {},
  };

  for (const { ns, owner } of pairs) {
    if (!ns || !owner) continue;
    store[lang][ns] = await loadMergedResource(lang, ns, tenant, owner);
  }

  return store;
}

/**
 * (lang, tenant, nsOwnerKey) 조합별로 캐시
 * - namespaces 배열 자체를 캐시 키로 쓰면 참조가 매번 달라져 캐시가 깨질 수 있어 문자열 키로 정규화합니다.
 */
const getResourcesCached = cache(async (lang: string, tenant: string, nsOwnerKey: string) => {
  return await buildResourceStore(lang, tenant, nsOwnerKey);
});

/**
 * 서버에서 i18n 리소스 생성 (payload 최소화)
 * - ✅ 요청한 lang 1개만 내려줌
 * - ✅ 요청한 namespaces만 내려줌
 * - ✅ namespace별 owner는 호출부에서 주입
 *
 * ⚠️ 여기서는 tenantConfig 기반 normalize 같은 정책 판단을 하지 않습니다.
 *    (과한 조치 방지 / 정책은 proxy + layout에서 책임)
 */
export async function getI18nResources(
  lang: string,
  tenant: string,
  namespaces: string[],
  ownerByNamespace: NamespaceOwnerMap,
) {
  const nsOwnerKey = buildNsOwnerKey(namespaces, ownerByNamespace);
  return getResourcesCached(lang, tenant, nsOwnerKey);
}
