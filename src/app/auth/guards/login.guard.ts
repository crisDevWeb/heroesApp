import { Observable, map, tap } from 'rxjs';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CanActivateFn, Router } from '@angular/router';

export const loginGuard: CanActivateFn = () => {
  return checkAuthStatus();
};

const checkAuthStatus = (): Observable<boolean> => {
    const authService: AuthService = inject(AuthService);
    const router: Router = inject(Router);
   
    return authService.checkAuthentication().pipe(
      tap((isAuthenticated) => {
        if (isAuthenticated) {
          // Lo dejo en la misma ruta
          router.navigate(['./']);
        }
      }),
      map(isAuthenticated => !isAuthenticated)
    );
  };