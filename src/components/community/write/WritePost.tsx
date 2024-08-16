'use client';

import Link from 'next/link';
import { useState } from 'react';
import DropDownButton from '@/components/shop/DropDownButton';
import { useMutation } from '@tanstack/react-query';
import { insertPost, uploadImage } from '@/services/community';
import { TWritePost } from '@/types/communityType';
import useAuthStore from '@/zustand/store/useAuth';
import { useRouter } from 'next/navigation';
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
      const { processedContent, imageUrls } = await handleImageUpload(content);

      const postToSubmit = {
        ...newPost,
        content: processedContent,
        image_url: imageUrls.length > 0 ? imageUrls[0] : null,
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
    let imageUrls = [];

    const imageTags = rawContent.match(/<img[^>]+src="data:image\/[^">]+"/g);

    if (imageTags) {
      if (imageTags.length > 1) {
        toast.error('이미지는 한 장만 업로드할 수 있습니다.');
        throw new Error('Too many images');
      }

      for (const imgTag of imageTags) {
        const base64Src = imgTag.match(/src="([^"]+)"/)?.[1];
        if (base64Src) {
          if (imageUrls.length > 0) {
            // 이미 한 장의 이미지를 업로드한 경우 중단
            toast.error('이미지는 한 장만 업로드할 수 있습니다.');
            throw new Error('Too many images');
          }
          try {
            const imageUrl = await uploadImage(base64Src);
            processedContent = processedContent.replace(base64Src, imageUrl);
            imageUrls.push(imageUrl); // 업로드된 이미지 URL 저장
          } catch (error) {
            console.error('이미지 업로드 실패:', error);

            if (error instanceof Error) {
              if (error.message.includes('413')) {
                toast.error('이미지 용량이 1MB를 초과했습니다.');
              } else {
                toast.error('이미지 업로드에 실패했습니다.');
              }
            } else {
              toast.error('알 수 없는 오류가 발생했습니다.');
            }

            throw error;
          }
        }
      }
    }

    return { processedContent, imageUrls };
  };

  const handleSubmitWrite = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!/^(?!\s*$).{2,}$/.test(title)) {
      return toast.error('제목은 최소 2글자 이상이어야 합니다.');
    }

    const plainTextContent = content.replace(/<[^>]*>?/gm, '').trim(); // HTML 태그 제거 후 순수 텍스트 추출
    if (plainTextContent.length < 5) {
      return toast.error('내용은 최소 5글자 이상 입력해야 합니다.');
    }

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const { processedContent, imageUrls } = await handleImageUpload(content);

      if (imageUrls.length > 1) {
        setIsSubmitting(false);
        return toast.error('이미지는 한 장만 업로드할 수 있습니다.');
      }

      const newPost = {
        title,
        content: processedContent,
        category: sortBy,
        user_id: user?.id as string,
        image_url: imageUrls[0] || null, // 첫 번째 이미지 URL 저장
      };
      await submit(newPost);
    } catch (error) {
      console.error('글 작성 중 오류 발생:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmitWrite} className='flex flex-col gap-4'>
      <div className='text-[24px] justify-between content-center flex mb-6'>
        <div className='flex'>
          <Link href='/community'>
            <div>자유게시판</div>
          </Link>
          <div>ㅤ{'>'}ㅤ글쓰기</div>
        </div>
        <div className='flex gap-2 text-sm'>
          <button
            type='submit'
            className={`rounded-lg bg-primary-600 px-6 py-3 flex justify-center items-center gap-1 ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isSubmitting} // 제출 중이면 버튼 비활성화
          >
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
        />
      </div>
    </form>
  );
};

export default WritePost;
