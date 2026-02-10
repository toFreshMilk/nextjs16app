// src/core/i18n/loadMergedResource.ts
import 'server-only';

type Dict = Record<string, any>;

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
 * Namespace -> 소유 모듈 경로 매핑
 * - common: shared
 * - contract: contract
 */
function getOwnerByNamespace(ns: string): 'shared' | 'contract' | null {
  if (ns === 'common') return 'shared';
  if (ns === 'contract') return 'contract';
  return null;
}

/**
 * standard 번역 + tenant override 번역을 병합하여 반환
 * standard:
 *  - common   => src/standard/shared/locales/{lang}/common.json
 *  - contract => src/standard/contract/locales/{lang}/contract.json
 * tenants:
 *  - common   => src/tenants/{tenant}/shared/locales/{lang}/common.json
 *  - contract => src/tenants/{tenant}/contract/locales/{lang}/contract.json
 */
export async function loadMergedResource(lang: string, ns: string, tenant: string): Promise<Dict> {
  const owner = getOwnerByNamespace(ns);
  if (!owner) return {};

  const base = await safeImport<Dict>(() => {
    if (owner === 'shared') {
      return import(`@/standard/shared/locales/${lang}/${ns}.json`);
    }
    return import(`@/standard/contract/locales/${lang}/${ns}.json`);
  });

  const override = await safeImport<Dict>(() => {
    if (owner === 'shared') {
      return import(`@/tenants/${tenant}/shared/locales/${lang}/${ns}.json`);
    }
    return import(`@/tenants/${tenant}/contract/locales/${lang}/${ns}.json`);
  });

  return deepMerge(base, override);
}
