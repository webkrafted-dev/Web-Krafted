create table if not exists public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text not null default '',
  category text not null default 'Insights',
  content text not null,
  read_time text not null default '',
  published_date date not null default current_date,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  business text not null default '',
  email text not null,
  project_type text not null default 'Not sure yet',
  description text not null,
  budget text not null default 'Not sure yet',
  deadline date,
  status text not null default 'New' check (status in ('New', 'Replied', 'Closed')),
  created_at timestamptz not null default now()
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  status text not null default 'New' check (status in ('New', 'Replied', 'Closed')),
  created_at timestamptz not null default now()
);

create table if not exists public.submission_rate_limits (
  email_hash text not null,
  window_start timestamptz not null,
  submission_count integer not null default 1,
  primary key (email_hash, window_start)
);

create index if not exists enquiries_created_at_idx on public.enquiries (created_at desc);
create index if not exists messages_created_at_idx on public.messages (created_at desc);
create index if not exists submission_rate_limits_window_idx on public.submission_rate_limits (window_start);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists posts_set_updated_at on public.posts;
create trigger posts_set_updated_at
before update on public.posts
for each row execute function public.set_updated_at();

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.admins
    where user_id = (select auth.uid())
  );
$$;

create or replace function public.consume_submission_rate_limit(p_email_hash text)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  current_window timestamptz;
  current_count integer;
begin
  current_window := to_timestamp(floor(extract(epoch from now()) / 900) * 900);

  insert into public.submission_rate_limits (email_hash, window_start, submission_count)
  values (p_email_hash, current_window, 1)
  on conflict (email_hash, window_start)
  do update set submission_count = public.submission_rate_limits.submission_count + 1
  returning submission_count into current_count;

  delete from public.submission_rate_limits
  where window_start < now() - interval '1 day';

  return current_count <= 3;
end;
$$;

alter table public.admins enable row level security;
alter table public.posts enable row level security;
alter table public.enquiries enable row level security;
alter table public.messages enable row level security;
alter table public.submission_rate_limits enable row level security;

drop policy if exists "Admins can read their own admin membership" on public.admins;
create policy "Admins can read their own admin membership"
on public.admins for select to authenticated
using (user_id = (select auth.uid()));

drop policy if exists "Published posts are public and admins can read all posts" on public.posts;
create policy "Published posts are public and admins can read all posts"
on public.posts for select to anon, authenticated
using (published or (select public.is_admin()));

drop policy if exists "Admins can create posts" on public.posts;
create policy "Admins can create posts"
on public.posts for insert to authenticated
with check ((select public.is_admin()));

drop policy if exists "Admins can update posts" on public.posts;
create policy "Admins can update posts"
on public.posts for update to authenticated
using ((select public.is_admin()))
with check ((select public.is_admin()));

drop policy if exists "Admins can delete posts" on public.posts;
create policy "Admins can delete posts"
on public.posts for delete to authenticated
using ((select public.is_admin()));

drop policy if exists "Admins can read enquiries" on public.enquiries;
create policy "Admins can read enquiries"
on public.enquiries for select to authenticated
using ((select public.is_admin()));

drop policy if exists "Admins can update enquiries" on public.enquiries;
create policy "Admins can update enquiries"
on public.enquiries for update to authenticated
using ((select public.is_admin()))
with check ((select public.is_admin()));

drop policy if exists "Admins can read messages" on public.messages;
create policy "Admins can read messages"
on public.messages for select to authenticated
using ((select public.is_admin()));

drop policy if exists "Admins can update messages" on public.messages;
create policy "Admins can update messages"
on public.messages for update to authenticated
using ((select public.is_admin()))
with check ((select public.is_admin()));

grant select on public.admins to authenticated;
grant select on public.posts to anon, authenticated;
grant insert, update, delete on public.posts to authenticated;
grant select, update on public.enquiries, public.messages to authenticated;
grant insert on public.enquiries, public.messages to service_role;

revoke all on public.submission_rate_limits from anon, authenticated;
revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;
revoke all on function public.consume_submission_rate_limit(text) from public, anon, authenticated;
grant execute on function public.consume_submission_rate_limit(text) to service_role;
