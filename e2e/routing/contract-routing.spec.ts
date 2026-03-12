// e2e/contract-routing.spec.ts
import { expect, test } from '@playwright/test';

test.describe('Contract Routing', () => {
  test('demo 테넌트에서 /contract 접근 시 locale prefix 경로로 리다이렉트된다', async ({ page }) => {
    await page.goto('http://demo.localhost:3200/contract');
    await expect(page).toHaveURL(/\/(ko|en)\/contract$/);
  });

  test('존재하지 않는 계약 상세 ID는 not-found로 처리된다', async ({ page }) => {
    await page.goto('http://demo.localhost:3200/ko/contract/999999');
    await expect(page.getByText('Workspace Not Found')).toBeVisible();
  });
});
