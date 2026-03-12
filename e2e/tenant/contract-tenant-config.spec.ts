// e2e/contract-tenant-config.spec.ts
import { expect, test } from '@playwright/test';

test.describe('Tenant Configuration Direct Check', () => {
  test('Demo 테넌트(다국어 ON)는 브라우저가 다국어 지원 상태임을 인지하고 있다', async ({ page }) => {
    // Demo 서브도메인으로 접속
    await page.goto('http://demo.localhost:3200/ko/contract');
    
    // DOM에 주입된 설정값을 직접 확인
    const configDebug = page.locator('#app-config-debug').first();
    
    // 테넌트 ID가 demo로 제대로 들어왔는지 확인
    await expect(configDebug).toHaveAttribute('data-tenant-id', 'demo');
    
    // 다국어 기능(feature-i18n)이 "true"인지 확인 (브라우저가 다국어 환경임을 알고 있음)
    await expect(configDebug).toHaveAttribute('data-feature-i18n', 'true');
  });

  test('APR 테넌트(다국어 OFF)는 브라우저가 단일 언어(ko) 환경임을 인지하고 있다', async ({ page }) => {
    // APR 서브도메인으로 접속
    await page.goto('http://apr.localhost:3200/ko/contract');
    
    // DOM에 주입된 설정값을 직접 확인
    const configDebug = page.locator('#app-config-debug').first();
    
    // 테넌트 ID가 apr로 제대로 들어왔는지 확인
    await expect(configDebug).toHaveAttribute('data-tenant-id', 'apr');
    
    // 다국어 기능(feature-i18n)이 "false"인지 확인 (브라우저가 단일 언어 환경임을 알고 있음)
    await expect(configDebug).toHaveAttribute('data-feature-i18n', 'false');
  });
});
