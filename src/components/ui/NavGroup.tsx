'use client';

import { useState } from 'react';
import { ChevronDownIcon } from '@/components/ui/Icons';
import styles from './NavGroup.module.css';

interface NavGroupProps {
  icon?: React.ReactNode;
  label: string;
  children?: React.ReactNode;
  defaultOpen?: boolean;
}

export function NavGroup({ icon, label, children, defaultOpen = false }: NavGroupProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={styles.button}
      >
        {icon && (
          <span className={styles.icon}>
            {icon}
          </span>
        )}
        <span className={styles.label}>{label}</span>
        <ChevronDownIcon
          className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
        />
      </button>

      <div
        className={styles.content}
        data-open={isOpen}
      >
        <div>
          <div className={styles.children}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
