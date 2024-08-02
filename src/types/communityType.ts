import { Tables } from './supabase';

export type Post = Tables<'posts'>;

export type TWritePost = Pick<
  Post,
  'title' | 'content' | 'category' | 'user_id'
>;

export type TEditPost = Omit<Post, 'created_at'>;
