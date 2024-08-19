import {
  MyPost,
  TEditComment,
  TEditPost,
  TPagination,
  TWriteComment,
  TWritePost,
} from '@/types/communityType';

export async function getPostAll(
  page = 1,
  limit = 10,
): Promise<TPagination<MyPost>> {
  const response = await fetch(`/api/community?page=${page}&limit=${limit}`);
  const data = await response.json();
  return data;
}

export async function getPostByCategory(
  category: string,
  page = 1,
  limit = 10,
) {
  const response = await fetch(
    `/api/community/category/${category}?page=${page}&limit=${limit}`,
  );
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

// 이미지 업로드 서비스 함수
export async function uploadImage(content: string) {
  const response = await fetch('/api/community/upload', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ image: content }),
  });

  if (!response.ok) {
    throw new Error('이미지 업로드 실패');
  }

  const { imageUrl } = await response.json();
  return imageUrl;
}

//게시글 수정
export async function updatePost(editPost: TEditPost) {
  const response = await fetch(`/api/community/detail/${editPost.id}`, {
    method: 'PUT',
    body: JSON.stringify(editPost),
  });
  const data = await response.json();
  return data;
}

export async function getComments(postId: string) {
  const response = await fetch(`/api/community/comments/${postId}`);
  const data = await response.json();
  return data;
}

export async function deleteComments(id: string) {
  const response = await fetch('/api/community/comments/', {
    method: 'DELETE',
    body: JSON.stringify(id),
  });
  const data = await response.json();
  return data;
}

export async function insertComment(newComment: TWriteComment) {
  const response = await fetch('/api/community/comments/', {
    method: 'POST',
    body: JSON.stringify(newComment),
  });
  const data = await response.json();
  return data;
}

export async function updateComment(editComment: TEditComment) {
  const response = await fetch('/api/community/comments/', {
    method: 'PUT',

    body: JSON.stringify(editComment),
  });
  const data = await response.json();
  return data;
}

export async function getMyPosts(
  user_id: string | undefined,
): Promise<MyPost[]> {
  const response = await fetch(`/api/mypage/my_posts/${user_id}`);
  const data = await response.json();
  return data;
}

export async function likePost(post_id: string, user_id: string) {
  const response = await fetch(
    `/api/community/likes/${post_id}?user_id=${user_id}`,
    {
      method: 'POST',
    },
  );
  const data = await response.json();
  return data;
}

export async function unlikePost(post_id: string, user_id: string) {
  const response = await fetch(
    `/api/community/likes/${post_id}?user_id=${user_id}`,
    {
      method: 'DELETE',
    },
  );
  const data = await response.json();
  return data;
}

export async function getIsLikedPost(post_id: string, user_id: string) {
  const response = await fetch(
    `/api/community/likes/${post_id}?user_id=${user_id}`,
  );
  const data = await response.json();
  return data;
}

export async function getPagination(page: number, limit: number) {
  const response = await fetch(`/api/community?page=${page}&limit=${limit}`);

  const data = await response.json();
  return data;
}

export async function getTopLikedPosts() {
  const response = await fetch('/api/community/top-liked');
  if (!response.ok) {
    throw new Error('Failed to fetch top liked posts');
  }
  return response.json();
}
