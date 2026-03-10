// e2e/contract-actions.spec.ts
import { expect, test } from '@playwright/test';

test.describe('Contract Actions', () => {
  test('계약 생성 버튼 클릭 시 생성 모달이 열린다', async ({ page }) => {
    await page.goto('http://demo.localhost:3000/ko/contract');
    
    // '계약 생성' 버튼 클릭
    const createButton = page.getByRole('button', { name: '계약 생성' }).first();
    await expect(createButton).toBeVisible();
    await createButton.click();

    // 모달 타이틀 확인 (dialog 내에서 탐색)
    const modalTitle = page.getByRole('dialog').getByText('계약 생성');
    await expect(modalTitle).toBeVisible();
    
    // 모달 닫기 (확인 버튼 클릭)
    const confirmButton = page.getByRole('dialog').getByRole('button', { name: '확인' });
    await expect(confirmButton).toBeVisible();
    await confirmButton.click();
    
    await expect(modalTitle).not.toBeVisible();
  });

  test('상세 페이지에서 승인 버튼 클릭 시 승인 모달이 열린다', async ({ page }) => {
    // 상세 페이지 이동 ([데모] 신규 플랫폼 개발 계약, id=101)
    await page.goto('http://demo.localhost:3000/ko/contract/101');
    
    // '승인' 버튼 클릭 (한국어 텍스트 '승인하기'를 사용)
    const approveButton = page.getByRole('button', { name: '승인하기' });
    await expect(approveButton).toBeVisible();
    await approveButton.click();

    // 승인 모달 메시지 확인 (한국어 텍스트 '정말 승인하시겠습니까?')
    const modalMsg = page.getByText('정말 승인하시겠습니까?');
    await expect(modalMsg).toBeVisible();
    
    // 취소 버튼 클릭 시 모달이 닫힌다
    const cancelButton = page.getByRole('button', { name: '취소' });
    await expect(cancelButton).toBeVisible();
    await cancelButton.click();
    
    await expect(modalMsg).not.toBeVisible();
  });
});
