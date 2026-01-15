// Standard 로직을 아예 안 쓰고, 완전히 새로 구현
export default {
  async getContracts() {
    console.log('[APR] Fetching from Groupware...');
    return [
      { id: 901, title: '[APR] 뷰티 디바이스 공급 계약', status: 'Active' },
      { id: 902, title: '[APR] 해외 법인 설립 건', status: 'Review' },
    ];
  }
};
