// src/core/i18n/types.ts
export type I18nNamespaceResources = Record<string, Record<string, any>>; // { [ns]: dict }
export type I18nResourceStore = Record<string, I18nNamespaceResources>; // { [lang]: { [ns]: dict } }
