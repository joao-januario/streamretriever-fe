import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import AuthCallback from '../AuthCallback';

// Mock Next.js navigation
const mockPush = vi.fn();
const mockGet = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  useSearchParams: () => ({
    get: mockGet,
  }),
}));

describe('AuthCallback', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGet.mockReturnValue(null);
  });

  it('should show spinner while processing', () => {
    render(<AuthCallback />);

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('should redirect to dashboard on success', async () => {
    render(<AuthCallback />);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('should redirect to home with error on auth failure', async () => {
    mockGet.mockImplementation((param: string) => {
      if (param === 'error') return 'access_denied';
      return null;
    });

    render(<AuthCallback />);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/?error=auth_failed');
    });
  });
});
