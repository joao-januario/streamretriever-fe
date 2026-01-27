# 📁 Project Structure Guide - For Beginners

## Your Root Directory (Clean & Simple!)

When you open your project, you'll see these folders and files:

```
streammixer-fe/
├── 📁 src/                  ← YOUR CODE LIVES HERE! 👈
├── 📁 public/               ← Images, icons, static files
├── 📁 node_modules/         ← Ignore (auto-generated packages)
├── 📁 .next/                ← Ignore (build output)
├── 📁 .git/                 ← Ignore (version control)
├── 📁 .idea/                ← Ignore (WebStorm settings)
├── 📄 package.json          ← Project dependencies list
├── 📄 next.config.ts        ← Next.js settings
├── 📄 tsconfig.json         ← TypeScript settings
└── 📄 README.md             ← Project documentation
```

### 🎯 The Simple Rule:
**You'll spend 95% of your time in the `src/` folder!**

---

## Inside the `src/` Folder

This is where ALL your application code lives:

```
src/
├── 📁 app/                  ← Pages & routes
│   ├── page.tsx             ← Homepage (URL: /)
│   ├── layout.tsx           ← Wraps all pages (header, footer, etc.)
│   └── dashboard/
│       └── page.tsx         ← Dashboard page (URL: /dashboard)
│
├── 📁 components/           ← Reusable UI pieces
│   ├── LoginButton.tsx      ← Login button component
│   ├── DashboardContent.tsx ← Dashboard UI
│   └── AuthCallback.tsx     ← OAuth callback handler
│
├── 📁 services/             ← Backend communication
│   ├── authService.ts       ← Login/logout/token management
│   └── apiService.ts        ← API calls to your backend
│
├── 📁 types/                ← TypeScript type definitions
│   └── user.ts              ← User & Auth types
│
└── 📄 middleware.ts         ← Route protection (login checks)
```

---

## 🗺️ How URLs Map to Files

Next.js uses **file-based routing**. The file structure determines your URLs:

| File Path                    | URL in Browser      | What it does           |
|------------------------------|---------------------|------------------------|
| `src/app/page.tsx`           | `/`                 | Homepage (login page)  |
| `src/app/dashboard/page.tsx` | `/dashboard`        | Dashboard page         |
| `src/app/about/page.tsx`     | `/about`            | About page (if created)|

**Example:** To create a new page at `/settings`, you'd create:
```
src/app/settings/page.tsx
```

---

## 📂 What Each Folder Does

### 1. `src/app/` - Your Website Pages
Think of this as the **skeleton** of your website. Each folder = a URL route.

- `page.tsx` - The actual page content
- `layout.tsx` - Wrapper around all pages (like a frame)

### 2. `src/components/` - Reusable UI Pieces
Think of these as **LEGO blocks** you can use anywhere.

Example: Instead of writing a login button 10 times, you create `LoginButton.tsx` once and reuse it.

### 3. `src/services/` - Backend Communication
This is where you **talk to your backend API**.

- `authService.ts` - Handles login, logout, token storage
- `apiService.ts` - Fetches data from your backend (users, posts, etc.)

### 4. `src/types/` - TypeScript Definitions
This tells TypeScript **what shape your data has**.

Example:
```typescript
interface User {
  accountId: number;
  username: string;
  email: string;
}
```

Now TypeScript knows: "A User has an accountId, username, and email!"

### 5. `middleware.ts` - Route Guard
This **protects** pages from unauthorized access.

Example: If you're not logged in, it redirects you to the login page.

---

## 🚫 Folders to Ignore (Auto-Generated)

### `.next/`
- Next.js build output
- Gets recreated every time you run `npm run dev`
- **Never edit this!**

### `node_modules/`
- Downloaded packages (like React, Next.js, etc.)
- Gets created when you run `npm install`
- Can be 100,000+ files - **never edit this!**

### `.git/`
- Version control history
- Git manages this automatically
- **Never edit this!**

### `.idea/`
- WebStorm IDE settings
- Your editor manages this
- **Never edit this!**

---

## 📄 Important Root Files

### `package.json`
Your project's **shopping list** of dependencies.

```json
{
  "name": "streammixer-fe",
  "dependencies": {
    "react": "^19.0.0",
    "next": "^15.1.4"
  },
  "scripts": {
    "dev": "next dev",      ← npm run dev
    "build": "next build"   ← npm run build
  }
}
```

### `next.config.ts`
Next.js configuration (like image domains, redirects, etc.)

### `tsconfig.json`
TypeScript compiler settings

---

## 🎨 Real-World Example: Adding a New Feature

Let's say you want to add a **Settings Page**:

### Step 1: Create the page file
```
src/app/settings/page.tsx
```

### Step 2: Create a component (optional)
```
src/components/SettingsForm.tsx
```

### Step 3: Create a service to save settings (optional)
```
src/services/settingsService.ts
```

### Step 4: Visit in browser
```
http://localhost:3000/settings
```

**That's it!** Next.js automatically creates the route for you.

---

## 🆘 Quick Reference

### "Where do I add a new page?"
→ `src/app/yourpage/page.tsx`

### "Where do I add a reusable component?"
→ `src/components/YourComponent.tsx`

### "Where do I add API calls?"
→ `src/services/yourService.ts`

### "Where do I add TypeScript types?"
→ `src/types/yourType.ts`

### "Where are the images?"
→ `public/` folder (and reference them as `/image.png`)

---

## 💡 Pro Tips

1. **Keep `src/` clean** - This is your workspace!
2. **Use components** - If you write the same UI twice, make it a component
3. **Use services** - Keep API logic separate from UI components
4. **Ignore auto-generated folders** - Focus on what you control
5. **Follow the naming convention** - `ComponentName.tsx`, `serviceName.ts`

---

## 🎯 Your Daily Workflow

1. Open WebStorm
2. Navigate to `src/` folder
3. Edit files in `app/`, `components/`, or `services/`
4. Run `npm run dev` to test
5. Open browser to `http://localhost:3000`

**You'll rarely need to touch anything outside `src/`!**

---

## Summary

✅ **Work in:** `src/` folder  
🚫 **Ignore:** `.next/`, `node_modules/`, `.git/`, `.idea/`  
📖 **Learn:** How `app/` folder creates routes  
🧱 **Build:** Reusable components in `components/`  
📡 **Communicate:** With backend using `services/`  

**That's it! You're ready to build! 🚀**
