'use client';

import Link from 'next/link';
import { useState } from 'react';
import DropDownButton from '@/components/shop/DropDownButton';
import { useMutation } from '@tanstack/react-query';
import { insertPost, uploadImage } from '@/services/community';
import { TWritePost } from '@/types/communityType';
import useAuthStore from '@/zustand/store/useAuth';
import { useRouter } from 'next/navigation';
import PostPen20px from '@/components/common/icons/20px/PostPenIcon20px';
import toast from 'react-hot-toast';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  const { mutate: submit } = useMutation({
    mutationFn: async (newPost: TWritePost) => {
      const processedContent = await handleImageUpload(content);

      const postToSubmit = {
        ...newPost,
        content: processedContent,
      };
      await insertPost(postToSubmit);
    },
    onSuccess: () => {
      setIsSubmitting(false);
      toast.success('글이 작성되었습니다.');
      router.push('/community');
    },
    onError: () => {
      setIsSubmitting(false);
      toast.error('글 작성에 실패했습니다. 다시 시도해 주세요.');
    },
  });

  const handleImageUpload = async (rawContent: string) => {
    let processedContent = rawContent;

    const imageTags = rawContent.match(/<img[^>]+src="data:image\/[^">]+"/g);
    if (imageTags) {
      for (const imgTag of imageTags) {
        const base64Src = imgTag.match(/src="([^"]+)"/)?.[1];
        if (base64Src) {
          try {
            const imageUrl = await uploadImage(base64Src);
            processedContent = processedContent.replace(base64Src, imageUrl);
          } catch (error) {
            console.error('이미지 업로드 실패:', error);

            // error를 명시적으로 Error로 타입 캐스팅
            if (error instanceof Error) {
              if (error.message.includes('413')) {
                toast.error('이미지 용량이 1MB를 초과했습니다.');
              } else {
                toast.error('이미지 용량이 1MB를 초과했습니다.');
              }
            } else {
              toast.error('알 수 없는 오류가 발생했습니다.');
            }

            throw error;
          }
        }
      }
    }
    return processedContent;
  };

  const handleSubmitWrite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || !sortBy) {
      return toast.error('빈칸을 채워주세요.');
    }

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const newPost = {
        title,
        content,
        category: sortBy,
        user_id: user?.id as string,
      };
      await submit(newPost);
    } catch (error) {
      // 이미지 업로드 실패 또는 글 작성 실패 시 오류 처리
      console.error('글 작성 중 오류 발생:', error);
    }
  };

  return (
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
        <ReactQuill
          theme='snow'
          value={content}
          onChange={setContent}
          modules={{
            toolbar: {
              container: [
                [{ header: [1, 2, 3, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                ['blockquote'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                [{ color: [] }, { background: [] }],
                [{ align: [] }, 'link', 'image'],
              ],
            },
          }}
          placeholder='내용을 입력해주세요.'
          style={{
            color: '#000000',
            marginBottom: '6%',
          }}
        />
      </div>
    </form>
  );
};

export default WritePost;
