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

  const variantClass = (() => {
    if (isPremium) {
      return active
        ? `${styles.premiumActive} ${styles.premiumOverlay} ${styles.premiumOverlayActive}`
        : `${styles.premiumInactive} ${styles.premiumOverlay}`;
    }
    return active ? styles.defaultActive : styles.defaultInactive;
  })();

  const combinedStyles = `${styles.navItem} ${variantClass} ${className}`;

  const content = (
    <>
      {active && isDefault && <span className={styles.activeIndicator} />}
      {active && isPremium && <span className={styles.premiumIndicator} />}

      {icon && (
        <span className={styles.icon}>
          {icon}
        </span>
      )}

      <span className={styles.label}>{label}</span>

      <span className={isPremium ? styles.hoverGlowPremium : styles.hoverGlow} />
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
