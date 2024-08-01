import React from 'react';
import CategoryBadge from './CategoryBadge';
import { Posts } from '@/types/communityType';
import ShareIcon32px from '../common/icons/32px/ShareIcon32px';
import HeartDefaultIcon32px from '../common/icons/32px/HeartDefaultIcon32px';
import PostWriterIcon from './ProfileImages/PostWriter';
import HeartDefaultIcon20px from '../common/icons/20px/HeartDefaultIcon20px';
import ChatIcon20px from '../common/icons/20px/ChatIcon20px';

const DetailPage = () => {
  const detail: Posts<false> = {
    category: 'info',
    title:
      '블랙홀의 질량은 관측으론 재는것이 불가능하다. 우주는 더 많은 중력이나 중력외의 것들이 존재한다.',
    content: `블랙홀의 질량은 관측으론 재는것이 불가능하다. 우주는 더 많은 중력이나 중력외의 것들이 존재한다.
  ​
  블랙홀의 열을 잰다던가, 질량을 재는 것은 불가능합니다.
  관측 당시의 크기를 재는 것은 가능하지만 말입니다.
  
  왜그러냐?
  그것은 블랙홀 내부의 열은 외부에 비쳐지는 열에 티끌대 무한대라는 표현으로 높고 질량과 밀도, 즉 초압축되어 있다는 얘기입니다. 단순히 비슷한 크기의 블랙홀과 항성 또는 은하라면 초거대은하의 항성계에 블랙홀이 없다면 외부에 침입하는 블랙홀을 튕겨내거나 흡수하고 거대 은하가 블랙홀을 먹는 역현상이 발생할 수 있는데요.
  ​
  실제로 가능하지만 현실적으론 불가능합니다. 아무리 우주에서 제일 큰 블랙홀도 1cm이하로 초압축 할 수 있기 때문입니다. 단지, 그 내부의 시공간 때문에 웜홀이라 불리우는 다른시공간이나 차원, 과학이 담긴 문명우주로의 긴 터널이 다수 존재하고 중력의 블랙홀은 어떤 크기든 압축이 됩니다.
  ​
  그 블랙홀이 성장이 끝났다면 말입니다. 성장이 덜 되도 인간의 뇌에는 대체로 담아질 수 있는 크기가 되고요.
  따라서 외계우주는 외계인의 뇌같은 머리속에 블랙홀이나 중력을 담습니다. 그리고 미세블랙홀과 중력들을 같이 넣어 서로 충돌할수도 있지만 다른차원에서 연결되도록 하여 창의력이나 연산력, 컴퓨팅 같은것도 쉽게 하며 인간에게 퇴화된 예지력같은 것을 발휘할 수 있게 합니다. 또, 그 생명체는 시공간을 넘나드는 일이 가능해지고요.`,
    user_id: '지구인',
    like_count: 5,
    id: '123',
    created_at: '2024-07-25 06:33:33+00',
  };

  return (
    <>
      <div className='flex flex-col font-pretendard gap-5'>
        <div className='border-b-[1px] pb-6'>
          <div className='flex justify-between'>
            <div className='flex flex-col mb-5 gap-5'>
              <div className='inline-block'>
                <CategoryBadge category={detail.category} />
              </div>
              <div className='text-lg flex font-bold'>{detail.title}</div>
            </div>
            <div className='flex gap-4 items-start'>
              <ShareIcon32px />
              <HeartDefaultIcon32px />
            </div>
          </div>
          <div className='flex justify-between'>
            <div className='flex flex-col gap-2'>
              <div className='flex gap-2 items-center'>
                <PostWriterIcon />
                <div>{detail.user_id}</div>
              </div>
              <div className='text-black-400'>
                {new Date(detail.created_at).toLocaleDateString()}
              </div>
            </div>
            <div className='flex gap-4 items-end text-black-400'>
              <div>좋아요 {detail.like_count}</div>
              <div>댓글 5</div>
            </div>
          </div>
        </div>
        <div>{detail.content}</div>
        <div className='flex gap-4 pt-9 pb-6 border-b-[1px] border-black-700'>
          <div className='flex gap-1 justify-center'>
            <HeartDefaultIcon20px />
            좋아요 {detail.like_count}
          </div>
          <div className='flex gap-1 justify-center'>
            <ChatIcon20px />
            댓글 5
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailPage;
