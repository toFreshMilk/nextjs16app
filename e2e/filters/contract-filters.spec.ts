// e2e/contract-filters.spec.ts
import { expect, test } from '@playwright/test';

test.describe('Contract Filters (Demo Tenant)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://demo.localhost:3200/ko/contract');
  });

  test('상태 탭을 클릭하면 URL이 업데이트되고 목록이 필터링된다', async ({ page }) => {
    // 1. 초기 상태 확인
    await expect(page.getByText('[데모] 신규 플랫폼 개발 계약').first()).toBeVisible();
    await expect(page.getByText('[데모] 사무실 임대차 계약').first()).toBeVisible();

    // 2. '검토(review)' 탭 클릭 (unique className 활용)
    await page.locator('.ui-standard-main-tab-review').click();
    await expect(page).toHaveURL(/tab=review/);

    // 3. 필터링 결과 확인 (데모 데이터 기반: [데모] 신규 플랫폼 개발 계약 이 검토(review)임)
    await expect(page.getByText('[데모] 신규 플랫폼 개발 계약').first()).toBeVisible();
    await expect(page.getByText('[데모] 사무실 임대차 계약').first()).not.toBeVisible();
  });

  test('검색어를 입력하면 URL이 업데이트되고 목록이 필터링된다', async ({ page }) => {
    const searchInput = page.getByPlaceholder('검색어를 입력하세요');
    await searchInput.fill('임대차');
    
    await expect(page).toHaveURL(/q=%EC%9E%84%EB%8C%80%EC%B0%A8/); // '임대차' encoded
    await expect(page.getByText('[데모] 사무실 임대차 계약').first()).toBeVisible();
    await expect(page.getByText('[데모] 신규 플랫폼 개발 계약').first()).not.toBeVisible();
  });

  test('초기화 버튼을 클릭하면 필터가 모두 해제된다', async ({ page }) => {
    // 필터 적용 (검토 탭 + 검색어)
    await page.locator('.ui-standard-main-tab-review').click();
    await expect(page).toHaveURL(/tab=review/); // Next.js 라우팅(URL 업데이트) 대기
    
    await page.getByPlaceholder('검색어를 입력하세요').fill('임대차');
    await expect(page).toHaveURL(/q=%EC%9E%84%EB%8C%80%EC%B0%A8/);

    // 초기화 클릭 (고유 클래스 활용하여 명확히 지정)
    await page.locator('.ui-standard-contract-reset').click();
    
    // URL 업데이트 대기
    await expect(page).not.toHaveURL(/tab=/);
    await expect(page).not.toHaveURL(/q=/);
    await expect(page.getByPlaceholder('검색어를 입력하세요')).toHaveValue('');
  });
});
