import type { JSONContent } from "@tiptap/react";

export interface Project {
  id: string;
  title: string;
  slug: string;
  client: string;
  location: string | null;
  description: JSONContent;
  excerpt: string;
  featured_image: string | null;
  services_used: string[];
  market: string;
  featured: boolean;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProjectInsert {
  title: string;
  slug: string;
  client: string;
  location?: string | null;
  description: JSONContent;
  excerpt: string;
  featured_image?: string | null;
  services_used?: string[];
  market?: string;
  featured?: boolean;
  published?: boolean;
  published_at?: string | null;
}

export interface ProjectUpdate extends Partial<ProjectInsert> {
  id: string;
}

export interface ProjectImage {
  id: string;
  project_id: string;
  image_url: string;
  caption: string | null;
  display_order: number;
}
