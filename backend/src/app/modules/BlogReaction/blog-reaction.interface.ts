export interface IUpsertBlogReactionPayload {
  blog_id: number;
  type: "Like" | "Dislike" | null;
}
