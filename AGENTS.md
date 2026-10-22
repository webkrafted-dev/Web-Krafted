# Project guide

This is the user-owned WK Web Krafted Studios application. Keep changes focused and preserve the existing React/Vite design.

## Stack

- React and Vite frontend; Vercel static hosting and serverless endpoints in `api/`.
- Supabase Auth and Postgres. See `supabase/schema.sql` for tables and Row Level Security.
- `src/lib/supabase.js` is the frontend client. Never place the Supabase service-role key in frontend code or any `VITE_` variable.
- `server/submissions.js` contains server-side validation and persistence for contact submissions.

## Local development

- Install with `npm install`.
- Run the frontend with `npm run dev`.
- Use `vercel dev` when testing Vercel API endpoints locally.
- Set local values in `.env.local`; do not commit secrets.
- Run `npm run build` and `npm run lint` for relevant changes.

See `README.md` for Supabase setup, admin provisioning, and Vercel deployment.
