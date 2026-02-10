# Claude Context: Stream Retriever Frontend

## Tech Stack
Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · SWR · Native Fetch

## Overview
Frontend for **Stream Retriever** (Twitch OAuth integration). Backend: Spring Boot @ `http://localhost:8080`.

## Critical Rules

### Do NOT Create Summary Files
Type summaries in chat unless explicitly asked to create a file.

### HttpOnly Cookie Authentication
**NOT localStorage!** Backend sets JWT in HttpOnly cookie (`jwt_token`). Frontend never touches tokens.
- **All API calls MUST use `credentials: 'include'`** (native fetch, NOT Axios)
- API base path: `/v1/` (e.g. `/v1/users/me`, `/v1/auth/logout`)

### Middleware
`src/middleware.ts` checks the `jwt_token` cookie for route protection:
- `/dashboard/*` requires cookie → redirects to `/` if missing
- `/` redirects to `/dashboard` if cookie present
- `/auth/callback` always passes through

## Project Structure
```
src/
├── app/                  # Next.js App Router pages
│   ├── auth/callback/    # OAuth callback handler
│   └── dashboard/        # Protected dashboard (has its own layout with sidebar)
├── components/           # React components
│   ├── ui/               # Reusable UI (Button, Spinner, Sidebar, NavItem, NavGroup, Icons)
│   ├── DashboardContent  # Main dashboard view
│   └── DashboardSidebar  # Navigation sidebar
├── hooks/                # Custom React hooks (useUser)
├── middleware.ts          # Route protection via cookie check
├── services/             # API client (apiService.ts) & auth helpers (authService.ts)
└── types/                # TypeScript definitions
```

## Testing
- **Unit/Integration**: Vitest + React Testing Library + MSW
- **E2E**: Playwright (Chromium, Firefox, WebKit)
- Commands: `/runlocaltests` (unit only), `/runalltests` (unit + E2E)

---
**Need more context?** Check `/docs/*.md` for technical details on specific areas.
