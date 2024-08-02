import { TEditPost, TWritePost } from '@/types/communityType';

export async function getPostAll() {
  const response = await fetch('/api/community');
  const data = await response.json();
  return data;
}

export async function getPostByCategory(category: string) {
  const response = await fetch(`/api/community/category/${category}`);
  const data = await response.json();
  return data;
}

export async function getDetailPost(postId: string) {
  const response = await fetch(`/api/community/detail/${postId}`);
  const data = await response.json();
  return data;
}

export async function deletePost(postId: string) {
  const response = await fetch(`/api/community/detail/${postId}`, {
    method: 'DELETE',
  });
  const data = await response.json();
  return data;
}

export async function insertPost(newPost: TWritePost) {
  const response = await fetch('/api/community', {
    method: 'POST',
    body: JSON.stringify(newPost),
  });
  const data = await response.json();
  return data;
}

export async function updatePost(editPost: TEditPost) {
  const response = await fetch(`/api/community/detail/${editPost.id}`, {
    method: 'PUT',
    body: JSON.stringify(editPost),
  });
  const data = await response.json();
  return data;
}
