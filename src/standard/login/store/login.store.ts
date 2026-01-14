import { BehaviorSubject } from 'rxjs';

export const loginStore = {
  isLoading$: new BehaviorSubject(false),
  error$: new BehaviorSubject<string | null>(null),
  
  setLoading(loading: boolean) { this.isLoading$.next(loading); },
  setError(err: string | null) { this.error$.next(err); }
};

