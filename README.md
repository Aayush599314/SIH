# AlgoMinds.AI — Landing → Auth → Dashboard Navigation Flow

A React 19 + TypeScript + Vite app with **proper page-based routing** (React Router),
not a single-page state toggle. Each screen is its own route and its own component tree.

## Routes

| Path              | Page              | Access                                    |
|-------------------|-------------------|--------------------------------------------|
| `/`                | Landing Page      | Public                                     |
| `/login`           | Login Page        | Public-only (redirects to `/dashboard` if already signed in) |
| `/register`        | Register Page     | Public-only (redirects to `/dashboard` if already signed in) |
| `/dashboard`       | Dashboard         | **Protected** — redirects to `/login` if signed out |
| `/playground/:id`  | Single visualizer | **Protected** |
| `/404`, `*`        | Not Found         | Public |

## Auth flow

- `src/context/AuthContext.tsx` holds a mock auth session (persisted to `localStorage`
  so a refresh doesn't log you out). Swap the `login`/`register` bodies for real API
  calls whenever a backend is ready — the rest of the app doesn't need to change.
- `src/routes/ProtectedRoute.tsx` guards the dashboard: **the dashboard is never
  rendered, not even briefly, unless `isAuthenticated` is true.**
- `src/routes/PublicOnlyRoute.tsx` keeps signed-in users off the login/register screens.
- Successful login or registration navigates to `/dashboard` (or back to whatever
  protected page the visitor originally tried to open).

## Folder structure

```
src/
├── pages/
│   ├── Landing/        # LandingPage.tsx
│   ├── Login/          # LoginPage.tsx
│   ├── Register/       # RegisterPage.tsx
│   └── Dashboard/      # DashboardPage.tsx, VisualizerPage.tsx
├── components/
│   ├── landing/        # Navbar, Hero, Features, About, Testimonials, CTA, Footer
│   ├── auth/            # PasswordField, SocialAuthButtons
│   ├── dashboard/        # Playground, Stats, Recent, DailyChallenge, ActivityFeed, AI panel
│   ├── visualizers/      # Per-data-structure visualizer implementations
│   └── ui/               # Shared low-level UI atoms
├── layouts/
│   ├── AppShell.tsx      # Sidebar + TopNavbar shell used by the dashboard
│   ├── AuthLayout.tsx    # Shared shell for Login/Register
│   ├── Sidebar.tsx, TopNavbar.tsx, VisualizerNavigation.tsx, StreakCard.tsx
├── routes/
│   ├── AppRoutes.tsx      # Central route table
│   ├── ProtectedRoute.tsx
│   └── PublicOnlyRoute.tsx
├── hooks/
│   └── useAuth.ts
├── context/
│   ├── AuthContext.tsx
│   └── DashboardContext.tsx
├── types/index.ts
└── App.tsx
```

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL — you'll land on `/` (Landing). Click **Register**
or **Login**, submit the form (any well-formed email/password works — it's a mock
auth layer), and you'll be redirected straight to `/dashboard`. Try opening
`/dashboard` in a fresh incognito tab without logging in first — you'll be bounced
to `/login`, confirming the dashboard is never visible before auth.

> Note: if `npm run build` complains about a missing native binding for Vite/oxlint,
> delete `node_modules` and `package-lock.json` and run `npm install` again — this is
> a known npm optional-dependencies quirk (npm/cli#4828) tied to platform-specific
> binaries, not an issue with the app code.
