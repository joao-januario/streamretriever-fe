'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { apiService } from '@/services/apiService';
import { authService } from '@/services/authService';
import { User } from '@/types/user';

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
      console.log('DashboardContent - Fetching user data from API');
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
    return <div className="p-5">Loading...</div>;
  }

  if (error) {
    return (
      <div className="p-5 text-red-600">
        Error: {error}
        <button
          onClick={loadUserData}
          className="ml-2 px-3 py-1 bg-blue-500 text-white rounded"
        >
          Retry
        </button>
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
            <button
              onClick={loadUserData}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              🔄 Refresh Data
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              🚪 Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
