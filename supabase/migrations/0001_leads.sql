-- Tabla de leads entrantes desde el sitio (campañas Meta/Google + orgánico).
-- Cómo aplicarla: panel de Supabase -> SQL Editor -> pegar y Run.
-- (O con CLI: supabase db push)

create table if not exists public.leads (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  name          text not null,
  email         text not null,
  company       text,
  phone         text,
  role_searched text,                 -- qué perfil/posición necesita cubrir
  message       text,
  -- atribución de marketing
  source        text,                 -- 'form' | 'whatsapp' | etc.
  utm_source    text,
  utm_medium    text,
  utm_campaign  text,
  page_path     text
);

-- Índice para ordenar por fecha en el panel.
create index if not exists leads_created_at_idx on public.leads (created_at desc);

-- Seguridad: RLS activo. Cualquiera puede INSERTAR un lead (formulario público),
-- pero NADIE puede leerlos vía API anónima (solo desde el panel con service role).
alter table public.leads enable row level security;

drop policy if exists "anon puede insertar leads" on public.leads;
create policy "anon puede insertar leads"
  on public.leads
  for insert
  to anon, authenticated
  with check (true);

-- Nota: no se crea policy de SELECT a propósito. Los leads se consultan
-- desde el panel de Supabase (Table editor) o con la service_role key.
