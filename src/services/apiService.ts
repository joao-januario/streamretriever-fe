import { User, AuthResponse } from '@/types/user';

const API_BASE = `${process.env.NEXT_PUBLIC_API_URL}/v1`;

async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // credentials: 'include' sends HttpOnly cookies automatically
  const response = await fetch(url, {
    ...options,
    headers,
    credentials: 'include', // Critical: sends cookies with request
  });

  if (response.status === 401) {
    // Token is invalid or expired
    console.error('Unauthorized - redirecting to login');
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
    throw new Error('Unauthorized');
  }

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export const apiService = {
  async getCurrentUser(): Promise<User> {
    return fetchWithAuth(`${API_BASE}/users/me`);
  },

  async refreshToken(): Promise<AuthResponse> {
    return fetchWithAuth(`${API_BASE}/auth/token`);
  }
};
