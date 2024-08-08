import { Tables } from './supabase';

export type Post = Tables<'posts'>;

export type TWritePost = Pick<
  Post,
  'title' | 'content' | 'category' | 'user_id'
>;

export type TEditPost = Omit<Post, 'created_at'>;

export type Comment = Tables<'comments'>;

export type TWriteComment = Omit<Comment, 'created_at' | 'id'>;

export type TEditComment = Omit<Comment, 'created_at'>;

export interface MyPost extends Post {
  comments: number;
}
