'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import DropDownButton from '@/components/shop/DropDownButton';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getDetailPost, updatePost, uploadImage } from '@/services/community';
import { Post, TEditPost } from '@/types/communityType';
import useAuthStore from '@/zustand/store/useAuth';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import Loading from '@/components/common/Loading';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const categories = {
  communication: '소통',
  tour: '우주여행',
  info: '우주정보',
  news: '뉴스/기사',
};

const EditPost = ({ postId }: { postId: string }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [sortBy, setSortBy] = useState('communication');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  const {
    data: post,
    isPending,
    isError,
  } = useQuery<Post>({
    queryKey: ['post', postId],
    queryFn: () => getDetailPost(postId),
  });

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setSortBy(post.category);
    }
  }, [post]);

  const { mutate: submitPost } = useMutation({
    mutationFn: async (editPost: TEditPost) => {
      await updatePost(editPost);
    },
    onSuccess: () => {
      setIsSubmitting(false);
      toast.success('글이 수정되었습니다.');
      router.push(`/community/${postId}`);
    },
    onError: () => {
      setIsSubmitting(false);
      toast.error('글 수정에 실패했습니다. 다시 시도해 주세요.');
    },
  });

  const handleImageUpload = async (rawContent: string) => {
    let processedContent = rawContent;
    let imageUrls = [];

    const imageTags = rawContent.match(/<img[^>]+src="data:image\/[^">]+"/g);

    if (imageTags) {
      if (imageTags.length > 1) {
        toast.error('이미지는 한 장만 업로드할 수 있습니다.');
        throw new Error('너무 많은 이미지 업로드');
      }

      for (const imgTag of imageTags) {
        const base64Src = imgTag.match(/src="([^"]+)"/)?.[1];
        if (base64Src) {
          if (imageUrls.length > 0) {
            toast.error('이미지는 한 장만 업로드할 수 있습니다.');
            throw new Error('너무 많은 이미지 업로드');
          }
          try {
            const imageUrl = await uploadImage(base64Src);
            processedContent = processedContent.replace(base64Src, imageUrl);
            imageUrls.push(imageUrl);
          } catch (error) {
            console.error('이미지 업로드 실패:', error);

            if (error instanceof Error) {
              if (error.message.includes('413')) {
                toast.error('이미지 용량이 3MB를 초과했습니다.');
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

    const plainTextContent = content.replace(/<[^>]*>?/gm, '').trim();
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

      const editPost: TEditPost = {
        title: title.trim(),
        content: processedContent,
        category: sortBy,
        user_id: user?.id as string,
        id: postId,
        image_url: imageUrls[0] || post?.image_url || null,
      };
      await submitPost(editPost);
    } catch (error) {
      console.error('글 수정 중 오류 발생:', error);
      setIsSubmitting(false);
    }
  };

  if (isPending)
    return (
      <div>
        <Loading />
      </div>
    );
  if (isError) return <div>Error</div>;

  return (
    <form
      onSubmit={handleSubmitWrite}
      className='flex flex-col gap-4 m-6 sm:m-4'
    >
      <div className='text-[24px] sm:text-lg items-center justify-between content-center flex mb-6 mt-7'>
        <div className='flex'>
          <Link href='/community'>
            <div>자유게시판</div>
          </Link>
          <div>ㅤ{'>'}ㅤ글쓰기</div>
        </div>
        <div className='flex gap-2 text-sm'>
          <button
            type='submit'
            className='rounded-lg bg-primary-600 px-6 py-3 flex justify-center items-center gap-1'
            disabled={isSubmitting} // 제출 중이면 버튼 비활성화
          >
            {isSubmitting ? '수정 중...' : '수정'}
          </button>
        </div>
      </div>
      <div className='flex flex-wrap gap-2'>
        <DropDownButton
          categories={categories}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
        <input
          className='flex-grow h-[48px] rounded-[16px] text-white px-4 py-3 bg-black-800 focus:outline-none min-w-[150px]'
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

export default EditPost;
