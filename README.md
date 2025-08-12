# Resource Explorer — Rick & Morty (Next.js + TypeScript)

A small, polished React app that explores the public **Rick & Morty API** with great UX.

- List + detail views with pagination
- Debounced search (`?q=`), filters (`?status=&species=`), sorting (`?sort=`)
- URL is the source of truth and is shareable/reload-safe
- "Favorite" characters from list & detail (persisted in `localStorage`)
- Client caching, background refetch, and request cancellation via **TanStack Query**
- Optimistic UI for favorite toggles
- Theme toggle (light/dark), persisted
- Helpful loading skeletons, error states with retry
- Notes form on detail page, persisted locally

## Quickstart

```bash
npm i   # or npm i / yarn
npm run dev # http://localhost:3000
```

## Architecture Notes & Trade-offs

- **Dataset**: Rick & Morty API provides built-in pagination and server-side filters (`name`, `status`, `species`), perfect for URL-driven state.
- **URL as source of truth**: Search/filters/sort/page live in the URL. Navigating/back/forward recreates state; reloads are safe.
- **Data fetching**: `@tanstack/react-query` handles caching, background refetch, request cancellation (via `signal`), and placeholder data for smoothness.
- **Sorting**: The API doesn't support arbitrary sorting, so sorting is **client-side** on the current page results. If server-side sort were required across the full dataset, we'd need an index or server proxy.
- **Favorites**: Stored in `localStorage` via a small custom hook. Optimistic toggle gives instant feedback.
- **Notes on the detail page**: Also persisted in `localStorage`. No server write required.
- **Pagination vs Infinite scroll**: Chose **pagination** for clearer URL semantics and easier scroll restoration. Infinite scroll is easy to add with `useInfiniteQuery`.
- **Scroll restoration**: We rely on the browser/Next defaults; for very long lists we could store/restore scroll per-URL in `sessionStorage`.
- **A11y**: Basic labels, focusable buttons/links, `alt` text. Could be expanded with keyboard traps/roving focus for grid items.
- **Styling**: Tailwind for quick, consistent UI with minimal custom CSS.
- **Code splitting**: Next.js App Router splits routes automatically; the detail page loads separately.

## What I'd ship next

- Virtualized list via `react-window` when many cards are shown (100+).
- E2E smoke test with Playwright (happy path: search -> open detail -> favorite).
- Session-based scroll restoration for the list grid.
- Species dropdown powered by an API facet endpoint or precomputed list.
- Error boundary for image load errors with a fallback avatar.

## Scripts

- `dev` – Start dev server
- `build` – Production build
- `start` – Run the built app

## Tech

- Next.js (App Router) + TypeScript
- Tailwind CSS
- @tanstack/react-query
- next-themes
