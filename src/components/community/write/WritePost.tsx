'use client';

import Link from 'next/link';
import PenIcon24px from '../../common/icons/24px/PenIcon24px';
import Page from '@/components/pages/Page';
import { useState } from 'react';
import DropDownButton from '@/components/shop/DropDownButton';
import { useMutation } from '@tanstack/react-query';
import { insertPost } from '@/services/community';
import { TWritePost } from '@/types/communityType';
import useAuthStore from '@/zustand/store/useAuth';
import { useRouter } from 'next/navigation';

const WritePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [sortBy, setSortBy] = useState('소통');
  const sortByList = ['소통', '우주여행', '우주정보', '뉴스/기사'];
  // const sortByList = {
  //   '소통': 'communcation',
  //   '우주여행': 'tour',
  //   '우주정보': 'info',
  //   '뉴스/기사': 'news',
  // };

  const user = useAuthStore((state) => state.user);

  const router = useRouter();

  const { mutate: submitPost } = useMutation({
    mutationFn: (newPost: TWritePost) => insertPost(newPost),
  });

  const handleSubmitWrite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || !sortBy) {
      return alert('빈칸을 채워주세요.');
    }
    const newPost = {
      title,
      content,
      category: sortBy,
      user_id: user?.id as string,
    };
    submitPost(newPost);
    router.push('/community');
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
            {/* <button className='rounded-lg border-[1.5px] border-primary-400 px-4 py-3'>
                임시등록
              </button> */}
            <button className='rounded-lg bg-primary-600 px-4 py-3 flex justify-center items-center gap-1'>
              <PenIcon24px />
              등록
            </button>
          </div>
        </div>
        <div className='flex'>
          <DropDownButton
            sortByList={sortByList}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
          <input
            className='flex-grow h-[48px] rounded-[16px] text-white px-4 py-3 bg-black-800 focus:outline-none'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='제목을 입력해주세요.'
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
