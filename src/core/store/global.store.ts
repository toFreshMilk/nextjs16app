import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface GlobalState {
  tenantId: string;
  isSidebarOpen: boolean;
  user?: { name: string; email: string };
}

const INITIAL_STATE: GlobalState = {
  tenantId: '',
  isSidebarOpen: true,
};

export class GlobalStore {
  private _state$ = new BehaviorSubject<GlobalState>(INITIAL_STATE);

  constructor(initialData?: Partial<GlobalState>) {
    if (initialData) {
      this._state$.next({ ...INITIAL_STATE, ...initialData });
    }
  }

  // State Observable
  get state$(): Observable<GlobalState> {
    return this._state$.asObservable();
  }

  // Selector
  select<K extends keyof GlobalState>(key: K): Observable<GlobalState[K]> {
    return this._state$.pipe(map(state => state[key]));
  }

  // Actions
  setState(newState: Partial<GlobalState>) {
    this._state$.next({ ...this._state$.value, ...newState });
  }

  toggleSidebar() {
    this.setState({ isSidebarOpen: !this._state$.value.isSidebarOpen });
  }
}

