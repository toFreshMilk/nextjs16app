import { of, delay } from 'rxjs';

export const loginService = {
  login: (email: string, pass: string) => {
    // Mock Logic
    if (!email.includes('@')) throw new Error('Invalid Email');
    return of({ token: 'mock-token-abc', user: { email } }).pipe(delay(800));
  }
};

