# Testing Infrastructure

This document describes the testing setup for the Stream Retriever Frontend.

## Tech Stack

| Layer | Tool | Purpose |
|-------|------|---------|
| Unit/Integration | **Vitest** | Fast test runner with native ESM support |
| Component Testing | **React Testing Library** | Tests user behavior, not implementation |
| E2E | **Playwright** | Cross-browser end-to-end testing |
| API Mocking | **MSW** | Intercepts network requests in tests |

## Running Tests

```bash
# Unit & Integration Tests
npm test              # Watch mode
npm test -- --run     # Single run
npm run test:ui       # Interactive UI
npm run test:coverage # With coverage report

# E2E Tests
npm run test:e2e              # Run all E2E tests
npm run test:e2e:ui           # Interactive UI mode
npm run test:e2e:integration  # Against real backend (requires backend running)
```

## Claude Commands

Two custom commands are available for automated test runs:

- `/runlocaltests` - Runs unit/integration tests, auto-fixes failures
- `/runalltests` - Runs all tests including E2E, fixes frontend issues, reports backend issues

## Project Structure

```
src/
├── test/
│   ├── setup.ts              # Test setup (jest-dom, MSW lifecycle)
│   └── mocks/
│       ├── handlers.ts       # MSW request handlers
│       └── server.ts         # MSW server instance
├── services/
│   └── __tests__/
│       ├── apiService.test.ts
│       └── authService.test.ts
├── hooks/
│   └── __tests__/
│       └── useUser.test.ts
└── components/
    └── __tests__/
        ├── Button.test.tsx
        ├── Spinner.test.tsx
        ├── AuthCallback.test.tsx
        ├── DashboardContent.test.tsx
        └── ChatElementSettings.test.tsx
e2e/
├── auth.spec.ts              # Login/logout flows
└── dashboard.spec.ts         # Protected route behavior
.claude/
└── commands/
    ├── runlocaltests.md
    └── runalltests.md
vitest.config.ts
playwright.config.ts
```

## Test Coverage

### Unit Tests

**Services:**
- `apiService` - fetchWithAuth success, 401 redirect, error handling, network failures
- `authService` - OAuth redirect URL construction, logout with redirect

**Hooks:**
- `useUser` - Loading state, success state, error handling, refetch function

**Components:**
- `Button` - Variants (primary/secondary/danger), sizes (sm/md/lg), click events, HTML attributes
- `Spinner` - Sizes, accessibility (role="status", aria-label)
- `AuthCallback` - Success redirect to dashboard, error redirect to home
- `DashboardContent` - Loading spinner, user data display, error state, logout button
- `ChatElementSettings` - Settings form rendering, preset mappings, save/create/delete flows, preview rendering

**Hooks:**
- `useElements` - Element CRUD operations, SWR caching, 401 redirect, error handling

### E2E Tests

**Auth Flow:**
- Home page shows login button
- Login redirects to OAuth
- Callback redirects to dashboard on success
- Callback redirects to home on error

**Protected Routes:**
- Unauthenticated users cannot access dashboard

## Writing New Tests

### Unit/Integration Test Example

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MyComponent } from '../MyComponent';

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(<MyComponent />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
```

### Mocking API Responses

```typescript
import { server } from '@/test/mocks/server';
import { http, HttpResponse } from 'msw';

it('should handle custom response', () => {
  server.use(
    http.get('http://localhost:8080/v1/users/me', () => {
      return HttpResponse.json({ username: 'custom' });
    })
  );
  // ... test code
});
```

### E2E Test Example

```typescript
import { test, expect } from '@playwright/test';

test('should navigate to dashboard', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /login/i }).click();
  await expect(page).toHaveURL('/dashboard');
});
```

## Configuration

### Vitest (`vitest.config.ts`)
- Environment: jsdom
- Setup file: `src/test/setup.ts`
- Path alias: `@/` maps to `src/`
- API URL defined at build time for tests

### Playwright (`playwright.config.ts`)
- Browsers: Chromium, Firefox, WebKit
- Base URL: `http://localhost:3000`
- Auto-starts dev server for tests
- `REAL_BACKEND=true` flag for integration mode

## MSW Mock Handlers

Default handlers in `src/test/mocks/handlers.ts`:

| Endpoint | Method | Response |
|----------|--------|----------|
| `/v1/users/me` | GET | Mock user object |
| `/v1/auth/token` | GET | Mock auth response |
| `/v1/auth/logout` | POST | 200 OK |
| `/v1/elements` | GET | Mock elements array |
| `/v1/elements/chat` | POST | Created element with chat settings |
| `/v1/elements/:id/chat` | PATCH | Updated chat settings |
| `/v1/elements/:id` | DELETE | 204 No Content |

Error variants available for testing failure scenarios:
- `errorHandlers.unauthorized` - 401 response for `/v1/users/me`
- `errorHandlers.serverError` - 500 response for `/v1/users/me`
- `errorHandlers.networkError` - Network failure for `/v1/users/me`
- `errorHandlers.elementsEmpty` - Empty elements array
- `errorHandlers.elementsSaveError` - 500 on PATCH

---
*Last updated: February 12, 2026*