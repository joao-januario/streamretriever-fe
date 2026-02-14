import { http, HttpResponse } from 'msw';
import { User } from '@/types/user';
import { Element } from '@/types/element';

const API_BASE = 'http://localhost:8080/v1';

export const mockUser: User = {
  accountId: 12345,
  username: 'testuser',
  email: 'test@example.com',
  profileImageUrl: 'https://example.com/avatar.png',
};

export const mockElements: Element[] = [
  {
    id: 1,
    name: 'Main Chat',
    elementType: 'CHAT',
    elementChat: {
      id: 1,
      fontSizePreset: 'MEDIUM',
      fontSizeCustom: null,
      strokePreset: 'OFF',
      strokeCustom: null,
      shadowPreset: 'OFF',
      shadowCustom: null,
      backgroundPreset: 'NONE',
      backgroundCustom: null,
      fontFamily: 'Open Sans',
      fontColor: '#ffffff',
      fontWeight: 'normal',
      strokeColor: '#000000',
      shadowColor: '#000000',
      allCaps: false,
      hideCommands: false,
      hideBadges: false,
      hideBots: true,
      fadeEnabled: false,
      fadeTime: 30,
      createdAt: '2024-01-01T00:00:00',
      updatedAt: '2024-01-01T00:00:00',
    },
    createdAt: '2024-01-01T00:00:00',
    updatedAt: '2024-01-01T00:00:00',
  },
];

export const handlers = [
  // GET /v1/users/me
  http.get(`${API_BASE}/users/me`, () => {
    return HttpResponse.json(mockUser);
  }),

  // POST /v1/auth/logout
  http.post(`${API_BASE}/auth/logout`, () => {
    return new HttpResponse(null, { status: 200 });
  }),

  // GET /v1/elements
  http.get(`${API_BASE}/elements`, () => {
    return HttpResponse.json(mockElements);
  }),

  // POST /v1/elements/chat?name=...
  http.post(`${API_BASE}/elements/chat`, async ({ request }) => {
    const url = new URL(request.url);
    const name = url.searchParams.get('name') || 'New Chat';
    const body = await request.json() as Record<string, unknown>;
    return HttpResponse.json({
      ...mockElements[0],
      id: 2,
      name,
      elementChat: { ...mockElements[0].elementChat, ...body },
    });
  }),

  // PATCH /v1/elements/:id/chat
  http.patch(`${API_BASE}/elements/:id/chat`, async ({ request }) => {
    const body = await request.json() as Record<string, unknown>;
    return HttpResponse.json({ ...mockElements[0].elementChat, ...body });
  }),

  // DELETE /v1/elements/:id
  http.delete(`${API_BASE}/elements/:id`, () => {
    return new HttpResponse(null, { status: 204 });
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

  elementsEmpty: http.get(`${API_BASE}/elements`, () => {
    return HttpResponse.json([]);
  }),

  elementsSaveError: http.patch(`${API_BASE}/elements/:id/chat`, () => {
    return new HttpResponse(null, { status: 500 });
  }),
};
