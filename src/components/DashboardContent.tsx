'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { apiService } from '@/services/apiService';
import { authService } from '@/services/authService';
import { User } from '@/types/user';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';

export default function DashboardContent() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Middleware already verified we have a valid cookie
    // Just load the user data
    console.log('DashboardContent - Loading user data');
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      setLoading(true);
      setError(null);
      const userData = await apiService.getCurrentUser();
      console.log('DashboardContent - User data received:', userData);
      setUser(userData);
    } catch (err) {
      console.error('DashboardContent - Error fetching user data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load user data');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
  };

  if (loading) {
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
        <Button onClick={loadUserData} variant="secondary" size="sm" className="ml-2">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold">🎮 Dashboard</h1>

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

          <div className="mt-8 flex gap-3">
            <Button onClick={loadUserData} variant="secondary">
              Refresh Data
            </Button>
            <Button onClick={handleLogout} variant="danger">
              Logout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
