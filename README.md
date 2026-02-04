# Stream Retriever Frontend

Next.js frontend for Stream Retriever - a Twitch OAuth integration application.

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Axios** (API client)
- **SWR** (Data fetching & caching)

## Getting Started

### Prerequisites

- Node.js 18+
- Backend running at `http://localhost:8080`

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

### Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # React components
│   └── ui/           # Reusable UI components (Button, Spinner)
├── hooks/            # Custom React hooks (useUser)
├── services/         # API client & auth helpers
└── types/            # TypeScript definitions
```

## Authentication

Uses HttpOnly cookie-based JWT authentication with Twitch OAuth2. See [docs/authentication.md](docs/authentication.md) for details.

## Key Features

- **Twitch OAuth Login** - Secure authentication via backend OAuth flow
- **User Dashboard** - Display authenticated user profile
- **SWR Data Fetching** - Automatic caching and revalidation with `useUser` hook
