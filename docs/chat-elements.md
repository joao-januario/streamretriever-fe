# Chat Elements

This document describes the chat element feature — the settings UI for customizing Twitch chat overlay appearance.

## Architecture

### Single-Element Model
Each user has at most **one** chat element. The chat page (`/home/sources/chat`) hides the concept of "elements" from the user — it simply shows a settings form.

- **No element yet** → form shows defaults, button says "Create"
- **Element exists** → form loads saved settings, button says "Update"
- **Delete** → removes the element, resets to defaults

### Data Flow

```
ChatPage (page.tsx)
  └── useElements hook (SWR cache)
        └── apiService (fetch with HttpOnly cookie auth)

ChatPage grabs elements[0] and passes it to ChatElementSettings.
On save: element exists → PATCH, no element → POST (with settings).
```

### API Endpoints

| Action | Method | Endpoint | Body |
|--------|--------|----------|------|
| List elements | GET | `/v1/elements` | — |
| Create chat element | POST | `/v1/elements/chat` | `{ name, settings: { fontFamily, fontSize, ... } }` |
| Update chat settings | PATCH | `/v1/elements/{id}/chat` | `{ fontFamily, fontSize, ... }` |
| Delete element | DELETE | `/v1/elements/{id}` | — |

### Types (`src/types/element.ts`)

- `Element` — top-level element with `id`, `name`, `elementType`, `elementChat`
- `ElementChat` — chat-specific settings (font, stroke, shadow, colors)
- `CreateChatElementRequest` — `{ name: string, settings: UpdateChatElementRequest }`
- `UpdateChatElementRequest` — partial chat settings for PATCH

## Settings UI

### Simplified Controls

The settings form uses **preset dropdowns** instead of raw numeric inputs to stay friendly for non-technical users:

| Control | Options | Maps to |
|---------|---------|---------|
| Size | Small / Medium / Large | `fontSize`: 14 / 18 / 24 |
| Font | Open Sans / Roboto | `fontFamily` |
| Stroke | Off / Thin / Medium / Thick | `strokeEnabled` + `strokeSize` |
| Shadow | Off / Small / Medium / Large | `shadowEnabled` + `shadowSize` |
| Bold | Toggle switch | `fontWeight`: 'bold' / 'normal' |
| Font Color | Color picker + hex input | `fontColor` |

### Text Outline Technique

Stroke uses a **20-point circular `text-shadow`** (no blur) instead of `WebkitTextStroke`, which eats into the text fill. A subtle blurred outer glow is added for anti-aliasing. This is the same technique used by StreamElements/StreamLabs overlays.

### Twitch-Style Preview

The preview shows 4 mock chat messages with:
- Real Twitch badges (subscriber, moderator) — served locally from `/public/emotes/`
- Twitch-style colored usernames
- Animated emotes (KEKW, PepeLaugh, catJAM) — also local
- All text styled live with the user's current settings
- Adjustable background color picker for testing against different stream backgrounds

## File Map

```
src/
├── app/(app)/home/sources/chat/
│   ├── page.tsx              # Chat page — thin wrapper, handles create/update/delete
│   └── chat.module.css       # Loading state styles
├── components/
│   ├── ChatElementSettings.tsx       # Settings form + preview
│   ├── ChatElementSettings.module.css # Styles for settings panel
│   └── ChatElementList.tsx           # (Unused — kept for potential multi-element support)
├── hooks/
│   └── useElements.ts        # SWR hook for element CRUD
├── services/
│   └── apiService.ts         # API client (element endpoints)
├── types/
│   └── element.ts            # TypeScript interfaces
public/
└── emotes/
    ├── badge-subscriber.png  # Twitch subscriber badge (from static-cdn.jtvnw.net)
    ├── badge-moderator.png   # Twitch moderator badge
    ├── kekw.png              # KEKW emote (from BTTV)
    ├── pepelaugh.gif         # PepeLaugh animated emote (from BTTV)
    └── catjam.gif            # catJAM animated emote (from BTTV)
```

---
*Last updated: February 12, 2026*
