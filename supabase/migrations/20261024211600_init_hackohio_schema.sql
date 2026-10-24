-- HackOHI/O 2026 — core schema
-- Roles live in profiles (not user_metadata). Auth signup creates a profile via trigger.

create extension if not exists "pgcrypto";

create schema if not exists private;

create type public.user_role as enum ('user', 'company', 'admin');

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

-- ---------------------------------------------------------------------------
-- Profiles (1:1 with auth.users)
-- ---------------------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role public.user_role not null default 'user',
  points integer not null default 0 check (points >= 0),
  display_name text,
  bio text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index profiles_role_idx on public.profiles (role);
create index profiles_points_idx on public.profiles (points desc);

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name, role, points)
  values (
    new.id,
    coalesce(
      nullif(trim(new.raw_user_meta_data ->> 'display_name'), ''),
      split_part(new.email, '@', 1)
    ),
    'user',
    0
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create or replace function private.protect_profile_privileged_columns()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  actor_role public.user_role;
begin
  -- Allow unrestricted updates from service role / SQL editor (no JWT)
  if auth.uid() is null then
    return new;
  end if;

  select p.role into actor_role
  from public.profiles p
  where p.id = auth.uid();

  if actor_role is distinct from 'admin' then
    new.role := old.role;
    new.points := old.points;
  end if;

  return new;
end;
$$;

create trigger profiles_protect_privileged
  before update on public.profiles
  for each row execute function private.protect_profile_privileged_columns();

-- ---------------------------------------------------------------------------
-- Companies (owned by a profile; typically role=company)
-- ---------------------------------------------------------------------------
create table public.companies (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null unique references public.profiles (id) on delete cascade,
  name text not null,
  description text,
  website_url text,
  logo_url text,
  tech_stack text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index companies_name_idx on public.companies (name);

create trigger companies_set_updated_at
  before update on public.companies
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Tasks (optionally linked to a company; hold github/website/resource links)
-- ---------------------------------------------------------------------------
create table public.tasks (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies (id) on delete set null,
  created_by uuid not null references public.profiles (id) on delete cascade,
  title text not null,
  description text,
  github_url text,
  website_url text,
  resource_links jsonb not null default '[]'::jsonb,
  tags text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint tasks_resource_links_is_array check (jsonb_typeof(resource_links) = 'array')
);

create index tasks_company_id_idx on public.tasks (company_id);
create index tasks_created_by_idx on public.tasks (created_by);
create index tasks_tags_idx on public.tasks using gin (tags);

create trigger tasks_set_updated_at
  before update on public.tasks
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Submissions (student work against a task)
-- ---------------------------------------------------------------------------
create table public.submissions (
  id uuid primary key default gen_random_uuid(),
  task_id uuid not null references public.tasks (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  title text not null,
  description text,
  github_url text,
  website_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index submissions_task_id_idx on public.submissions (task_id);
create index submissions_user_id_idx on public.submissions (user_id);
create unique index submissions_task_user_unique on public.submissions (task_id, user_id);

create trigger submissions_set_updated_at
  before update on public.submissions
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Feedback (company review; private until marked public)
-- ---------------------------------------------------------------------------
create table public.feedback (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references public.submissions (id) on delete cascade,
  author_id uuid not null references public.profiles (id) on delete cascade,
  body text not null,
  is_public boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index feedback_submission_id_idx on public.feedback (submission_id);
create index feedback_author_id_idx on public.feedback (author_id);
create index feedback_is_public_idx on public.feedback (is_public) where is_public = true;

create trigger feedback_set_updated_at
  before update on public.feedback
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Auth helpers (security definer, private schema)
-- ---------------------------------------------------------------------------
create or replace function private.current_role()
returns public.user_role
language sql
stable
security definer
set search_path = ''
as $$
  select role from public.profiles where id = auth.uid();
$$;

create or replace function private.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

create or replace function private.owns_company(p_company_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.companies
    where id = p_company_id and owner_id = auth.uid()
  );
$$;

create or replace function private.owns_task_company(p_task_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.tasks t
    join public.companies c on c.id = t.company_id
    where t.id = p_task_id
      and c.owner_id = auth.uid()
  )
  or private.is_admin();
$$;

create or replace function private.can_leave_feedback(p_submission_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.submissions s
    where s.id = p_submission_id
      and private.owns_task_company(s.task_id)
  );
$$;

create or replace function public.adjust_points(target_user_id uuid, delta integer)
returns public.profiles
language plpgsql
security definer
set search_path = ''
as $$
declare
  updated_row public.profiles;
begin
  if not private.is_admin() then
    raise exception 'Only admins can adjust points';
  end if;

  update public.profiles
  set points = greatest(0, points + delta)
  where id = target_user_id
  returning * into updated_row;

  if updated_row.id is null then
    raise exception 'User not found';
  end if;

  return updated_row;
end;
$$;

revoke all on function public.handle_new_user() from public;
revoke all on function public.handle_new_user() from anon, authenticated;

revoke all on function public.adjust_points(uuid, integer) from public;
revoke all on function public.adjust_points(uuid, integer) from anon;
grant execute on function public.adjust_points(uuid, integer) to authenticated;

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.companies enable row level security;
alter table public.tasks enable row level security;
alter table public.submissions enable row level security;
alter table public.feedback enable row level security;

create policy "Profiles are publicly readable"
  on public.profiles for select
  to anon, authenticated
  using (true);

create policy "Users can update own profile"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id or private.is_admin())
  with check (auth.uid() = id or private.is_admin());

create policy "Admins can insert profiles"
  on public.profiles for insert
  to authenticated
  with check (private.is_admin());

create policy "Companies are publicly readable"
  on public.companies for select
  to anon, authenticated
  using (true);

create policy "Company owners and admins can insert companies"
  on public.companies for insert
  to authenticated
  with check (
    private.is_admin()
    or (
      owner_id = auth.uid()
      and private.current_role() in ('company', 'admin')
    )
  );

create policy "Company owners and admins can update companies"
  on public.companies for update
  to authenticated
  using (owner_id = auth.uid() or private.is_admin())
  with check (owner_id = auth.uid() or private.is_admin());

create policy "Company owners and admins can delete companies"
  on public.companies for delete
  to authenticated
  using (owner_id = auth.uid() or private.is_admin());

create policy "Tasks are publicly readable"
  on public.tasks for select
  to anon, authenticated
  using (true);

create policy "Authenticated users can create tasks"
  on public.tasks for insert
  to authenticated
  with check (
    created_by = auth.uid()
    and (
      company_id is null
      or private.owns_company(company_id)
      or private.is_admin()
    )
  );

create policy "Creators, company owners, and admins can update tasks"
  on public.tasks for update
  to authenticated
  using (
    created_by = auth.uid()
    or private.owns_company(company_id)
    or private.is_admin()
  )
  with check (
    created_by = auth.uid()
    or private.owns_company(company_id)
    or private.is_admin()
  );

create policy "Creators, company owners, and admins can delete tasks"
  on public.tasks for delete
  to authenticated
  using (
    created_by = auth.uid()
    or private.owns_company(company_id)
    or private.is_admin()
  );

create policy "Submissions are publicly readable"
  on public.submissions for select
  to anon, authenticated
  using (true);

create policy "Users can create their own submissions"
  on public.submissions for insert
  to authenticated
  with check (user_id = auth.uid());

create policy "Owners and admins can update submissions"
  on public.submissions for update
  to authenticated
  using (user_id = auth.uid() or private.is_admin())
  with check (user_id = auth.uid() or private.is_admin());

create policy "Owners and admins can delete submissions"
  on public.submissions for delete
  to authenticated
  using (user_id = auth.uid() or private.is_admin());

create policy "Feedback visibility"
  on public.feedback for select
  to anon, authenticated
  using (
    is_public = true
    or author_id = auth.uid()
    or private.is_admin()
    or exists (
      select 1 from public.submissions s
      where s.id = feedback.submission_id
        and s.user_id = auth.uid()
    )
    or private.can_leave_feedback(submission_id)
  );

create policy "Company owners can leave feedback on their task submissions"
  on public.feedback for insert
  to authenticated
  with check (
    author_id = auth.uid()
    and private.can_leave_feedback(submission_id)
  );

create policy "Authors and admins can update feedback"
  on public.feedback for update
  to authenticated
  using (author_id = auth.uid() or private.is_admin())
  with check (author_id = auth.uid() or private.is_admin());

create policy "Authors and admins can delete feedback"
  on public.feedback for delete
  to authenticated
  using (author_id = auth.uid() or private.is_admin());
