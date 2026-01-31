# Claude Context: Stream Retriever Frontend

## Tech Stack
Next.js 14 (App Router) · TypeScript · Tailwind CSS · Axios

## Overview
Frontend for **Stream Retriever** (Twitch OAuth integration). Backend: Spring Boot @ `http://localhost:8080`.

## Critical Rules

### 🚫 Do NOT Create Summary Files
Type summaries in chat unless explicitly asked to create a file.

### 🍪 HttpOnly Cookie Authentication
**NOT localStorage!** Backend sets JWT in HttpOnly cookie. Frontend never touches tokens.
- **All API calls MUST use `withCredentials: true`**

## Project Structure
```
src/
├── app/              # Next.js App Router pages
├── components/       # React components
├── services/         # API client (apiService.ts) & auth helpers
└── types/            # TypeScript definitions
```

---
**Need more context?** Check `/docs/*.md` for technical details on specific areas.
