-- Sniper Elite Services - Supabase Database Schema
-- Run this in your Supabase SQL Editor to create all tables

-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- ============================================
-- APPROVED EMAILS (Admin Access Control)
-- ============================================
create table if not exists approved_emails (
  id uuid default uuid_generate_v4() primary key,
  email text unique not null
);

-- Insert initial admin email(s)
-- insert into approved_emails (email) values ('admin@sniper-elite.com');

-- ============================================
-- TEAM MEMBERS
-- ============================================
create table if not exists team_members (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  title text not null,
  bio text,
  photo_url text,
  email text,
  phone text,
  display_order integer default 0,
  published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================
-- SERVICES
-- ============================================
create table if not exists services (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text unique not null,
  tagline text not null,
  description jsonb,
  icon text,
  hero_image_url text,
  display_order integer default 0,
  published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================
-- SUB-SERVICES
-- ============================================
create table if not exists sub_services (
  id uuid default uuid_generate_v4() primary key,
  service_id uuid references services(id) on delete cascade not null,
  name text not null,
  slug text not null,
  description jsonb,
  icon text,
  image_url text,
  display_order integer default 0,
  published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================
-- PROJECTS
-- ============================================
create table if not exists projects (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text unique not null,
  client text not null,
  location text,
  description jsonb,
  excerpt text not null,
  featured_image text,
  services_used text[] default '{}',
  market text,
  featured boolean default false,
  published boolean default false,
  published_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================
-- PROJECT IMAGES
-- ============================================
create table if not exists project_images (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references projects(id) on delete cascade not null,
  image_url text not null,
  caption text,
  display_order integer default 0
);

-- ============================================
-- MARKETS
-- ============================================
create table if not exists markets (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text unique not null,
  description jsonb,
  icon_url text,
  hero_image_url text,
  display_order integer default 0,
  published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================
-- NEWS ARTICLES (combined News & Events)
-- ============================================
create table if not exists news_articles (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text unique not null,
  type text default 'news' check (type in ('news', 'event')),
  excerpt text,
  content jsonb,
  featured_image text,
  event_date timestamptz,
  event_location text,
  published boolean default false,
  published_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================
-- JOB POSTINGS
-- ============================================
create table if not exists job_postings (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text unique not null,
  department text,
  location text default 'Sulphur, LA',
  employment_type text default 'Full-time' check (employment_type in ('Full-time', 'Part-time', 'Contract', 'Internship')),
  description jsonb,
  requirements jsonb,
  salary_range text,
  published boolean default false,
  published_at timestamptz,
  expires_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================
-- LOCATIONS
-- ============================================
create table if not exists locations (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  address text not null,
  city text not null,
  state text not null,
  zip text not null,
  phone text,
  email text,
  is_headquarters boolean default false,
  lat decimal,
  lng decimal,
  published boolean default false,
  created_at timestamptz default now()
);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
alter table approved_emails enable row level security;
alter table team_members enable row level security;
alter table services enable row level security;
alter table sub_services enable row level security;
alter table projects enable row level security;
alter table project_images enable row level security;
alter table markets enable row level security;
alter table news_articles enable row level security;
alter table job_postings enable row level security;
alter table locations enable row level security;

-- Public read access for published content
create policy "Public can read published team members" on team_members
  for select using (published = true);

create policy "Public can read published services" on services
  for select using (published = true);

create policy "Public can read published sub-services" on sub_services
  for select using (published = true);

create policy "Public can read published projects" on projects
  for select using (published = true);

create policy "Public can read project images" on project_images
  for select using (true);

create policy "Public can read published markets" on markets
  for select using (published = true);

create policy "Public can read published news" on news_articles
  for select using (published = true);

create policy "Public can read published jobs" on job_postings
  for select using (published = true);

create policy "Public can read published locations" on locations
  for select using (published = true);

-- Authenticated users (admin) can do everything
create policy "Admins can read all team members" on team_members
  for select to authenticated using (true);

create policy "Admins can insert team members" on team_members
  for insert to authenticated with check (true);

create policy "Admins can update team members" on team_members
  for update to authenticated using (true);

create policy "Admins can delete team members" on team_members
  for delete to authenticated using (true);

create policy "Admins can read all services" on services
  for select to authenticated using (true);

create policy "Admins can insert services" on services
  for insert to authenticated with check (true);

create policy "Admins can update services" on services
  for update to authenticated using (true);

create policy "Admins can delete services" on services
  for delete to authenticated using (true);

create policy "Admins can read all sub-services" on sub_services
  for select to authenticated using (true);

create policy "Admins can insert sub-services" on sub_services
  for insert to authenticated with check (true);

create policy "Admins can update sub-services" on sub_services
  for update to authenticated using (true);

create policy "Admins can delete sub-services" on sub_services
  for delete to authenticated using (true);

create policy "Admins can read all projects" on projects
  for select to authenticated using (true);

create policy "Admins can insert projects" on projects
  for insert to authenticated with check (true);

create policy "Admins can update projects" on projects
  for update to authenticated using (true);

create policy "Admins can delete projects" on projects
  for delete to authenticated using (true);

create policy "Admins can manage project images" on project_images
  for all to authenticated using (true);

create policy "Admins can read all markets" on markets
  for select to authenticated using (true);

create policy "Admins can insert markets" on markets
  for insert to authenticated with check (true);

create policy "Admins can update markets" on markets
  for update to authenticated using (true);

create policy "Admins can delete markets" on markets
  for delete to authenticated using (true);

create policy "Admins can read all news" on news_articles
  for select to authenticated using (true);

create policy "Admins can insert news" on news_articles
  for insert to authenticated with check (true);

create policy "Admins can update news" on news_articles
  for update to authenticated using (true);

create policy "Admins can delete news" on news_articles
  for delete to authenticated using (true);

create policy "Admins can read all jobs" on job_postings
  for select to authenticated using (true);

create policy "Admins can insert jobs" on job_postings
  for insert to authenticated with check (true);

create policy "Admins can update jobs" on job_postings
  for update to authenticated using (true);

create policy "Admins can delete jobs" on job_postings
  for delete to authenticated using (true);

create policy "Admins can read all locations" on locations
  for select to authenticated using (true);

create policy "Admins can insert locations" on locations
  for insert to authenticated with check (true);

create policy "Admins can update locations" on locations
  for update to authenticated using (true);

create policy "Admins can delete locations" on locations
  for delete to authenticated using (true);

-- Approved emails - only authenticated can read
create policy "Authenticated can read approved emails" on approved_emails
  for select to authenticated using (true);

-- ============================================
-- STORAGE BUCKETS
-- ============================================
-- Create these in the Supabase dashboard:
-- 1. "uploads" bucket (public) - for images, documents
-- 2. Set public access policy on the bucket

-- ============================================
-- SEED DATA
-- ============================================

-- Team Members
insert into team_members (name, title, display_order, published) values
  ('Micah Areno', 'President', 1, true),
  ('Jason Duvall', 'Director of Operations', 2, true),
  ('Nelson Lezama', 'Catalyst Ops Manager', 3, true),
  ('Xavier Garza', 'Corporate Safety', 4, true),
  ('Allan Paille', 'Piping and Mechanical Estimator', 5, true),
  ('Robby Ball', 'Piping and Mechanical PM', 6, true),
  ('Scott Mello', 'Catalyst Estimator', 7, true),
  ('Dominic Martinez', 'Corporate QAQC', 8, true);

-- Markets
insert into markets (name, slug, description, display_order, published) values
  ('Refining', 'refining', '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Comprehensive services for petroleum refineries and downstream processing facilities. Our team delivers precision catalyst handling, specialty welding, and mechanical services tailored to the unique demands of refinery operations."}]}]}', 1, true),
  ('Chemical', 'chemical', '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Specialized support for chemical processing plants and petrochemical operations. We provide expert industrial services that meet the stringent safety and quality requirements of chemical manufacturing."}]}]}', 2, true),
  ('Renewables', 'renewables', '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Forward-looking services for renewable energy and sustainable fuel production. Sniper Elite is positioned to support the growing renewables sector with our precision industrial capabilities."}]}]}', 3, true),
  ('Paper', 'paper', '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Tailored industrial solutions for paper manufacturing and pulp processing facilities. Our mechanical and welding expertise supports the critical infrastructure of paper production operations."}]}]}', 4, true);

-- Services
insert into services (name, slug, tagline, description, icon, display_order, published) values
  ('Catalyst Services', 'catalyst-services', 'Precision Catalyst Handling with Sniper-Like Accuracy', '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Sniper Elite Services utilizes advanced processes, precision procedures, and specialized equipment to safely remove spent catalyst and load fresh catalyst into process vessels. Our expertise ensures seamless transitions between project phases, eliminating delays and maximizing operational efficiency."}]}]}', 'Atom', 1, true),
  ('Specialty Welding', 'specialty-welding', 'Advanced Welding for Critical Industrial Applications', '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Our certified welders bring advanced techniques and extensive experience to every project. From exotic alloys to high-pressure systems, we deliver welding solutions that meet the most demanding industrial specifications with precision and reliability."}]}]}', 'Flame', 2, true),
  ('Mechanical Services', 'mechanical-services', 'Comprehensive Mechanical Solutions for Industrial Facilities', '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"From equipment installation to precision field machining, our mechanical services team provides comprehensive support for turnarounds, maintenance, and new construction projects. With capabilities up to 75 tons and tolerances of ±0.001 inches, we deliver results."}]}]}', 'Wrench', 3, true);

-- Locations
insert into locations (name, address, city, state, zip, phone, email, is_headquarters, published) values
  ('Sulphur, LA (Headquarters)', '1396 Swisco Rd.', 'Sulphur', 'LA', '70665', '1-855-827-4387', 'info@sniper-elite.com', true, true),
  ('Houston, TX', 'Houston Office', 'Houston', 'TX', '77001', null, null, false, true);

-- Projects (sample)
insert into projects (title, slug, client, location, excerpt, market, services_used, featured, published, published_at) values
  ('Delek El Dorado Refinery Jet Fuel Distribution System', 'delek-el-dorado-refinery', 'Delek El Dorado Refinery', 'El Dorado, AR', 'Sniper Elite Services successfully engineered and installed a complete jet fuel distribution system at Delek El Dorado Refinery, enabling the facility to expand into aviation fuel markets with state-of-the-art piping infrastructure.', 'Refining', ARRAY['Mechanical Services', 'Specialty Welding'], true, true, now());
