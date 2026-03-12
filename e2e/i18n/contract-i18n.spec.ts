// e2e/contract-i18n.spec.ts
import { expect, test } from '@playwright/test';

test.describe('Contract i18n', () => {
  test('한국어 경로(/ko/contract)는 한국어 텍스트를 보여준다', async ({ page }) => {
    await page.goto('http://demo.localhost:3200/ko/contract');
    
    // 한국어 버튼 텍스트 확인
    await expect(page.getByRole('button', { name: '계약 생성' }).first()).toBeVisible();
    await expect(page.locator('.ui-standard-main-tab-all')).toHaveText('전체');
    await expect(page.getByText('상태 분포 차트 (Recharts 샘플)')).toBeVisible();
  });

  test('영어 경로(/en/contract)는 영어 텍스트를 보여준다', async ({ page }) => {
    await page.goto('http://demo.localhost:3200/en/contract');
    
    // 영어 버튼 텍스트 확인 (contract.json 기반: "title": "Contracts", "tabs.all": "All")
    await expect(page.getByText('Contracts', { exact: true })).toBeVisible();
    await expect(page.locator('.ui-standard-main-tab-all')).toHaveText('All');
    
    // 'Show fields' 버튼 확인 (contract.json: "show_fields": "Show fields")
    await expect(page.getByRole('button', { name: 'Show fields' })).toBeVisible();
  });

  test('영어 상세 페이지(/en/contract/[id])는 영어 텍스트를 보여준다', async ({ page }) => {
    await page.goto('http://demo.localhost:3200/en/contract/101');
    
    // 상세 페이지의 영어 텍스트 확인 (detailTop.backToList: "Back to list")
    await expect(page.getByRole('button', { name: 'Back to list' })).toBeVisible();
    await expect(page.getByText('This contract is currently')).toBeVisible();
    
    // 영어 승인 버튼 확인 (detailTop.approve: "Approve")
    await expect(page.getByRole('button', { name: 'Approve' })).toBeVisible();
  });
});
