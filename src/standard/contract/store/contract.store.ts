import { BehaviorSubject } from 'rxjs';

export const contractStore = {
  contracts$: new BehaviorSubject<any[]>([]),
  filter$: new BehaviorSubject<string>('all'),

  setContracts(data: any[]) {
    this.contracts$.next(data);
  },

  setFilter(status: string) {
    this.filter$.next(status);
  }
};
