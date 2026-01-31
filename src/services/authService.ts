const API_BASE = 'http://localhost:8080';

export const authService = {
  // With HttpOnly cookies, we cannot read the token from JavaScript
  // This is actually MORE secure - prevents XSS attacks
  getToken(): string | null {
    console.log('authService.getToken: Using HttpOnly cookies, token not accessible from JS');
    return null;
  },

  // Token is set by backend as HttpOnly cookie, we don't set it manually
  setToken(token: string): void {
    console.log('authService.setToken: HttpOnly cookie is set by backend automatically');
    // Nothing to do - backend sets the cookie
  },

  removeToken(): void {
    console.log('authService.removeToken: Logout via backend');
    // Nothing to do here - logout() will call backend
  },

  // We can't check the cookie from JavaScript, so we assume if we got here, we're authenticated
  // The backend/middleware will handle redirecting if not authenticated
  isAuthenticated(): boolean {
    // This is a simplified check - real check happens server-side
    console.log('authService.isAuthenticated: Cookie check happens server-side');
    return true; // Let middleware handle it
  },

  login(): void {
    console.log('authService.login: Redirecting to', `${API_BASE}/oauth2/authorization/twitch`);
    window.location.href = `${API_BASE}/oauth2/authorization/twitch`;
  },

  async logout(): Promise<void> {
    try {
      console.log('authService.logout: Calling backend logout endpoint');
      await fetch(`${API_BASE}/v1/auth/logout`, {
        method: 'POST',
        credentials: 'include', // Send cookies
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      console.log('authService.logout: Redirecting to login page');
      window.location.href = '/';
    }
  }
};
