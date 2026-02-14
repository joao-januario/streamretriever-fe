'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Sidebar } from '@/components/ui/Sidebar';
import { NavItem } from '@/components/ui/NavItem';
import { NavGroup } from '@/components/ui/NavGroup';
import navItemStyles from '@/components/ui/NavItem.module.css';
import sidebarStyles from '@/components/ui/Sidebar.module.css';
import {
  HomeIcon,
  LayersIcon,
  ChatBubbleIcon,
  BellIcon,
  BookOpenIcon,
  RectangleGroupIcon,
  SparklesIcon,
  Cog6ToothIcon,
} from '@/components/ui/Icons';

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar
      header={
        <div className={sidebarStyles.logoWrapper}>
          <div className={sidebarStyles.logoInner}>
            <Image
              src="/logo.svg"
              alt="Stream Retriever logo"
              width={48}
              height={48}
            />
            <span className={navItemStyles.betaBadge}>BETA</span>
          </div>
          <span className={sidebarStyles.brandTitle}>
            Stream Retriever
          </span>
        </div>
      }
      footer={
        <>
          <NavItem
            icon={<SparklesIcon />}
            label="Premium"
            href="/premium"
            active={pathname.startsWith('/premium')}
            variant="premium"
          />
          <NavItem
            icon={<Cog6ToothIcon />}
            label="Settings"
            href="/settings"
            active={pathname.startsWith('/settings')}
          />
        </>
      }
    >
      <NavItem
        icon={<HomeIcon />}
        label="Home"
        href="/home"
        active={pathname === '/home'}
      />
      <NavGroup
        icon={<LayersIcon />}
        label="Sources"
        defaultOpen={false}
      >
        <NavItem
          icon={<ChatBubbleIcon />}
          label="Chat"
          href="/sources/chat"
          active={pathname === '/sources/chat'}
        />
        <NavItem
          icon={<BellIcon />}
          label="Alerts"
          href="/sources/alerts"
          active={pathname === '/sources/alerts'}
        />
      </NavGroup>
      <NavItem
        icon={<BookOpenIcon />}
        label="Library"
        href="/library"
      />
      <NavItem
        icon={<RectangleGroupIcon />}
        label="Panels"
        href="/panels"
      />
    </Sidebar>
  );
}
