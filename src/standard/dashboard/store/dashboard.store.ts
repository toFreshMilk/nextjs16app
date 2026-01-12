'use client';

import { BehaviorSubject } from 'rxjs';

export interface DashboardStats {
    pendingContracts: number;
    activeAdvisories: number;
    totalUsers: number;
    loaded: boolean;
}

const initialState: DashboardStats = {
    pendingContracts: 0,
    activeAdvisories: 0,
    totalUsers: 0,
    loaded: false,
};

const _stats$ = new BehaviorSubject<DashboardStats>(initialState);

export const dashboardStats$ = _stats$.asObservable();

export const dashboardStore = {
    async loadStats() {
        _stats$.next({ ..._stats$.value, loaded: false });

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 600));

        _stats$.next({
            pendingContracts: Math.floor(Math.random() * 30) + 10,
            activeAdvisories: Math.floor(Math.random() * 50) + 20,
            totalUsers: Math.floor(Math.random() * 100) + 50,
            loaded: true,
        });
    },

    reset() {
        _stats$.next(initialState);
    },
};
