# Folio

A student-first project discovery and feedback prototype built with Next.js 16 and React 19. Working name: Folio.

## Run locally

Install Node.js 20.9 or later, then run:

```sh
npm install
npm run dev
```

Open http://localhost:3000. Production: `npm run build`, then `npm start`.

## Included

- Responsive challenge and community project catalogue
- Search, industry/technology/difficulty filters, and sorting
- Challenge briefs and related project submission
- Website or repository submissions; code sharing is optional
- Saved challenges and projects
- Demo profiles, project portfolios, and contribution points
- Feedback threads, replies, and owner approval of whole threads
- Local browser persistence

## Demo boundary

Profiles are names, not authenticated accounts. All records live in this browser's localStorage. Feedback visibility demonstrates the intended UI only and provides no security boundary. Example organizations, briefs, participation counts, and portfolio entries are illustrative. Example project links lead to related GitHub topic pages.

Before accepting real users, connect Supabase Auth and database records, enforce row-level policies for private feedback and ownership, and grant points on the server. Company management is deferred to prioritize the student experience.

## Vercel

Import this directory as a Next.js project. Use the default build command and output settings. The existing Supabase middleware requires NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY; see .env.example and the main README. The student interface currently uses local demo state rather than these backend records.

## Verification

Production build and TypeScript checks passed. Browser checks covered search, bookmarks, project submission with a website-only link, profile statistics, private feedback, owner publication, and a 390px mobile layout.
