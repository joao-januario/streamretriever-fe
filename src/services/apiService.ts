import { User } from '@/types/user';

const API_BASE = `${process.env.NEXT_PUBLIC_API_URL}/v1`;

async function fetchWithAuth<T>(url: string, options: RequestInit = {}): Promise<T> {
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
    throw new Error('Unauthorized');
  }

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json() as T;
}

export const apiService = {
  async getCurrentUser(): Promise<User> {
    return fetchWithAuth<User>(`${API_BASE}/users/me`);
  },
};
