import type { JSONContent } from "@tiptap/react";

export type ArticleType = "news" | "event";

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  type: ArticleType;
  excerpt: string | null;
  content: JSONContent;
  featured_image: string | null;
  event_date: string | null;
  event_location: string | null;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface NewsArticleInsert {
  title: string;
  slug: string;
  type?: ArticleType;
  excerpt?: string | null;
  content: JSONContent;
  featured_image?: string | null;
  event_date?: string | null;
  event_location?: string | null;
  published?: boolean;
  published_at?: string | null;
}

export interface NewsArticleUpdate extends Partial<NewsArticleInsert> {
  id: string;
}
