import useSWR from 'swr';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { apiService } from '@/services/apiService';
import { User } from '@/types/user';

export function useUser() {
  const router = useRouter();
  const { data, error, isLoading, mutate } = useSWR<User>(
    'user',
    () => apiService.getCurrentUser(),
    { shouldRetryOnError: false }
  );

  useEffect(() => {
    if (error?.message === 'Unauthorized') {
      router.push('/');
    }
  }, [error, router]);

  return {
    user: data,
    isLoading,
    error: error ? (error instanceof Error ? error.message : 'Failed to load user') : null,
    refetch: mutate,
  };
}
