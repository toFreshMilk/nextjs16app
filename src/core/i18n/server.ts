// src/core/i18n/server.ts
import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next/initReactI18next';
import resourcesToBackend from 'i18next-resources-to-backend';

export async function getTranslation(lang: string, ns: string, tenant: string) {
  const i18nInstance = createInstance();

  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(async (language: string, namespace: string) => {
        // 1. Core 공통 데이터 로드 (src/core/i18n/locales/[lang]/[ns].json)
        let core = {};
        try {
          const module = await import(`@/core/i18n/locales/${language}/${namespace}.json`);
          core = module.default;
        } catch (error) {
          // 파일 없음 무시
        }

        // 2. Tenant 오버라이드 데이터 로드 (src/tenants/[tenant]/shared/i18n/[lang]/[ns].json)
        let override = {};
        try {
          const module = await import(`@/tenants/${tenant}/shared/i18n/${language}/${namespace}.json`);
          override = module.default;
        } catch (error) {
          // 파일 없음 무시
        }

        // 병합: Core < Tenant
        return { ...core, ...override };
      }),
    )
    .init({
      lng: lang,
      ns: ns,
      defaultNS: 'common',
      fallbackLng: 'ko',
      supportedLngs: ['ko', 'en'],
      interpolation: {
        escapeValue: false,
      },
    });

  return {
    t: i18nInstance.getFixedT(lang, ns),
    i18n: i18nInstance,
  };
}
