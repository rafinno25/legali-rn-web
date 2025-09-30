# Legali Mobile App (Expo + Expo Router)

A scalable, feature‑first React Native app using Expo Router. The route files live in `app/` (screens only), while feature logic and reusable UI are organized outside `app/` for clarity and growth.

This repository currently implements UI‑only navigation (no APIs, no state management) to illustrate the screen flow.

## Quick Start

Prerequisites: Node 18+, npm, Xcode (iOS) and/or Android Studio (Android).

1) Install dependencies

```bash
npm install
```

2) Start Metro + choose a platform

```bash
npx expo start
```

Shortcuts:

- iOS simulator: `npm run ios`
- Android emulator: `npm run android`
- Web: `npm run web`

## Project Structure

```
app/                         # Expo Router pages (screens only)
  _layout.tsx               # Root Stack layout
  index.tsx                 # Home (links to flows)
  auth/                     # Auth routes (UI only)
    index.tsx
    login.tsx
    signup.tsx
  chat/
    index.tsx               # Chat list (dummy)
    conversation.tsx        # Conversation (dummy)
  settings/
    index.tsx
    notifications.tsx
    security.tsx
  profile/
    index.tsx
    edit.tsx
    preferences.tsx

components/                 # Global presentational components
  Button.tsx

modules/                    # Feature modules (future: UI+logic per feature)
services/                   # Global services (future)
store/                      # Global state (future)
hooks/                      # Global hooks (future)
utils/                      # Global utilities (future)
localization/               # i18n placeholders (future wiring)
env/                        # Environment files (consumed later via app config)
__tests__/                  # Test scaffolding (future)
```

### What goes where

- `app/`: File‑based routes for Expo Router. Keep these thin; they render UI and wire navigation.
- `modules/feature/*`: The home for feature‑specific building blocks (components, hooks, services, validation). Screens import from here so logic stays out of `app/`.
- `components/`: Reusable, cross‑feature UI (e.g., `Button`).
- `services/`, `store/`, `hooks/`, `utils/`: Cross‑cutting logic once added (e.g., `apiClient`, Zustand stores, helpers).
- `localization/`, `env/`, `__tests__/`: Placeholders for i18n, environment config, and testing.

## Routing Basics

- Add a screen by creating a file in `app/` (e.g., `app/settings/security.tsx`).
- Navigate with links:

```tsx
import { Link } from "expo-router";

<Link href="/auth/login">Go to Login</Link>
```

- Read route params:

```tsx
import { useLocalSearchParams } from "expo-router";
const { id } = useLocalSearchParams<{ id?: string }>();
```

- Customize stacks/tabs in `_layout.tsx` as the app grows.

## Current UI Flow (No Logic)

- Home → Auth → Login/Signup
- Home → Chat → Conversation
- Home → Profile → Edit/Preferences
- Home → Settings → Notifications/Security

All screens use simple React Native styles; no API calls, no state management, no validation yet.

## Extending With Feature Modules

When adding real behavior later:

- Create feature internals under `modules/<feature>/`:
  - `components/` (e.g., `LoginForm.tsx`)
  - `hooks/` (e.g., `useAuth.ts`)
  - `services/` (e.g., `authService.ts`)
  - `store/` (e.g., `useAuthStore.ts`)
  - `validation/` (e.g., `authSchema.ts`)
- Import from the screen in `app/` and keep screen code minimal.

## Scripts

- `npm start` / `npx expo start` — Start dev server and choose platform.
- `npm run ios` — Open iOS simulator.
- `npm run android` — Open Android emulator.
- `npm run web` — Run on web.
- `npm run lint` — Lint the project.
- `npm run reset-project` — Move template to `app-example/` (from Expo template).

## Next Steps (Planned, Not Installed Yet)

- State: Zustand (`store/`) and optional React Query for server state.
- Networking: Axios `services/apiClient.ts` with interceptors + `expo-secure-store` for tokens.
- Auth: `expo-auth-session` (Google) and `expo-apple-authentication` (Apple) with proper `app.config` setup.
- Styling: NativeWind + `tailwind.config.js`.
- i18n: `i18next` + `react-i18next` using `localization/` resources.
- Testing: Jest + Testing Library (`__tests__/`).

## Troubleshooting

- Clear Metro cache if something looks stale:

```bash
rm -rf .expo && npx expo start -c
```

---

Questions or improvements? Open an issue or PR.
