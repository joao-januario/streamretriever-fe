import { describe, it, expect } from 'vitest';
import { server } from '@/test/mocks/server';
import { errorHandlers, mockUser } from '@/test/mocks/handlers';
import { apiService } from '../apiService';

describe('apiService', () => {
  describe('getCurrentUser', () => {
    it('should return user data on success', async () => {
      const user = await apiService.getCurrentUser();

      expect(user).toEqual(mockUser);
    });

    it('should throw Unauthorized on 401', async () => {
      server.use(errorHandlers.unauthorized);

      await expect(apiService.getCurrentUser()).rejects.toThrow('Unauthorized');
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
});
