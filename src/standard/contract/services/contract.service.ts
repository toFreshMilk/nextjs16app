import { of } from 'rxjs';

export const contractService = {
  fetchList: () => of([
    { id: 1, title: 'SW 유지보수 계약', status: 'Active', date: '2025-01-10' },
    { id: 2, title: '비밀유지서약서(NDA)', status: 'Draft', date: '2025-01-12' },
    { id: 3, title: '라이선스 구매 계약', status: 'Expired', date: '2024-12-20' },
  ])
};

