# Authentication

## Authentication Flow
HttpOnly Cookie-based JWT with Twitch OAuth2. Backend generates JWT + sets HttpOnly cookie → frontend sends cookie automatically with requests.

## Flow

1. **Login**: Redirect to `http://localhost:8080/oauth2/authorization/twitch`
2. **Callback**: Backend sets cookie → redirects to `/auth/callback` → frontend redirects to `/dashboard`
3. **Authenticated Requests**: Browser automatically sends cookie with `withCredentials: true`
4. **Logout**: `POST /api/auth/logout` → backend clears cookie

## API Endpoints

### Public
- `/oauth2/**` - OAuth flow (handled by backend)
- `/login/**` - OAuth callback (handled by backend)

### Protected (Requires Cookie)
- `GET /api/users/me` - Returns current user. 401 if invalid/expired.

## Implementation

### Services

**`apiService.ts`**
```typescript
const apiService = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
  withCredentials: true,  // Required for cookies
  headers: { 'Content-Type': 'application/json' },
});

// Auto-redirect on 401
apiService.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);
```

**`authService.ts`**
- `login()`: Redirects to backend OAuth endpoint
- `logout()`: Calls backend logout + redirects to home
- Helper functions for auth state checks

### Pages

**`app/auth/callback/page.tsx`**
OAuth callback handler. Cookie already set by backend, just redirects to dashboard.

**`app/dashboard/page.tsx`**
Protected route example using `apiService`.

### Hooks

**`hooks/useUser.ts`**
SWR-powered hook for fetching and caching current user data.
```typescript
const { user, isLoading, error, refetch } = useUser();
```

## Configuration

- **Backend URL**: `http://localhost:8080` (development)
- **CORS**: Backend must allow credentials from frontend origin
- **Cookie Security**: HttpOnly, Secure (production), SameSite=Lax, 24hr expiration

## Debugging

- **Cookie**: DevTools > Application > Cookies > `localhost:8080`
- **Request**: DevTools > Network > Headers > `Cookie: JWT=...`
- **401 Errors**: Check `withCredentials: true` in apiService

---
*Last updated: February 1, 2026*
