// e2e/contract-list-detail.spec.ts
import { expect, test } from '@playwright/test';

test.describe('Contract List and Detail', () => {
  test('demo 목록에서 계약 클릭 시 상세 페이지로 이동한다', async ({ page }) => {
    await page.goto('http://demo.localhost:3200/ko/contract');

    const firstContract = page.getByText('[데모] 신규 플랫폼 개발 계약').first();
    await expect(firstContract).toBeVisible();
    await firstContract.click();

    await expect(page).toHaveURL(/\/ko\/contract\/101$/);
    await expect(page.getByRole('heading', { name: '[데모] 신규 플랫폼 개발 계약' })).toBeVisible();
  });

  test('apr 테넌트는 APR 데이터가 렌더링된다', async ({ page }) => {
    await page.goto('http://apr.localhost:3200/ko/contract');
    await expect(page.getByText('[APR] 2024 글로벌 뷰티 파트너십').first()).toBeVisible();
    await expect(page.getByText('APR 상태 차트 (Recharts 샘플)')).toBeVisible();
  });
});
