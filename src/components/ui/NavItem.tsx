'use client';

import Link from 'next/link';
import styles from './NavItem.module.css';

interface NavItemProps {
  icon?: React.ReactNode;
  label: string;
  href?: string;
  active?: boolean;
  variant?: 'default' | 'premium';
  onClick?: () => void;
  className?: string;
}

export function NavItem({
  icon,
  label,
  href,
  active = false,
  variant = 'default',
  onClick,
  className = '',
}: NavItemProps) {
  const isDefault = variant === 'default';
  const isPremium = variant === 'premium';

  const baseStyles = [
    'group relative flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium w-full',
    'transition-all duration-[var(--duration-normal)] ease-[var(--ease-smooth)]',
    'outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/50',
  ].join(' ');

  const stateStyles = (() => {
    if (isPremium) {
      return active
        ? `text-[var(--premium)] ${styles.premiumOverlay} ${styles.premiumOverlayActive}`
        : `text-[var(--premium)] ${styles.premiumOverlay}`;
    }
    return active
      ? 'text-[var(--sidebar-text-primary)] bg-[var(--sidebar-surface-hover)]'
      : 'text-[var(--sidebar-text-secondary)] hover:text-[var(--sidebar-text-primary)] hover:bg-[var(--sidebar-surface-hover)]';
  })();

  const combinedStyles = `${baseStyles} ${stateStyles} ${className}`;

  const content = (
    <>
      {/* Active state indicator bar */}
      {active && isDefault && <span className={styles.activeIndicator} />}
      {active && isPremium && <span className={styles.premiumIndicator} />}

      {/* Icon with hover lift */}
      {icon && (
        <span
          className="w-5 h-5 flex-shrink-0 transition-transform duration-[var(--duration-fast)] ease-[var(--ease-spring)] group-hover:scale-110"
        >
          {icon}
        </span>
      )}

      {/* Label */}
      <span className="truncate">{label}</span>

      {/* Hover glow effect (subtle background bloom) */}
      <span
        className={`absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-[var(--duration-normal)] pointer-events-none ${isPremium ? styles.hoverGlowPremium : styles.hoverGlow}`}
      />
    </>
  );

  if (href) {
    return (
      <Link href={href} className={combinedStyles} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className={combinedStyles} onClick={onClick}>
      {content}
    </button>
  );
}
