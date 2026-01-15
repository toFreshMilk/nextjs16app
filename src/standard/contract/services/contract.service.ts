export default {
  async getContracts() {
    return [
      { id: 1, title: '표준 계약서 A', status: 'Active' },
      { id: 2, title: '비밀 유지 서약서', status: 'Draft' },
    ];
  }
};

