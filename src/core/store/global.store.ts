import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface GlobalState {
    tenantId: string;
    user?: { name: string; role: string };
    sidebarCollapsed: boolean;
}

const INITIAL: GlobalState = { tenantId: '', sidebarCollapsed: false };

export class GlobalStore {
    private _state$ = new BehaviorSubject<GlobalState>(INITIAL);

    constructor(initial?: Partial<GlobalState>) {
        if (initial) this._state$.next({ ...INITIAL, ...initial });
    }

    get state$(): Observable<GlobalState> { return this._state$.asObservable(); }

    select<K extends keyof GlobalState>(key: K): Observable<GlobalState[K]> {
        return this._state$.pipe(map(s => s[key]));
    }

    setState(update: Partial<GlobalState>) {
        this._state$.next({ ...this._state$.value, ...update });
    }

    toggleSidebar() {
        this.setState({ sidebarCollapsed: !this._state$.value.sidebarCollapsed });
    }
}
