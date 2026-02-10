// src/core/i18n/server.ts
import 'server-only';

import { cache } from 'react';
import { DEFAULT_LANG } from './settings';
import type { I18nResourceStore } from './types';
import { loadMergedResource } from './loadMergedResource';

async function buildResourceStore(lang: string, tenant: string, namespaces: string[]) {
  const langsToLoad = Array.from(new Set([lang, DEFAULT_LANG])); // fallback ko 포함
  const store: I18nResourceStore = {};

  for (const l of langsToLoad) {
    const nsEntries: Array<[string, Record<string, any>]> = [];
    for (const ns of namespaces) {
      const dict = await loadMergedResource(l, ns, tenant);
      nsEntries.push([ns, dict]);
    }
    store[l] = Object.fromEntries(nsEntries);
  }

  return store;
}

/**
 * (lang, tenant, namespaces) 조합별로 캐시
 */
const getResourcesCached = cache(async (lang: string, tenant: string, namespaces: string[]) => {
  const uniqueNamespaces = Array.from(new Set(namespaces));
  const resources = await buildResourceStore(lang, tenant, uniqueNamespaces);
  return resources;
});

export async function getI18nResources(lang: string, tenant: string, namespaces: string[]) {
  return getResourcesCached(lang, tenant, namespaces);
}
