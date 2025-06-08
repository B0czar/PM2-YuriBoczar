# SQL Definition 

## **tasks**
``` sql
create table public.tasks (
  id uuid not null default extensions.uuid_generate_v4 (),
  name character varying(255) not null,
  description text not null,
  status character varying(255) not null,
  user_id uuid not null,
  category_id uuid not null,
  due_date date not null,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  constraint tasks_pkey primary key (id),
  constraint tasks_category_id_fkey foreign KEY (category_id) references categories (id) on delete set null,
  constraint tasks_user_id_fkey foreign KEY (user_id) references users (id) on delete CASCADE
) TABLESPACE pg_default;

create trigger trg_tasks_updated_at BEFORE
update on tasks for EACH row
execute FUNCTION set_updated_at ();
```

## **categories**
```sql
create table public.categories (
  id uuid not null default extensions.uuid_generate_v4 (),
  name character varying(255) not null,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  constraint categories_pkey primary key (id)
) TABLESPACE pg_default;

create trigger trg_categories_updated_at BEFORE
update on categories for EACH row
execute FUNCTION set_updated_at ();
```

## **users**
```sql
create table public.users (
  id uuid not null default extensions.uuid_generate_v4 (),
  name character varying(255) not null,
  email character varying(255) not null,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  constraint users_pkey primary key (id),
  constraint users_email_key unique (email)
) TABLESPACE pg_default;

create trigger trg_users_updated_at BEFORE
update on users for EACH row
execute FUNCTION set_updated_at ();
```