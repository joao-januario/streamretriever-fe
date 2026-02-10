import { http, HttpResponse } from 'msw';
import { User } from '@/types/user';

const API_BASE = 'http://localhost:8080/v1';

export const mockUser: User = {
  accountId: 12345,
  username: 'testuser',
  email: 'test@example.com',
  profileImageUrl: 'https://example.com/avatar.png',
};

export const handlers = [
  // GET /v1/users/me
  http.get(`${API_BASE}/users/me`, () => {
    return HttpResponse.json(mockUser);
  }),

  // POST /v1/auth/logout
  http.post(`${API_BASE}/auth/logout`, () => {
    return new HttpResponse(null, { status: 200 });
  }),
];

// Handler variations for testing different scenarios
export const errorHandlers = {
  unauthorized: http.get(`${API_BASE}/users/me`, () => {
    return new HttpResponse(null, { status: 401 });
  }),

  serverError: http.get(`${API_BASE}/users/me`, () => {
    return new HttpResponse(null, { status: 500 });
  }),

  networkError: http.get(`${API_BASE}/users/me`, () => {
    return HttpResponse.error();
  }),
};
