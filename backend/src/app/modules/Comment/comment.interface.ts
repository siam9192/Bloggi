export interface ICreateCommentData {
  blog_id: number;
  content: string;
}

export interface ICreateCommentReplayData {
  comment_id: number;
  content: string;
}

export interface IUpdateCommentData {
  comment_id: number;
  content: string;
}
