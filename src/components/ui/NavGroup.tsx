'use client';

import { useState } from 'react';
import { ChevronDownIcon } from '@/components/ui/Icons';

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
        className="group flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium text-[var(--sidebar-text-secondary)] hover:text-[var(--sidebar-text-primary)] hover:bg-[var(--sidebar-surface-hover)] transition-all duration-[var(--duration-normal)] ease-[var(--ease-smooth)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/50"
      >
        {icon && (
          <span className="w-5 h-5 flex-shrink-0 transition-transform duration-[var(--duration-fast)] ease-[var(--ease-spring)] group-hover:scale-110">
            {icon}
          </span>
        )}
        <span className="flex-1 text-left">{label}</span>
        <ChevronDownIcon
          className={`w-4 h-4 text-[var(--sidebar-text-muted)] transition-transform duration-[var(--duration-normal)] ease-[var(--ease-spring)] ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Animated expand/collapse via CSS grid trick */}
      <div
        className="nav-group-content"
        data-open={isOpen}
      >
        <div>
          <div className="ml-4 mt-1 space-y-1 py-0.5">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
