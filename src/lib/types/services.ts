import type { JSONContent } from "@tiptap/react";

export interface Service {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: JSONContent;
  icon: string;
  hero_image_url: string | null;
  display_order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface ServiceInsert {
  name: string;
  slug: string;
  tagline: string;
  description: JSONContent;
  icon?: string;
  hero_image_url?: string | null;
  display_order?: number;
  published?: boolean;
}

export interface ServiceUpdate extends Partial<ServiceInsert> {
  id: string;
}

export interface SubService {
  id: string;
  service_id: string;
  name: string;
  slug: string;
  description: JSONContent;
  icon: string | null;
  image_url: string | null;
  display_order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface SubServiceInsert {
  service_id: string;
  name: string;
  slug: string;
  description: JSONContent;
  icon?: string | null;
  image_url?: string | null;
  display_order?: number;
  published?: boolean;
}

export interface SubServiceUpdate extends Partial<SubServiceInsert> {
  id: string;
}
