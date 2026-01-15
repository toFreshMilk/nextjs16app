export default {
  async getContracts() {
    // Demo용 가짜 데이터
    console.log('[Demo] Contract Service - 가짜 데이터 반환');
    return [
      { id: 999, title: '[데모] 샘플 계약서 1', status: 'Active' },
      { id: 998, title: '[데모] 샘플 계약서 2', status: 'Draft' },
    ];
  }
};
