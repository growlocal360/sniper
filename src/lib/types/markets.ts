import type { JSONContent } from "@tiptap/react";

export interface Market {
  id: string;
  name: string;
  slug: string;
  description: JSONContent;
  icon_url: string | null;
  hero_image_url: string | null;
  display_order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface MarketInsert {
  name: string;
  slug: string;
  description: JSONContent;
  icon_url?: string | null;
  hero_image_url?: string | null;
  display_order?: number;
  published?: boolean;
}

export interface MarketUpdate extends Partial<MarketInsert> {
  id: string;
}
