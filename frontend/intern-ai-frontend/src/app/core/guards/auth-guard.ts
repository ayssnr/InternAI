import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const authGuard: CanActivateFn = () => {

  const auth = inject(Auth);
  const router = inject(Router);

  const token = auth.getToken();

  console.log('AUTH GUARD TOKEN:', token);

  if (token) {
    return true;
  }

  return router.createUrlTree(['/login']);
};