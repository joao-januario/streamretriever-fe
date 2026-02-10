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
- `/home/*` and `/settings/*` require cookie → redirects to `/` if missing
- `/` redirects to `/home` if cookie present
- `/auth/callback` always passes through

## Project Structure
```
src/
├── app/                  # Next.js App Router pages
│   ├── (app)/            # Route group — shared layout with sidebar
│   │   ├── dashboard/    # Home page (welcome message)
│   │   └── settings/     # User profile/settings (DashboardContent)
│   └── auth/callback/    # OAuth callback handler
├── components/           # React components
│   ├── ui/               # Reusable UI (Button, Spinner, Sidebar, NavItem, NavGroup, Icons)
│   ├── DashboardContent  # User profile view (rendered at /settings)
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

## Brand & Design — "Stream Retriever" Theme
- **Personality**: warm, happy, inviting — Twitch-aligned but friendlier than typical dev dashboards
- **Mascot**: golden retriever (referenced via golden amber premium color)
- **Sidebar**: light bubbly blue-to-purple gradient (`#6372e8` → `#8b5cd0`), white text
- **Main area**: dark purple, 4-layer card system (background → card → header/inner cards)
- **Accent**: Twitch purple (`#9146ff`)
- **Premium**: golden amber (`#f59e0b`) — high contrast on light sidebar
- **Card component** (`ui/Card.tsx`): variants `default` (outer), `header` (page title bar), `inner` (content sections)
- All theme tokens live in `src/app/globals.css` as CSS custom properties

---
**Need more context?** Check `/docs/*.md` for technical details on specific areas.
