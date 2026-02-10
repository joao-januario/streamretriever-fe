import styles from './Sidebar.module.css';

interface SidebarProps {
  header?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export function Sidebar({ header, children, footer, className = '' }: SidebarProps) {
  return (
    <aside
      className={`${styles.sidebar} relative flex flex-col h-full w-64 flex-shrink-0 overflow-hidden ${className}`}
    >
      {/* Noise texture overlay for atmosphere */}
      <div className={`${styles.noise} absolute inset-0 pointer-events-none`} />

      {/* Subtle radial glow at top for depth */}
      <div
        className={`${styles.glow} absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 pointer-events-none`}
      />

      {/* Header */}
      {header && (
        <div className={`${styles.header} relative z-10 px-4 py-5`}>
          {header}
        </div>
      )}

      {/* Navigation */}
      <nav className="relative z-10 flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {children}
      </nav>

      {/* Footer */}
      {footer && (
        <div className={`${styles.footer} relative z-10 px-3 py-4 space-y-1`}>
          {footer}
        </div>
      )}
    </aside>
  );
}
