import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Spinner } from '../ui/Spinner';

describe('Spinner', () => {
  it('should render with role="status"', () => {
    render(<Spinner />);

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('should have accessible label', () => {
    render(<Spinner />);

    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Loading');
  });

  it('should apply medium size by default', () => {
    render(<Spinner />);

    const spinner = screen.getByRole('status');
    expect(spinner.className).toContain('md');
  });

  it('should apply small size', () => {
    render(<Spinner size="sm" />);

    const spinner = screen.getByRole('status');
    expect(spinner.className).toContain('sm');
  });

  it('should apply large size', () => {
    render(<Spinner size="lg" />);

    const spinner = screen.getByRole('status');
    expect(spinner.className).toContain('lg');
  });

  it('should merge custom className', () => {
    render(<Spinner className="custom-class" />);

    const spinner = screen.getByRole('status');
    expect(spinner.className).toContain('custom-class');
  });

  it('should have spinner base class', () => {
    render(<Spinner />);

    const spinner = screen.getByRole('status');
    expect(spinner.className).toContain('spinner');
  });
});
