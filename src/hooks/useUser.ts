import useSWR from 'swr';
import { apiService } from '@/services/apiService';
import { User } from '@/types/user';

export function useUser() {
  const { data, error, isLoading, mutate } = useSWR<User>(
    'user',
    () => apiService.getCurrentUser()
  );

  return {
    user: data,
    isLoading,
    error: error ? (error instanceof Error ? error.message : 'Failed to load user') : null,
    refetch: mutate,
  };
}
