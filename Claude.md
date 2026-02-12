# Claude Context: Stream Retriever Frontend

## Tech Stack
Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · SWR · Native Fetch

## Overview
Frontend for **Stream Retriever** (Twitch OAuth integration). Backend: Spring Boot @ `http://localhost:8080`.

## Critical Rules

### Do NOT Create Summary Files
Type summaries in chat unless explicitly asked to create a file.

### Writing TSX and CSS
CSS lives in `.css` files, not in inline `style={{}}` props. TSX files handle structure and logic only.

### HttpOnly Cookie Authentication
**NOT localStorage!** Backend sets JWT in HttpOnly cookie (`jwt_token`). Frontend never touches tokens.
- **All API calls MUST use `credentials: 'include'`** (native fetch, NOT Axios)
- API base path: `/v1/` (e.g. `/v1/users/me`, `/v1/auth/logout`)
- On 401, `fetchWithAuth` throws `Error('Unauthorized')` — redirect is handled by `useUser` hook via `router.push('/')`
- SWR is configured with `shouldRetryOnError: false` to prevent retry loops on auth failures

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
│   │   ├── home/         # Home page + nested: premium, sources/chat, sources/alerts
│   │   ├── settings/     # User profile/settings (DashboardContent)
│   │   └── error.tsx     # Error boundary for app routes
│   ├── auth/callback/    # OAuth callback handler
│   ├── not-found.tsx     # Custom 404 page
│   └── globals.css       # Theme tokens only (CSS custom properties)
├── components/           # React components
│   ├── ui/               # Reusable UI — each component has a co-located .module.css
│   │   ├── Sidebar.tsx / Sidebar.module.css
│   │   ├── NavItem.tsx / NavItem.module.css
│   │   ├── NavGroup.tsx / NavGroup.module.css
│   │   ├── Card.tsx / Card.module.css
│   │   ├── Button.tsx, Spinner.tsx, Icons.tsx
│   ├── DashboardContent  # User profile view (rendered at /settings)
│   └── DashboardSidebar  # Navigation sidebar (logo + nav wiring)
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
- **Design quality**: Every FE change must be polished and modern. Use proper design skills — no raw browser-default controls. Toggles, checkboxes, pickers etc. must be custom-styled to match the theme.

### CSS Architecture
- **`globals.css`**: theme tokens only (CSS custom properties in `:root`) — colors, timings, etc.
- **`*.module.css`**: component-specific styles co-located next to their `.tsx` files (CSS Modules)
- **Tailwind utilities**: used inline in JSX for layout (positioning, flex, spacing)

---
**Need more context?** Check `/docs/*.md` for technical details on specific areas.
