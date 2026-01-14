import { of, delay } from 'rxjs';

export const dashboardService = {
  getStats: () => of({ 
    activeContracts: 142, 
    pendingApprovals: 8, 
    risks: 2 
  }).pipe(delay(500))
};

