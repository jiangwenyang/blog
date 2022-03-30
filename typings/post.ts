export interface CoverImage {
  name?: string;
  src: string;
}

export type PostCoverImage = CoverImage | string;

export interface Post {
  title?: string;
  date?: string;
  slug?: string;
  coverImage?: CoverImage;
  excerpt?: string;
  featured?: string;
  content?: string;
  words?: number;
  minutes?: number;
  [key: string]: unknown;
}
