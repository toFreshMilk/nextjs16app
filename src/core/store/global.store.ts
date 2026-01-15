import { BehaviorSubject } from 'rxjs';

export interface GlobalState {
  isSidebarOpen: boolean;
  activeMenu: string;
}

const initialState: GlobalState = {
  isSidebarOpen: true,
  activeMenu: 'dashboard',
};

class GlobalStore {
  private _state$ = new BehaviorSubject<GlobalState>(initialState);

  get state$() {
    return this._state$.asObservable();
  }

  get currentState() {
    return this._state$.getValue();
  }

  toggleSidebar() {
    const current = this.currentState;
    this._state$.next({
      ...current,
      isSidebarOpen: !current.isSidebarOpen,
    });
  }

  setActiveMenu(menu: string) {
    const current = this.currentState;
    this._state$.next({
      ...current,
      activeMenu: menu,
    });
  }
}

export const globalStore = new GlobalStore();

