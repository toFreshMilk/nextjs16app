import { of } from 'rxjs';

export const dashboardService = {
    getStats: () => of([
        { id: 1, title: 'Service Agreement', status: 'draft' },
        { id: 2, title: 'NDA', status: 'active' }
    ])
};
