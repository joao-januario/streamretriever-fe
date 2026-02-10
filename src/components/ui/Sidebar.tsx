interface SidebarProps {
  header?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export function Sidebar({ header, children, footer, className = '' }: SidebarProps) {
  return (
    <aside
      className={`relative flex flex-col h-full w-64 flex-shrink-0 overflow-hidden ${className}`}
      style={{
        background: `linear-gradient(180deg, var(--sidebar-bg-from) 0%, var(--sidebar-bg-via) 40%, var(--sidebar-bg-to) 100%)`,
        borderRight: '1px solid var(--sidebar-border)',
        animation: 'sidebar-fade-in var(--duration-slow) var(--ease-smooth) both',
      }}
    >
      {/* Noise texture overlay for atmosphere */}
      <div className="sidebar-noise absolute inset-0 pointer-events-none" />

      {/* Subtle radial glow at top for depth */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, var(--accent-glow) 0%, transparent 70%)',
          filter: 'blur(40px)',
          opacity: 0.5,
        }}
      />

      {/* Header */}
      {header && (
        <div
          className="relative z-10 px-4 py-5"
          style={{
            borderBottom: '1px solid var(--sidebar-border)',
          }}
        >
          {header}
        </div>
      )}

      {/* Navigation */}
      <nav className="relative z-10 flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {children}
      </nav>

      {/* Footer */}
      {footer && (
        <div
          className="relative z-10 px-3 py-4 space-y-1"
          style={{
            borderTop: '1px solid var(--sidebar-border)',
            background: 'linear-gradient(to top, rgba(0,0,0,0.2) 0%, transparent 100%)',
          }}
        >
          {footer}
        </div>
      )}
    </aside>
  );
}
