import useSWR from 'swr';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { apiService } from '@/services/apiService';
import { Element, CreateChatElementRequest, UpdateChatElementRequest } from '@/types/element';

export function useElements() {
  const router = useRouter();
  const { data, error, isLoading, mutate } = useSWR<Element[]>(
    'elements',
    () => apiService.getElements(),
    { shouldRetryOnError: false }
  );

  useEffect(() => {
    if (error?.message === 'Unauthorized') {
      router.push('/');
    }
  }, [error, router]);

  async function createElement(data: CreateChatElementRequest): Promise<Element> {
    const newElement = await apiService.createChatElement(data);
    await mutate();
    return newElement;
  }

  async function updateElement(id: number, data: UpdateChatElementRequest) {
    const updated = await apiService.updateChatElement(id, data);
    await mutate();
    return updated;
  }

  async function deleteElement(id: number) {
    await apiService.deleteElement(id);
    await mutate();
  }

  return {
    elements: data ?? [],
    isLoading,
    error: error ? (error instanceof Error ? error.message : 'Failed to load elements') : null,
    refetch: mutate,
    createElement,
    updateElement,
    deleteElement,
  };
}
