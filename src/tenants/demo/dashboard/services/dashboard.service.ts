// src/tenants/demo/dashboard/services/dashboard.service.ts
export default {
  async getStats() {
    // Demo용 가짜 데이터 (Standard보다 훨씬 많은 데이터)
    return { contracts: 999, pending: 50, risks: 12 };
  }
};
