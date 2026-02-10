// src/core/i18n/server.ts
import 'server-only';

import { cache } from 'react';
import type { I18nResourceStore } from './types';

type Dict = Record<string, any>;

/**
 * Namespace -> owner(모듈 루트) 매핑을 호출부에서 주입받습니다.
 * - 예: common   => shared
 * - 예: contract => contract
 *
 * Core는 "namespace 이름"에 대해 하드코딩하지 않고,
 * 주입된 owner를 기준으로 standard/ 및 tenants/ 경로에서 리소스를 합칩니다.
 */
export type NamespaceOwnerMap = Record<string, string>;

function isPlainObject(v: any): v is Record<string, any> {
  return v !== null && typeof v === 'object' && !Array.isArray(v);
}

function deepMerge(base: Dict, override: Dict): Dict {
  const out: Dict = { ...base };
  for (const [k, v] of Object.entries(override ?? {})) {
    if (isPlainObject(out[k]) && isPlainObject(v)) out[k] = deepMerge(out[k], v);
    else out[k] = v;
  }
  return out;
}

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

function buildNsOwnerKey(namespaces: string[], ownerByNamespace: NamespaceOwnerMap) {
  const unique = Array.from(new Set(namespaces)).sort();
  const pairs = unique.map((ns) => {
    const owner = ownerByNamespace[ns];
    if (!owner) {
      throw new Error(`i18n owner map missing: namespace="${ns}"`);
    }
    return `${ns}:${owner}`;
  });
  return pairs.join('|');
}

function parseNsOwnerKey(nsOwnerKey: string): Array<{ ns: string; owner: string }> {
  if (!nsOwnerKey) return [];
  return nsOwnerKey.split('|').map((token) => {
    const idx = token.indexOf(':');
    const ns = idx >= 0 ? token.slice(0, idx) : token;
    const owner = idx >= 0 ? token.slice(idx + 1) : '';
    return { ns, owner };
  });
}

async function buildResourceStore(lang: string, tenant: string, nsOwnerKey: string) {
  const pairs = parseNsOwnerKey(nsOwnerKey);
  const store: I18nResourceStore = {
    [lang]: {},
  };

  for (const { ns, owner } of pairs) {
    if (!ns || !owner) continue;
    const dict = await loadMergedResource(lang, ns, tenant, owner);
    store[lang][ns] = dict;
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
 * - ✅ namespace별 owner는 호출부에서 주입 (Core에서 도메인 하드코딩 최소화)
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
