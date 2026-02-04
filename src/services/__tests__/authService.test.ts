import { describe, it, expect, beforeEach, vi } from 'vitest';
import { authService } from '../authService';

describe('authService', () => {
  beforeEach(() => {
    window.location.href = '';
    vi.clearAllMocks();
  });

  describe('login', () => {
    it('should redirect to Twitch OAuth endpoint', () => {
      authService.login();

      expect(window.location.href).toBe('http://localhost:8080/oauth2/authorization/twitch');
    });
  });

  describe('logout', () => {
    it('should call logout endpoint and redirect to home', async () => {
      const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValueOnce(
        new Response(null, { status: 200 })
      );

      await authService.logout();

      expect(fetchSpy).toHaveBeenCalledWith(
        'http://localhost:8080/v1/auth/logout',
        {
          method: 'POST',
          credentials: 'include',
        }
      );
      expect(window.location.href).toBe('/');
    });

    it('should redirect to home even on logout error', async () => {
      vi.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('Network error'));

      await authService.logout();

      expect(window.location.href).toBe('/');
    });
  });
});
