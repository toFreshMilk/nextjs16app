export interface LoginResponse {
    token: string;
    user: { name: string; email: string };
}

export const authApi = {
    login: async (email: string): Promise<LoginResponse> => {
        // 실제 API 호출 대신 Mocking
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    token: 'mock-jwt-token-12345',
                    user: { name: 'Admin User', email },
                });
            }, 500); // 0.5초 딜레이 시뮬레이션
        });
    },
};
