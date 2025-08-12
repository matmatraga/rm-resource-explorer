# Resource Explorer — Rick & Morty (Next.js + TypeScript)

A polished single‑page app that explores the public **Rick & Morty API** with fast UX, shareable URLs, and local favorites.

## Feature Highlights

- **List + Detail routes**
  - `/characters` with **pagination** and a responsive, auto‑fit grid
  - `/characters/[id]` detail with **favorites** and a **local notes** form
- **Search / Filter / Sort** (URL is source of truth)
  - Debounced search → `?q=`
  - Filters → `?status=`, `?species=`
  - Sort (client‑side on current page) → `?sort=name-asc|name-desc|episodes-asc|episodes-desc`
  - State is shareable + reload‑safe; back/forward navigation preserved
- **Favorites**
  - Toggle from list and detail; persisted in `localStorage`
  - “Favorites only” toggle → `?favorites=1`
- **Data fetching & performance**
  - **TanStack Query** caching + background refetch
  - **Abort on change** via `AbortSignal` to avoid race conditions
  - Loading skeletons, friendly empty states, and error blocks with **Retry**
- **Theming & UX**
  - Light/Dark theme with **next-themes** (preference persisted)
  - Accessible labels, focus rings, and keyboard‑friendly controls
  - Native selects styled for visibility in dark mode

## Tech Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- @tanstack/react-query
- next-themes

## Getting Started

```bash
# install deps
npm i        # or: pnpm i / yarn

# run dev server
npm run dev  # → http://localhost:3000

# production build
npm run build
npm start
```

> Node 18+ recommended.

## Project Structure (key files)

```
app/
  layout.tsx            # Server layout + Providers wrapper
  providers.tsx         # Client providers: next-themes + React Query
  page.tsx              # Redirects to /characters
  characters/
    page.tsx            # List view with URL-driven state
    [id]/page.tsx       # Detail view with favorites + notes
components/
  CharacterCard.tsx, FavoriteButton.tsx, Filters.tsx,
  Pagination.tsx, SearchBar.tsx, SortSelect.tsx, SkeletonCard.tsx, ThemeToggle.tsx
lib/
  api.ts                # Fetchers (normalize 404→empty, client-side sort)
  types.ts
  useDebouncedValue.ts
  useFavorites.ts       # favorites + notes in localStorage
```

## URL Parameters

- `?q=<name>` – debounced search by name
- `?status=alive|dead|unknown` – server filter
- `?species=<string>` – server filter
- `?sort=name-asc|name-desc|episodes-asc|episodes-desc` – **client-side** sort on current page
- `?page=<n>` – page index (1‑based)
- `?favorites=1` – filter current page results to your favorites

## Architecture & Trade‑offs

- **Sorting**: API doesn’t support arbitrary sorting; we sort **client‑side** on the current page. A global sort would require a server proxy or index.
- **Pagination**: Chosen over infinite scroll for clear URL semantics and better back/forward behavior.
- **404 normalization**: The API returns `404` for “no results”. We normalize to an **empty list** so the UI shows a “No results” state instead of an error.
- **Theme toggle**: Wrapped in a client‑only `Providers` component to avoid Server Component `createContext` issues.
- **Typed routes**: If you enable Next’s `typedRoutes`, query strings can trip TypeScript. Either disable it or cast the URL to `Route`. This project keeps it simple.

## Scripts

- `dev` – Start dev server
- `build` – Build
- `start` – Start production server
- `lint` – Lint

## Deployment (Vercel)

1. Push to a public GitHub repo (include `.gitignore`).
2. Import in Vercel → select the repo → “Deploy”.
3. No env vars required. Ensure `Images.remotePatterns` allow `rickandmortyapi.com` (already set in `next.config.mjs`).

## Troubleshooting

- **Dropdown text invisible (dark mode)**: We set explicit colors for `select, option` in `globals.css`.
- **Theme toggle doesn’t work**: Ensure `ThemeToggle` is inside `<Providers>` and the toggle uses a `mounted` guard to avoid SSR/CSR mismatch.
- **`Module not found: '@/lib/api'`**: Add `paths` to `tsconfig.json` → `{ "@/*": ["./*"] }`.
- **Typed routes error on `router.replace`**: Disable `experimental.typedRoutes` or cast URL: `(url as Route)`.
- **Devtools mismatch**: If using `@tanstack/react-query-devtools`, pin to the same minor as `@tanstack/react-query` or remove devtools.
- **Git ignoring doesn’t work**: Commit `.gitignore`, then untrack previously added files: `git rm -r --cached node_modules .next out`.

## What I’d ship next

- Virtualized grid (`react-window`) for super long lists
- Playwright smoke test (search → open detail → favorite → back)
- Scroll restoration per‑URL via `sessionStorage`
- Species facets (pre-computed or via a tiny API proxy)
- Server-side sort, filters, pagination, search and favorites for the full dataset
