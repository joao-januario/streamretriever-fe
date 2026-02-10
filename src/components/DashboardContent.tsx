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
      <div className="p-6">
        <Card>
          <p className="text-red-400 mb-3">Error: {error}</p>
          <Button onClick={() => refetch()} variant="secondary" size="sm">
            Retry
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 h-full">
      <Card className="h-full flex flex-col !p-0 overflow-hidden">
        <Card variant="header" className="!rounded-none !border-0 px-8 py-8">
          <h1 className="text-2xl font-bold">Settings</h1>
        </Card>

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
                      <p className="text-sm text-[var(--text-muted)]">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </Card>

                <Card variant="inner">
                  <h3 className="text-lg font-semibold mb-4">Account Details</h3>
                  <div className="space-y-3 text-sm text-[var(--text-muted)]">
                    <div className="flex justify-between">
                      <span>Account ID</span>
                      <span className="text-[var(--foreground)]">{user.accountId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Email</span>
                      <span className="text-[var(--foreground)]">{user.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Username</span>
                      <span className="text-[var(--foreground)]">{user.username}</span>
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
      </Card>
    </div>
  );
}
