import styles from './Sidebar.module.css';

interface SidebarProps {
  header?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export function Sidebar({ header, children, footer, className = '' }: SidebarProps) {
  return (
    <aside className={`${styles.sidebar} ${className}`}>
      <div className={styles.noise} />
      <div className={styles.glow} />

      {header && (
        <div className={styles.header}>
          {header}
        </div>
      )}

      <nav className={styles.nav}>
        {children}
      </nav>

      {footer && (
        <div className={styles.footer}>
          {footer}
        </div>
      )}
    </aside>
  );
}
