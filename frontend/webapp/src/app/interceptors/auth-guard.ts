import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../service/auth.service";
import { inject } from "@angular/core";

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  // If on auth pages
  if (state.url.startsWith('/auth')) {
    // If already logged in, redirect to appropriate page
    if (token && user) {
      const isAdmin = user.admin === true || user.role === 'admin';
      router.navigateByUrl(isAdmin ? '/admin/dashboard' : '/home');
      return false;
    }
    return true;
  }

  // Not logged in - redirect to login
  if (!token || !user) {
    router.navigateByUrl('/auth/login');
    return false;
  }

  // Check for admin role requirement
  const requiredRole = route.data?.['role'];
  const isAdmin = user.admin === true || user.role === 'admin';

  if (requiredRole === 'admin' && !isAdmin) {
    router.navigateByUrl('/home');
    return false;
  }

  return true;
};
