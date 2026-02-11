import styles from './Card.module.css';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'header' | 'inner';
  className?: string;
}

export function Card({ children, variant = 'default', className = '' }: CardProps) {
  return (
    <div className={`${styles[variant]} ${className}`}>
      {children}
    </div>
  );
}
