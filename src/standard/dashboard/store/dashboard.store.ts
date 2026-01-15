import { BehaviorSubject } from 'rxjs';

interface DashboardState {
  stats: any | null;
  loading: boolean;
}

export const dashboardStore = {
  state$: new BehaviorSubject<DashboardState>({ stats: null, loading: false }),

  setStats(stats: any) {
    this.state$.next({ ...this.state$.value, stats, loading: false });
  },

  setLoading(loading: boolean) {
    this.state$.next({ ...this.state$.value, loading });
  }
};
