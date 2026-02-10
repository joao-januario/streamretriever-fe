'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Spinner } from '@/components/ui/Spinner';
import { useUser } from '@/hooks/useUser';
import { authService } from '@/services/authService';

export default function DashboardContent() {
  const { user, isLoading, error, refetch } = useUser();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-5 text-red-600">
        Error: {error}
        <Button onClick={() => refetch()} variant="secondary" size="sm" className="ml-2">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6 h-full">
      <div
        className="h-full flex flex-col rounded-2xl border overflow-hidden"
        style={{ background: 'var(--card-bg)', borderColor: 'var(--card-border)' }}
      >
        <div className="px-8 py-8" style={{ background: 'var(--card-header-bg)' }}>
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>

        <div className="p-6 flex flex-col gap-6 flex-1">
          {user && (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card variant="inner">
                  <div className="flex items-center gap-5">
                    {user.profileImageUrl && (
                      <Image
                        src={user.profileImageUrl}
                        alt="Profile"
                        width={80}
                        height={80}
                        className="rounded-full ring-2 ring-[var(--accent)]/20"
                      />
                    )}
                    <div>
                      <h2 className="text-2xl font-semibold">{user.username}</h2>
                      <p className="text-sm" style={{ color: 'var(--sidebar-text-secondary)' }}>
                        {user.email}
                      </p>
                    </div>
                  </div>
                </Card>

                <Card variant="inner">
                  <h3 className="text-lg font-semibold mb-4">Account Details</h3>
                  <div className="space-y-3 text-sm" style={{ color: 'var(--sidebar-text-secondary)' }}>
                    <div className="flex justify-between">
                      <span>Account ID</span>
                      <span style={{ color: 'var(--foreground)' }}>{user.accountId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Email</span>
                      <span style={{ color: 'var(--foreground)' }}>{user.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Username</span>
                      <span style={{ color: 'var(--foreground)' }}>{user.username}</span>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="flex gap-3">
                <Button onClick={() => refetch()} variant="secondary">
                  Refresh Data
                </Button>
                <Button onClick={() => authService.logout()} variant="danger">
                  Logout
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
