import { describe, it, expect, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { SWRConfig } from 'swr';
import { createElement } from 'react';
import { useUser } from '../useUser';
import { server } from '@/test/mocks/server';
import { errorHandlers, mockUser } from '@/test/mocks/handlers';

const mockPush = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  }),
}));

// Wrapper to disable SWR cache between tests
function wrapper({ children }: { children: React.ReactNode }) {
  return createElement(
    SWRConfig,
    { value: { dedupingInterval: 0, provider: () => new Map() } },
    children
  );
}

describe('useUser', () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it('should return loading state initially', () => {
    const { result } = renderHook(() => useUser(), { wrapper });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.user).toBeUndefined();
    expect(result.current.error).toBeNull();
  });

  it('should return user data on success', async () => {
    const { result } = renderHook(() => useUser(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.error).toBeNull();
  });

  it('should return error message on failure', async () => {
    server.use(errorHandlers.serverError);

    const { result } = renderHook(() => useUser(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.user).toBeUndefined();
    expect(result.current.error).toBeTruthy();
  });

  it('should redirect to / on 401 unauthorized', async () => {
    server.use(errorHandlers.unauthorized);

    const { result } = renderHook(() => useUser(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toBe('Unauthorized');
    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('should provide refetch function', async () => {
    const { result } = renderHook(() => useUser(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(typeof result.current.refetch).toBe('function');
  });
});
