type PostMeta =
  | "title"
  | "date"
  | "slug"
  | "coverImage"
  | "excerpt"
  | "featured"
  | "content";

export type Post = Record<PostMeta, string> | Record<string, string>;
