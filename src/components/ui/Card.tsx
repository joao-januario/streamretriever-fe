import styles from './Card.module.css';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'header' | 'inner';
  className?: string;
}

export function Card({ children, variant = 'default', className = '' }: CardProps) {
  return (
    <div className={`rounded-2xl border p-6 ${styles[variant]} ${className}`}>
      {children}
    </div>
  );
}
