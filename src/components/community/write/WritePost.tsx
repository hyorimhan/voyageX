'use client';

import Link from 'next/link';
import Page from '@/components/pages/Page';
import { useState } from 'react';
import DropDownButton from '@/components/shop/DropDownButton';
import { useMutation } from '@tanstack/react-query';
import { insertPost } from '@/services/community';
import { TWritePost } from '@/types/communityType';
import useAuthStore from '@/zustand/store/useAuth';
import { useRouter } from 'next/navigation';
import PostPen20px from '@/components/common/icons/20px/PostPenIcon20px';

const categories = {
  communication: '소통',
  tour: '우주여행',
  info: '우주정보',
  news: '뉴스/기사',
};

const WritePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [sortBy, setSortBy] = useState('communication');
  const [isSubmitting, setIsSubmitting] = useState(false); // 추가된 상태

  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  const { mutate: submitPost } = useMutation({
    mutationFn: (newPost: TWritePost) => insertPost(newPost),
    onSuccess: () => {
      setIsSubmitting(false);
      router.push('/community');
    },
    onError: () => {
      setIsSubmitting(false);
      alert('글 작성에 실패했습니다. 다시 시도해 주세요.');
    },
  });

  const handleSubmitWrite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || !sortBy) {
      return alert('빈칸을 채워주세요.');
    }

    if (isSubmitting) return;

    setIsSubmitting(true);

    const newPost = {
      title,
      content,
      category: sortBy,
      user_id: user?.id as string,
    };
    submitPost(newPost);
  };

  return (
    <Page>
      <form onSubmit={handleSubmitWrite} className='flex flex-col gap-4'>
        <div className='text-[24px] justify-between content-center flex'>
          <div className='flex'>
            <Link href='/community'>
              <div>자유게시판</div>
            </Link>
            <div>ㅤ{'>'}ㅤ글쓰기</div>
          </div>
          <div className='flex gap-2 text-sm'>
            <button
              type='submit'
              className={`rounded-lg bg-primary-600 px-3 py-1 flex justify-center items-center gap-1 ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={isSubmitting} // 제출 중이면 버튼 비활성화
            >
              <PostPen20px />
              {isSubmitting ? '등록 중...' : '등록'}
            </button>
          </div>
        </div>
        <div className='flex'>
          <DropDownButton
            categories={categories}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
          <input
            className='flex-grow h-[48px] rounded-[16px] text-white px-4 py-3 bg-black-800 focus:outline-none'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='제목을 입력해주세요.'
            maxLength={60}
          />
        </div>
        <div>
          <textarea
            className='text-black-1000 w-full h-96 rounded-md focus:outline-none px-7 py-7 resize-none'
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
      </form>
    </Page>
  );
};

export default WritePost;
