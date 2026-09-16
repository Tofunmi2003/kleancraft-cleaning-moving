create extension if not exists pgcrypto;

create table if not exists customers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text,
  email text unique,
  address text,
  created_at timestamptz not null default now()
);

create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  description text,
  base_price numeric(10,2) not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists cleaners (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text,
  availability text,
  status text not null default 'available',
  created_at timestamptz not null default now()
);

create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references customers(id) on delete set null,
  service_id uuid references services(id) on delete set null,
  property_type text,
  bedrooms integer,
  location text,
  date date,
  time text,
  preferred_day text,
  preferred_time text,
  status text not null default 'pending',
  price numeric(10,2) not null default 0,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists payments (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid references bookings(id) on delete cascade,
  amount numeric(10,2) not null default 0,
  status text not null default 'pending',
  reference text,
  created_at timestamptz not null default now()
);

create index if not exists customers_email_idx on customers(email);
create index if not exists bookings_customer_idx on bookings(customer_id);
create index if not exists bookings_status_idx on bookings(status);
create index if not exists payments_booking_idx on payments(booking_id);
