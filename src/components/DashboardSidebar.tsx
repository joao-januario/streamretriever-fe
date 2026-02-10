'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { authService } from '@/services/authService';
import { useUser } from '@/hooks/useUser';
import { Sidebar } from '@/components/ui/Sidebar';
import { NavItem } from '@/components/ui/NavItem';
import { NavGroup } from '@/components/ui/NavGroup';
import {
  HomeIcon,
  LayersIcon,
  ChatBubbleIcon,
  BellIcon,
  BookOpenIcon,
  RectangleGroupIcon,
  SparklesIcon,
  Cog6ToothIcon,
  ArrowRightStartOnRectangleIcon,
} from '@/components/ui/Icons';

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <Sidebar
      header={
        <div className="flex items-center gap-3">
          {user?.profileImageUrl ? (
            <Image
              src={user.profileImageUrl}
              alt="Profile"
              width={32}
              height={32}
              className="rounded-full ring-2 ring-[var(--accent)]/20"
            />
          ) : (
            <div
              className="w-8 h-8 rounded-full ring-2 ring-[var(--accent)]/20"
              style={{ background: 'var(--sidebar-surface-hover)' }}
            />
          )}
          <div className="flex flex-col min-w-0">
            <span
              className="font-semibold text-sm truncate tracking-tight"
              style={{ color: 'var(--sidebar-text-primary)' }}
            >
              Stream Retriever
            </span>
            {user?.username && (
              <span
                className="text-xs truncate"
                style={{ color: 'var(--sidebar-text-muted)' }}
              >
                {user.username}
              </span>
            )}
          </div>
        </div>
      }
      footer={
        <>
          <NavItem
            icon={<SparklesIcon />}
            label="Premium"
            href="/dashboard/premium"
            active={pathname.startsWith('/dashboard/premium')}
            variant="premium"
          />
          <NavItem
            icon={<Cog6ToothIcon />}
            label="Settings"
            href="/dashboard/settings"
            active={pathname.startsWith('/dashboard/settings')}
          />
          <NavItem
            icon={<ArrowRightStartOnRectangleIcon />}
            label="Logout"
            onClick={() => authService.logout()}
          />
        </>
      }
    >
      <NavItem
        icon={<HomeIcon />}
        label="Home"
        href="/dashboard"
        active={pathname === '/dashboard'}
      />
      <NavGroup
        icon={<LayersIcon />}
        label="Sources"
        defaultOpen={true}
      >
        <NavItem
          icon={<ChatBubbleIcon />}
          label="Chat"
          href="/dashboard/sources/chat"
          active={pathname === '/dashboard/sources/chat'}
        />
        <NavItem
          icon={<BellIcon />}
          label="Alerts"
          href="/dashboard/sources/alerts"
          active={pathname === '/dashboard/sources/alerts'}
        />
      </NavGroup>
      <NavGroup
        icon={<BookOpenIcon />}
        label="Library"
      />
      <NavGroup
        icon={<RectangleGroupIcon />}
        label="Panels"
      />
    </Sidebar>
  );
}
