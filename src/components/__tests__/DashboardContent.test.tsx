import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { SWRConfig } from 'swr';
import DashboardContent from '../DashboardContent';
import { server } from '@/test/mocks/server';
import { errorHandlers, mockUser } from '@/test/mocks/handlers';

// Mock next/image
vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: { src: string; alt: string }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} {...props} />;
  },
}));

// Mock next/navigation (useUser now uses useRouter)
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  }),
}));

function renderWithSWRConfig(ui: React.ReactElement) {
  return render(
    <SWRConfig value={{ dedupingInterval: 0, provider: () => new Map() }}>
      {ui}
    </SWRConfig>
  );
}

describe('DashboardContent', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should show spinner while loading', () => {
    renderWithSWRConfig(<DashboardContent />);

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('should display user data on success', async () => {
    renderWithSWRConfig(<DashboardContent />);

    await waitFor(() => {
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });

    expect(screen.getByRole('heading', { name: mockUser.username })).toBeInTheDocument();
    expect(screen.getAllByText(mockUser.email).length).toBeGreaterThan(0);
    expect(screen.getByText(mockUser.accountId.toString())).toBeInTheDocument();
  });

  it('should display profile image when available', async () => {
    renderWithSWRConfig(<DashboardContent />);

    await waitFor(() => {
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });

    const image = screen.getByAltText('Profile');
    expect(image).toHaveAttribute('src', mockUser.profileImageUrl);
  });

  it('should display error state with retry button', async () => {
    server.use(errorHandlers.serverError);

    renderWithSWRConfig(<DashboardContent />);

    await waitFor(() => {
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });

    expect(screen.getByText(/Error:/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Retry' })).toBeInTheDocument();
  });

  it('should show refresh data button', async () => {
    renderWithSWRConfig(<DashboardContent />);

    await waitFor(() => {
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });

    expect(screen.getByRole('button', { name: 'Refresh Data' })).toBeInTheDocument();
  });
});
