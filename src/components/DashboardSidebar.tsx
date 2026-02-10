'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
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
} from '@/components/ui/Icons';

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar
      header={
        <div className="flex flex-col items-center gap-2">
          <Image
            src="/logo.svg"
            alt="Stream Retriever logo"
            width={48}
            height={48}
          />
          <span
            className="font-bold text-sm tracking-tight"
            style={{ color: 'var(--sidebar-text-primary)' }}
          >
            Stream Retriever
          </span>
        </div>
      }
      footer={
        <>
          <NavItem
            icon={<SparklesIcon />}
            label="Premium"
            href="/home/premium"
            active={pathname.startsWith('/home/premium')}
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
          href="/home/sources/chat"
          active={pathname === '/home/sources/chat'}
        />
        <NavItem
          icon={<BellIcon />}
          label="Alerts"
          href="/home/sources/alerts"
          active={pathname === '/home/sources/alerts'}
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
