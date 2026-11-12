# WK Web Krafted Studios

Independent Vite + React website. Vercel hosts the website and API endpoints; Supabase provides persistent Postgres data and authentication. Published article edits and inbox status changes are stored in Supabase and remain available across deployments.

## Local setup

1. Install Node.js 20 or newer.
2. Install dependencies with `npm install`.
3. Create a Supabase project and run [`supabase/schema.sql`](./supabase/schema.sql) and [`supabase/seed.sql`](./supabase/seed.sql) in its SQL Editor. The seed script copies the existing insight titles and excerpts into your database so they are ready to edit in the admin.
4. Copy `.env.example` to `.env.local` and fill in:
   - `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` from the Supabase project API settings.
   - `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` for the server-side Vercel submission endpoints. Never expose the service-role key to the browser.
5. Run `npm run dev` for the Vite frontend. To test the Vercel API endpoints locally, link the project and use `vercel dev`.

The public site can be previewed without Supabase credentials, but sign-in, admin editing, and form submissions require the configured Supabase project and Vercel API environment variables.

## Create the studio administrator

1. Open `/register` on the deployed or local site and create the account you will use as the site owner. Complete email verification if enabled.
2. In Supabase SQL Editor, grant admin access to that account:

   ```sql
   insert into public.admins (user_id)
   select id from auth.users where email = 'you@example.com'
   on conflict (user_id) do nothing;
   ```

3. Sign in at `/login`. The `/admin` inbox lets you review messages; `/admin/posts` lets you create, edit, publish, and delete insights.
4. For a single-owner site, disable public sign-ups in Supabase Auth after creating the administrator. Admin privileges can only be granted through the Supabase project; visitors cannot promote themselves.

Row Level Security policies in the schema permit public reads of published posts, limit post and inbox management to the `admins` table, and restrict public submissions to the server-side endpoints.

## Deploy to Vercel

1. Push this project to a Git repository and import it into Vercel. Use the default Vite build command, `npm run build`, and output directory `dist`.
2. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to Vercel so the frontend can connect to Supabase.
3. Add `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` as server environment variables for the API functions. Keep the service-role key secret and do not prefix it with `VITE_`. The admin reply endpoint validates the signed-in user with the public Supabase key (it can use `VITE_SUPABASE_ANON_KEY` or `NEXT_PUBLIC_SUPABASE_ANON_KEY`, or a server-only `SUPABASE_ANON_KEY`).
4. Set the production site URL in Supabase Auth's allowed redirect URLs. Add your Vercel preview URLs if you use preview deployments.
5. Deploy. Vercel serves the frontend and `/api/submit-enquiry`, `/api/submit-message`, and the admin-only `/api/send-reply`; Supabase stores contact submissions and published posts.

Email notifications and admin replies require `RESEND_API_KEY` (secret) and `RESEND_FROM_EMAIL` (a sender verified with Resend) in Vercel. `NOTIFICATION_EMAIL` is an optional comma-separated override; if empty, the server resolves recipient addresses from accounts listed in `public.admins`. New enquiries and quick messages are stored for the `/admin` inbox before email notification is attempted. The admin inbox can send a manual reply to a selected submission and use the signed-in admin's email as the reply-to address. Submissions remain saved to Supabase if email delivery is unavailable.

Vercel's CDN serves the site globally. Supabase keeps the durable database in the region selected for the project; database backup and retention options depend on the Supabase plan.

## Vercel Web Analytics

The React root mounts `@vercel/analytics/react` on every route. In Vercel, enable Web Analytics for the `web-krafted-pods` project (the project serving `web-krafted.vercel.app`), deploy the change, then visit the site to start collecting page views. Content blockers may prevent some visits from being counted.

## Supabase best-effort activity check

`.github/workflows/supabase-keep-alive.yml` runs three times daily and sends a read-only request to the public, RLS-protected `posts` endpoint. To enable it, add repository Actions secrets named `SUPABASE_URL` and `SUPABASE_ANON_KEY`, then run the workflow once with **Run workflow** to verify the connection. The query reads only published-post IDs and does not write or access inquiry data; it does not use the service-role key.

This is a best-effort nudge, not a promise that Supabase will never pause the project: inactivity decisions are controlled by Supabase and may depend on overall activity. If uninterrupted database availability is required, use a Supabase plan that does not automatically pause inactive projects. See [Supabase's free-project pausing policy](https://supabase.com/docs/guides/platform/free-project-pausing).

## Motion components

- `src/components/brand/GlyphLotteryText.jsx` adds a staggered slot-glyph reveal to the highlighted hero phrase; it respects reduced-motion preferences.
- `src/components/brand/OrbitalTextGlobe.jsx` adds the navy/lime orbital wordmark illustration, gentle rotation, pause/resume, and pointer/touch/keyboard spin controls.
- `src/components/work/ConcavePreviewGallery.jsx` presents five distinct website previews in a responsive curved carousel with swipe, drag, arrow-key, and button navigation.

These are local Framer Motion implementations, not copied or installed React Bits Pro source. `components.json` is prepared with the official `@reactbits-starter` and `@reactbits-pro` registries and the environment-backed `Authorization: Bearer ${REACTBITS_LICENSE_KEY}` header. The Pro installer was not run because a license key was not supplied for this session. Keep a valid key only in the local environment; never commit it. When the key is available to the shell, the requested registry commands are:

```bash
npx shadcn@latest add @reactbits-starter/orbital-type-tw
npx shadcn@latest add @reactbits-starter/concave-carousel-tw
npx shadcn@latest add @reactbits-starter/glyph-lottery-tw
```

## Checks

- `npm run build`
- `npm run lint`
