// e2e/contract-i18n-direct.spec.ts
import { expect, test } from '@playwright/test';

test.describe('Tenant i18n Direct Resource Loading Config', () => {
  test('i18n 설정이 ON인 Demo 테넌트는 /en 접근 시 영어(en) 리소스를 서버에서 준비하여 내려준다', async ({ page }) => {
    // 1. 영어 경로로 Demo 접속
    await page.goto('http://demo.localhost:3200/en/contract');
    
    // 2. 서버가 내려준 데이터 속성 값을 직접 확인 (.first()로 중복 요소 에러 방지)
    const debugElement = page.locator('#i18n-debug-data').first();
    
    // x-lang 헤더 등에 의해 최종 결정된 언어 값이 'en'인지 검증
    await expect(debugElement).toHaveAttribute('data-current-lang', 'en');
    
    // 서버가 I18nProvider에 넘겨준 리소스 키(lang)에 'en'만 준비되어 있는지 확인
    const loadedLangs = await debugElement.getAttribute('data-loaded-langs');
    expect(loadedLangs).toBe('en');
  });

  test('i18n 설정이 OFF인 APR 테넌트는 /en 접근 시 강제로 한국어(ko) 리소스만 서버에서 준비하여 내려준다', async ({ page }) => {
    // 1. 강제로 영어 경로로 APR 접속
    await page.goto('http://apr.localhost:3200/en/contract');
    
    // 2. 서버가 내려준 데이터 속성 값을 직접 확인
    const debugElement = page.locator('#i18n-debug-data').first();
    
    // proxy.ts 에 의해 URL과 무관하게 'ko'로 강제 고정되었는지 검증
    await expect(debugElement).toHaveAttribute('data-current-lang', 'ko');
    
    // 서버가 I18nProvider에 넘겨준 리소스 키(lang)에 'ko'만 로드되었는지 "직접적"으로 확인
    // 메모리에 로딩 자체가 ko만 되었음을 증명
    const loadedLangs = await debugElement.getAttribute('data-loaded-langs');
    expect(loadedLangs).toBe('ko');
  });
});
