type PostMeta =
  | "title"
  | "date"
  | "slug"
  | "coverImage"
  | "excerpt"
  | "content";

export type Post = Record<PostMeta, string> | Record<string, string>;
