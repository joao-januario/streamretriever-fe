interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'header' | 'inner';
  className?: string;
}

const variantStyles = {
  default: { bg: 'var(--card-bg)', border: 'var(--card-border)' },
  header: { bg: 'var(--card-header-bg)', border: 'var(--card-inner-border)' },
  inner: { bg: 'var(--card-inner-bg)', border: 'var(--card-inner-border)' },
};

export function Card({ children, variant = 'default', className = '' }: CardProps) {
  const { bg, border } = variantStyles[variant];

  return (
    <div
      className={`rounded-2xl border p-6 ${className}`}
      style={{
        background: bg,
        borderColor: border,
      }}
    >
      {children}
    </div>
  );
}
