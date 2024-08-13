'use client';

import React from 'react';
import CategoryBadge from '../common/CategoryBadge';
import { Community } from '@/types/communityType';
import ShareIcon32px from '../../common/icons/32px/ShareIcon32px';
import PostWriterIcon from '../ProfileImages/PostWriter';
import ChatIcon20px from '../../common/icons/20px/ChatIcon20px';
import { useQuery } from '@tanstack/react-query';
import { getDetailPost } from '@/services/community';
import PostButtons from './PostButtons';
import CommentList from '../comment/CommentsList';
import Loading from '@/components/common/Loading';
import useAuthStore from '@/zustand/store/useAuth';
import PostHearts from './PostHearts';
import ShareLink from '@/components/common/ShareLink';

const DetailPage = ({ params }: { params: { postId: string } }) => {
  const { postId } = params;
  const user = useAuthStore((state) => state.user);

  const {
    data: post,
    isPending,
    isError,
  } = useQuery<Community>({
    queryKey: ['post', postId],
    queryFn: () => getDetailPost(postId),
  });

  if (isPending)
    return (
      <div>
        <Loading />
      </div>
    );

  if (isError) return <div>error</div>;

  return (
    <div className='flex flex-col font-pretendard gap-5'>
      <div className='border-b-[1px] pb-6'>
        <div className='flex justify-between'>
          <div className='flex flex-col mb-5 gap-5'>
            <div className='inline-block'>
              <CategoryBadge category={post.category} />
            </div>
            <div className='text-lg flex font-bold'>{post.title}</div>
          </div>
          <div className='flex gap-4 items-start'>
            <ShareLink />
            <PostHearts post_id={postId} user_id={user?.id} />
          </div>
        </div>
        <div className='flex justify-between'>
          <div className='flex flex-col gap-2'>
            <div className='flex gap-2 items-center'>
              <PostWriterIcon />
              <div>우주인</div>
            </div>
            <div className='text-black-400'>
              {new Date(post.created_at).toLocaleDateString()}
            </div>
          </div>
          <div className='flex gap-4 items-end text-black-400'>
            <div>좋아요 {post.likes}</div>
            <div>댓글 {post.comments}</div>
          </div>
        </div>
      </div>
      <div>{post.content}</div>
      <div className='flex gap-4 pt-9 pb-1'>
        <div className='flex gap-1 justify-center items-center'>
          <PostHearts post_id={postId} user_id={user?.id} size='small' />
          좋아요 {post.likes}
        </div>
        <div className='flex gap-1 justify-center items-center'>
          <ChatIcon20px />
          댓글 {post.comments}
        </div>
      </div>
      <CommentList postId={postId} userId={post.user_id} />
      <PostButtons postId={post.id} userId={post.user_id} />
    </div>
  );
};

export default DetailPage;
