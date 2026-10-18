import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Auth } from '../services/auth';

export const roleGuard = (
  allowedRoles: string[]
): CanActivateFn => {

  return () => {

    const auth = inject(Auth);
    const router = inject(Router);
    const platformId = inject(PLATFORM_ID);

    // Server tarafında role kontrolü yapma
    if (!isPlatformBrowser(platformId)) {
      return true;
    }

    const role = auth.getRole();

    console.log('ROLE GUARD ROLE:', role);

    if (role && allowedRoles.includes(role)) {
      return true;
    }

    return router.createUrlTree(['/dashboard']);
  };
};