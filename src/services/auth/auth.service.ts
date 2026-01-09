import { BehaviorSubject } from 'rxjs';
import { authApi } from './auth.api';

interface User {
    name: string;
    email: string;
}

// 초기 상태
const userSubject = new BehaviorSubject<User | null>(null);

export const authService = {
    // 상태 스트림 노출 (컴포넌트에서 구독 가능)
    user$: userSubject.asObservable(),

    // 현재 값 가져오기
    getCurrentUser: () => userSubject.value,

    // 로그인 액션
    login: async (email: string) => {
        try {
            const response = await authApi.login(email);
            userSubject.next(response.user); // 상태 업데이트
            return true;
        } catch (error) {
            console.error('Login failed', error);
            return false;
        }
    },

    // 로그아웃 액션
    logout: () => {
        userSubject.next(null);
    },
};
