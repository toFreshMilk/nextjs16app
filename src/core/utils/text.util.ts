// src/core/utils/text.util.ts
export type NamespaceOwnerMap = Record<string, string>;

export const capitalize = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const truncate = (str: string, length: number): string => {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
};

export function buildNsOwnerKey(namespaces: string[], ownerByNamespace: NamespaceOwnerMap) {
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

export function parseNsOwnerKey(nsOwnerKey: string): Array<{ ns: string; owner: string }> {
  if (!nsOwnerKey) return [];
  return nsOwnerKey.split('|').map((token) => {
    const idx = token.indexOf(':');
    const ns = idx >= 0 ? token.slice(0, idx) : token;
    const owner = idx >= 0 ? token.slice(idx + 1) : '';
    return { ns, owner };
  });
}
