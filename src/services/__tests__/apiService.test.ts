import { describe, it, expect, beforeEach } from 'vitest';
import { server } from '@/test/mocks/server';
import { errorHandlers, mockUser } from '@/test/mocks/handlers';
import { apiService } from '../apiService';

describe('apiService', () => {
  beforeEach(() => {
    window.location.href = '';
  });

  describe('getCurrentUser', () => {
    it('should return user data on success', async () => {
      const user = await apiService.getCurrentUser();

      expect(user).toEqual(mockUser);
    });

    it('should redirect to home on 401 unauthorized', async () => {
      server.use(errorHandlers.unauthorized);

      await expect(apiService.getCurrentUser()).rejects.toThrow('Unauthorized');
      expect(window.location.href).toBe('/');
    });

    it('should throw error on server error', async () => {
      server.use(errorHandlers.serverError);

      await expect(apiService.getCurrentUser()).rejects.toThrow('HTTP error! status: 500');
    });

    it('should throw error on network failure', async () => {
      server.use(errorHandlers.networkError);

      await expect(apiService.getCurrentUser()).rejects.toThrow();
    });
  });

  describe('refreshToken', () => {
    it('should return auth response on success', async () => {
      const response = await apiService.refreshToken();

      expect(response).toHaveProperty('token');
      expect(response).toHaveProperty('expiresAt');
    });
  });
});
