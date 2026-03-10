// e2e/contract-tenant.spec.ts
import { expect, test } from '@playwright/test';

test.describe('Contract Multi-Tenant Consistency', () => {
  test('Demo 테넌트와 APR 테넌트는 동일한 /contract 경로를 제공하지만 내용이 다르다', async ({ page }) => {
    // 1. Demo 테넌트 확인
    await page.goto('http://demo.localhost:3000/ko/contract');
    await expect(page.getByText('Buptle Demo', { exact: false })).toBeVisible();
    await expect(page.getByText('[데모] 신규 플랫폼 개발 계약').first()).toBeVisible();

    // 2. APR 테넌트 확인
    await page.goto('http://apr.localhost:3000/ko/contract');
    await expect(page.getByText('APR Corp', { exact: false })).toBeVisible();
    await expect(page.getByText('[APR] 2024 글로벌 뷰티 파트너십').first()).toBeVisible();
  });

  test('상세 페이지 접근 시 테넌트별 다른 테넌트명 확인', async ({ page }) => {
    // Demo 상세
    await page.goto('http://demo.localhost:3000/ko/contract/101');
    await expect(page.getByText('Buptle Demo', { exact: false })).toBeVisible();

    // APR 상세
    await page.goto('http://apr.localhost:3000/ko/contract/201');
    await expect(page.getByText('APR Corp', { exact: false })).toBeVisible();
  });

  test('APR 테넌트는 APR 전용 UI 요소(동기화 버튼, 상태 카드)를 가지고 있다', async ({ page }) => {
    await page.goto('http://apr.localhost:3000/ko/contract');
    
    // APR 전용 '동기화' 버튼 확인
    const syncButton = page.locator('.ui-apr-main-sync');
    await expect(syncButton).toBeVisible();
    
    // APR 전용 상태 카드(StatCard) 텍스트 확인 (hidden option 태그 우회)
    const totalStatCard = page.locator('.text-rose-500').filter({ hasText: '전체' });
    await expect(totalStatCard).toBeVisible();
    
    const reviewStatCard = page.locator('.text-rose-500').filter({ hasText: '리뷰' });
    await expect(reviewStatCard).toBeVisible();
  });
});
