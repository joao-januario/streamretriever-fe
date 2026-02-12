import { User } from '@/types/user';
import { Element, ElementChat, CreateChatElementRequest, UpdateChatElementRequest } from '@/types/element';

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

  async getElements(): Promise<Element[]> {
    return fetchWithAuth<Element[]>(`${API_BASE}/elements`);
  },

  async getElementById(id: number): Promise<Element> {
    return fetchWithAuth<Element>(`${API_BASE}/elements/${id}`);
  },

  async createChatElement(data: CreateChatElementRequest): Promise<Element> {
    const params = new URLSearchParams({ name: data.name });
    return fetchWithAuth<Element>(`${API_BASE}/elements/chat?${params}`, {
      method: 'POST',
      body: JSON.stringify(data.settings),
    });
  },

  async updateChatElement(id: number, data: UpdateChatElementRequest): Promise<ElementChat> {
    return fetchWithAuth<ElementChat>(`${API_BASE}/elements/${id}/chat`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  async deleteElement(id: number): Promise<void> {
    const response = await fetch(`${API_BASE}/elements/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (response.status === 401) throw new Error('Unauthorized');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  },
};
