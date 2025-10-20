import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../service/auth.service";
import { inject } from "@angular/core";

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const isLoggedIn = authService.isLoggedIn();
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  // Route data may specify who can access
  const requiredRole = route.data?.['role']; // e.g. { role: 'admin' }

  // Allow access to auth routes
  if (state.url.startsWith('auth')) return true;

  // Not logged in -> send to login
  if (!isLoggedIn) {
    router.navigateByUrl('/auth/login');
    return false;
  }

  // If route requires admin and user is not admin -> block
  if (requiredRole === 'admin' && !user?.admin) {
    router.navigateByUrl('/not-authorized'); // or redirect to dashboard
    return false;
  }

  // Otherwise allow
  return true;
};
