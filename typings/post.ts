export interface Post {
  title?: string;
  date?: string;
  slug?: string;
  coverImage?: string;
  excerpt?: string;
  featured?: string;
  content?: string;
  words?: number;
  minutes?: number;
  [key: string]: unknown;
}
