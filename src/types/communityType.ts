import { Tables } from './supabase';

export type Post = Tables<'posts'>;

export type TWritePost = Pick<
  Post,
  'title' | 'content' | 'category' | 'user_id'
> & {
  image_url?: string;
};

export type TEditPost = Omit<Post, 'created_at'>;

export type Comment = Tables<'comments'>;

export type TWriteComment = Omit<Comment, 'created_at' | 'id'>;

export type TEditComment = Omit<Comment, 'created_at'>;

export interface MyPost extends Post {
  comments: number;
}

export interface Community extends Post {
  comments: number;
  likes?: number;
}

export interface TPagination<T> {
  posts: T[];
  total: number;
  page: number;
  totalPages: number;
}
