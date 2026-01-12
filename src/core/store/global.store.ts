'use client';

import { BehaviorSubject } from 'rxjs';

export type AuthState = {
    isAuthenticated: boolean;
    userName: string | null;
    userEmail: string | null;
};

const _auth$ = new BehaviorSubject<AuthState>({
    isAuthenticated: false,
    userName: null,
    userEmail: null,
});

export const auth$ = _auth$.asObservable();

export const globalStore = {
    auth$,

    login(email: string, name: string) {
        _auth$.next({
            isAuthenticated: true,
            userName: name,
            userEmail: email,
        });
    },

    logout() {
        _auth$.next({
            isAuthenticated: false,
            userName: null,
            userEmail: null,
        });
    },

    getCurrentAuth(): AuthState {
        return _auth$.value;
    },
};
