import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { authService } from '../authService';

describe('authService', () => {
  const originalLocation = window.location;
  let hrefSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    hrefSpy = vi.fn();
    // Replace window.location with a mock that captures href assignments
    Object.defineProperty(window, 'location', {
      value: {
        ...originalLocation,
        href: '',
        pathname: '/',
        assign: vi.fn(),
        replace: vi.fn(),
        reload: vi.fn(),
      },
      writable: true,
      configurable: true,
    });
    // Override href to be a spy-able setter
    Object.defineProperty(window.location, 'href', {
      set: hrefSpy,
      get: () => '',
      configurable: true,
    });
  });

  afterEach(() => {
    Object.defineProperty(window, 'location', {
      value: originalLocation,
      writable: true,
      configurable: true,
    });
  });

  describe('login', () => {
    it('should redirect to Twitch OAuth endpoint', () => {
      authService.login();

      expect(hrefSpy).toHaveBeenCalledWith(
        expect.stringContaining('/oauth2/authorization/twitch')
      );
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
      expect(hrefSpy).toHaveBeenCalledWith('/');
    });

    it('should redirect to home even on logout error', async () => {
      vi.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('Network error'));

      await authService.logout();

      expect(hrefSpy).toHaveBeenCalledWith('/');
    });
  });
});
