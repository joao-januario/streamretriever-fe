interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'danger' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseStyles = [
    'rounded-lg font-medium',
    'transition-all duration-[var(--duration-normal)] ease-[var(--ease-smooth)]',
    'active:scale-[0.97]',
    'outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]',
    'disabled:opacity-50 disabled:pointer-events-none',
  ].join(' ');

  const variants = {
    primary: [
      'bg-[var(--btn-primary-bg)] text-white',
      'hover:bg-[var(--btn-primary-hover)] hover:shadow-lg hover:shadow-[var(--btn-primary-bg)]/25',
      'focus-visible:ring-[var(--btn-primary-bg)]',
    ].join(' '),
    secondary: [
      'bg-[var(--btn-secondary-bg)] text-[var(--sidebar-text-primary)]',
      'hover:bg-[var(--btn-secondary-hover)]',
      'focus-visible:ring-[var(--btn-secondary-hover)]',
      'border border-[var(--sidebar-border)]',
    ].join(' '),
    danger: [
      'bg-[var(--btn-danger-bg)] text-white',
      'hover:bg-[var(--btn-danger-hover)] hover:shadow-lg hover:shadow-[var(--btn-danger-bg)]/25',
      'focus-visible:ring-[var(--btn-danger-bg)]',
    ].join(' '),
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
