# House of Soura Boutique

A cinematic luxury fashion storefront for House of Soura, built around its HS lotus monogram and an editorial shopping experience.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/house-of-soura/src/App.tsx` — single-page storefront, product interactions, overlays, quick view, and bag state
- `artifacts/house-of-soura/src/index.css` — House of Soura visual system, responsive layouts, depth effects, and motion
- `artifacts/house-of-soura/public/` — supplied monogram and boutique editorial imagery
- `artifacts/house-of-soura/.replit-artifact/artifact.toml` — artifact metadata and preview routing

## Architecture decisions

- Presentation-first React + Vite site with client-side interaction state; no backend is needed for the initial boutique experience.
- The supplied monogram is treated as the identity source of truth and is used as a local public asset.
- The page uses a dark atelier visual language with antique gold as the primary accent and blush pink as a restrained highlight.
- Motion includes reduced-motion handling so the cinematic treatment remains accessible.

## Product

- Scrollable editorial home experience for the House of Soura collection.
- Collection browsing with quick-view product details, size selection, wishlist feedback, and add-to-bag behavior.
- Responsive menu, search overlay, shopping bag drawer, journal prompts, private viewing CTA, and newsletter signup feedback.

## User preferences

 - Use the supplied logo and prompt as the foundation for the boutique identity.

## Gotchas

- The web artifact workflow supplies `PORT` and `BASE_PATH`; use the managed workflow for local preview.
- Keep routes prefix-aware through the artifact's Vite base configuration.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
