'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { useUser } from '@/hooks/useUser';

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
    <div className="p-5">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {user && (
        <div className="mt-5">
          <h2 className="text-2xl">Welcome, {user.username}!</h2>

          <div className="mt-5">
            {user.profileImageUrl && (
              <Image
                src={user.profileImageUrl}
                alt="Profile"
                width={96}
                height={96}
                className="rounded-full"
              />
            )}
          </div>

          <div className="mt-5 space-y-2">
            <p><strong>Account ID:</strong> {user.accountId}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Username:</strong> {user.username}</p>
          </div>

          <div className="mt-8">
            <Button onClick={() => refetch()} variant="secondary">
              Refresh Data
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
