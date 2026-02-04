import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../ui/Button';

describe('Button', () => {
  it('should render children', () => {
    render(<Button>Click me</Button>);

    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('should handle click events', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<Button onClick={handleClick}>Click me</Button>);
    await user.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should apply primary variant by default', () => {
    render(<Button>Primary</Button>);

    const button = screen.getByRole('button');
    expect(button.className).toContain('bg-purple-600');
  });

  it('should apply secondary variant', () => {
    render(<Button variant="secondary">Secondary</Button>);

    const button = screen.getByRole('button');
    expect(button.className).toContain('bg-blue-500');
  });

  it('should apply danger variant', () => {
    render(<Button variant="danger">Danger</Button>);

    const button = screen.getByRole('button');
    expect(button.className).toContain('bg-red-500');
  });

  it('should apply small size', () => {
    render(<Button size="sm">Small</Button>);

    const button = screen.getByRole('button');
    expect(button.className).toContain('px-3');
    expect(button.className).toContain('py-1');
    expect(button.className).toContain('text-sm');
  });

  it('should apply medium size by default', () => {
    render(<Button>Medium</Button>);

    const button = screen.getByRole('button');
    expect(button.className).toContain('px-4');
    expect(button.className).toContain('py-2');
  });

  it('should apply large size', () => {
    render(<Button size="lg">Large</Button>);

    const button = screen.getByRole('button');
    expect(button.className).toContain('px-6');
    expect(button.className).toContain('py-3');
    expect(button.className).toContain('text-lg');
  });

  it('should merge custom className', () => {
    render(<Button className="custom-class">Custom</Button>);

    const button = screen.getByRole('button');
    expect(button.className).toContain('custom-class');
  });

  it('should pass through HTML button attributes', () => {
    render(<Button disabled type="submit">Disabled</Button>);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('type', 'submit');
  });
});
