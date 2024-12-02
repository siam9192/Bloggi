export interface IUpsertCommentReactionData {
  comment_id: number;
  type: "Like" | "Dislike" | null;
}
