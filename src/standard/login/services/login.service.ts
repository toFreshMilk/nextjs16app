export default {
  async login(email: string) {
    // Standard Logic: 일반 DB 로그인
    console.log('[Standard] Login API called:', email);
    return { token: 'std-token' };
  }
};

