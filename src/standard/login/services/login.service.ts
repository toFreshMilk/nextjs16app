import { delay, of } from 'rxjs';

export const loginService = {
    login: (email: string, pass: string) => {
        // Mock API Call
        return of({ token: 'abc-123', user: { email } }).pipe(delay(1000));
    }
};
