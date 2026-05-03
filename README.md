# Spotify Analytics

A Next.js 16 App Router project for exploring personal Spotify listening data. The app uses Spotify OAuth with PKCE, server-side API access through HTTP-only cookies, dashboard views for top tracks/artists, Recharts visualizations, and a lightweight Wrapped-style story view.

## Features

- Spotify OAuth login with PKCE and state validation
- HTTP-only access and refresh token cookies
- Automatic refresh redirect when the access token expires
- Dashboard overview with top track, top artist, recent listens, genre breakdown, and artist popularity chart
- Dedicated top tracks and top artists pages
- Wrapped-style animated recap screen
- Typed Spotify API responses and strict TypeScript setup
- Next Image optimization for Spotify artwork

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Recharts
- Framer Motion
- Lucide React

## Getting Started

Create a Spotify app in the Spotify Developer Dashboard and add this redirect URI:

```txt
http://localhost:3000/api/auth/callback
```

For production, also add your deployed callback URL:

```txt
https://your-domain.com/api/auth/callback
```

Create `.env.local`:

```env
NEXT_PUBLIC_SPOTIFY_CLIENT_ID=your_spotify_client_id
NEXT_PUBLIC_REDIRECT_URI=http://localhost:3000/api/auth/callback
```

Install and run:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quality Checks

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Notes

The app intentionally keeps Spotify API calls server-side where user tokens are read from HTTP-only cookies. If an access token expires, protected pages redirect through `/api/auth/refresh` and then back to the requested page instead of throwing a Server Components render error.

`next.config.ts` pins the project root for Turbopack because parent directories can contain unrelated lockfiles on local machines.
