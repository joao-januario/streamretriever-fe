# Authentication

## Authentication Flow
HttpOnly Cookie-based JWT with Twitch OAuth2. Backend generates JWT + sets HttpOnly cookie (`jwt_token`) → frontend sends cookie automatically with requests.

## Flow

1. **Login**: Redirect to `{API_BASE}/oauth2/authorization/twitch`
2. **Callback**: Backend sets cookie → redirects to `/auth/callback` → frontend redirects to `/dashboard`
3. **Authenticated Requests**: Browser automatically sends cookie with `credentials: 'include'`
4. **Logout**: `POST /v1/auth/logout` → backend clears cookie → frontend redirects to `/`

## API Endpoints

### Public
- `/oauth2/**` - OAuth flow (handled by backend)

### Protected (Requires Cookie)
- `GET /v1/users/me` - Returns current user. 401 if invalid/expired.
- `GET /v1/auth/token` - Refresh token.
- `POST /v1/auth/logout` - Logout and clear cookie.

## Route Protection (Middleware)

`src/middleware.ts` uses Next.js middleware to check the `jwt_token` cookie:

```typescript
// Matched routes: '/', '/auth/callback', '/dashboard/:path*'
// - /dashboard/* without cookie → redirect to /
// - / with cookie → redirect to /dashboard
// - /auth/callback → always passes through
```

## Implementation

### Services

**`apiService.ts`** — Native fetch wrapper with cookie auth
```typescript
const API_BASE = `${process.env.NEXT_PUBLIC_API_URL}/v1`;

async function fetchWithAuth<T>(url: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(url, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options.headers },
    credentials: 'include', // Critical: sends cookies with request
  });

  if (response.status === 401) {
    window.location.href = '/';  // Auto-redirect on 401
    throw new Error('Unauthorized');
  }
  // ...
}
```

**`authService.ts`**
- `login()`: Redirects to backend OAuth endpoint (`/oauth2/authorization/twitch`)
- `logout()`: `POST /v1/auth/logout` with `credentials: 'include'` → redirects to `/`

### Hooks

**`hooks/useUser.ts`** — SWR-powered hook for fetching and caching current user data.
```typescript
const { user, isLoading, error, refetch } = useUser();
```

### Pages

**`app/auth/callback/page.tsx`**
OAuth callback handler. Cookie already set by backend, just redirects to dashboard.

**`app/dashboard/page.tsx`**
Protected dashboard page. Uses `useUser()` hook to display user profile data.

**`app/dashboard/layout.tsx`**
Dashboard layout wrapping pages with the sidebar navigation.

## Configuration

- **Backend URL**: `NEXT_PUBLIC_API_URL` env var (defaults to `http://localhost:8080`)
- **CORS**: Backend must allow credentials from frontend origin
- **Cookie Security**: HttpOnly, Secure (production), SameSite=Lax, 24hr expiration
- **Cookie Name**: `jwt_token`

## Debugging

- **Cookie**: DevTools > Application > Cookies > look for `jwt_token`
- **Request**: DevTools > Network > Headers > `Cookie: jwt_token=...`
- **401 Errors**: Verify `credentials: 'include'` in fetch calls
- **Middleware**: Check cookie presence at `request.cookies.has('jwt_token')`

---
*Last updated: February 10, 2026*