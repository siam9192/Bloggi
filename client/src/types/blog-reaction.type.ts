interface IBlogReaction {
  blog_id: number;
  reader_id: number;
  type: TReactionType;
}

export type TReactionType = `${EReactionType}` | null;

export enum EReactionType {
  Like = "Like",
  Dislike = "Dislike",
}
